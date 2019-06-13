let canvas;

let gl = null,
    program = null,
    carMesh = null,
    skybox = null,
    imgtx = null,
    skyboxLattx = null,
    skyboxTbtx = null;

let projectionMatrix,
    perspectiveMatrix,
    viewMatrix,
    worldMatrix,
    gLightDir,
    skyboxWM;


//Parameters for Camera
let cx = 4.5;
let cy = 5.0;
let cz = 10.0;
let elevation = 0.01;
let angle = 0.01;
let roll = 0.01;

let carAngle = 0;
let carX = -175;
let carZ = 5;

let lookRadius = 10.0;

let aspectRatio;

let keys = [];
let vz = 0.0;
let rvy = 0.0;

const KEY_CODE = {
    'A': 65,
    'W': 87,
    'S': 83,
    'D': 68,
    'I': 73
};

let keyFunctionDown = function (e) {
    if (!keys[e.keyCode]) {
        keys[e.keyCode] = true;
        switch (e.keyCode) {
            case KEY_CODE.A:
                rvy = rvy + 1.0;
                break;
            case KEY_CODE.D:
                rvy = rvy - 1.0;
                break;
            case KEY_CODE.W:
                vz = vz - 1.0;
                break;
            case KEY_CODE.S:
                vz = vz + 1.0;
                break;
            case KEY_CODE.I:
                console.log("Info down");
                break;
        }
    }
};

let keyFunctionUp = function (e) {
    if (keys[e.keyCode]) {
        keys[e.keyCode] = false;
        switch (e.keyCode) {
            case KEY_CODE.A:
                rvy = rvy - 1.0;
                break;
            case KEY_CODE.D:
                rvy = rvy + 1.0;
                break;
            case KEY_CODE.W:
                vz = vz + 1.0;
                break;
            case KEY_CODE.S:
                vz = vz - 1.0;
                break;
            case KEY_CODE.I:
                console.log("Info up");
                break;
        }
    }
};

let doResize = function() {
    // set canvas dimensions
    let canvas = document.getElementById("my-canvas");
    if ((window.innerWidth > 40) && (window.innerHeight > 240)) {
        canvas.width = window.innerWidth - 16;
        canvas.height = window.innerHeight - 200;
        let w = canvas.clientWidth;
        let h = canvas.clientHeight;

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.viewport(0.0, 0.0, w, h);

        aspectRatio = w / h;
    }
};

// texture loader callback
let textureLoaderCallback = function () {
    let textureId = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + this.txNum);
    gl.bindTexture(gl.TEXTURE_2D, textureId);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
// set the filtering so we don't need mips
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
};

let worldViewProjection = function(carx, cary, carz, cardir, camx, camy, camz, aspectRatio) {
// Computes the world, view and projection matrices for the game.

// carx, cary and carz encodes the position of the car.
// Since the game is basically in 2D, cardir contains the rotation about the y-axis to orient the car
    let world = utils.identityMatrix();
    world = utils.multiplyMatrices(world, utils.MakeTranslateMatrix(carx, cary, carz));
    world = utils.multiplyMatrices(world, utils.MakeRotateYMatrix(cardir));

// The camera is placed at position camx, camy and camz. The view matrix should be computed using the
// LookAt camera matrix procedure, with the correct up-vector.
    let view = utils.MakeLookAt([camx, camy, camz], [carx, cary, carz], [0, 1, 0]);

// The projection matrix is perspective projection matrix, with the aspect ratio written in parameter
// aspectRatio, a vertical Fov-y of 60 degrees, and with near and far planes repsectively at 0.1 and 1000.0
    let projection = utils.MakePerspective(60, aspectRatio, 0.1, 1000.0);

    return [world, view, projection];
};

// The real app starts here
function main() {

    // setup everything else
    let canvas = document.getElementById("my-canvas");
    window.addEventListener("keyup", keyFunctionUp, false);
    window.addEventListener("keydown", keyFunctionDown, false);
    window.onresize = doResize;
    canvas.width = window.innerWidth - 16;
    canvas.height = window.innerHeight - 200;

    try {
        gl = canvas.getContext("webgl2");
    } catch (e) {
        console.log(e);
    }

    if (gl) {
        // Compile and link shaders
        program = gl.createProgram();
        let v1 = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(v1, vs);
        gl.compileShader(v1);
        if (!gl.getShaderParameter(v1, gl.COMPILE_STATUS)) {
            alert("ERROR IN VS SHADER : " + gl.getShaderInfoLog(v1));
        }
        let v2 = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(v2, fs);
        gl.compileShader(v2);
        if (!gl.getShaderParameter(v2, gl.COMPILE_STATUS)) {
            alert("ERROR IN FS SHADER : " + gl.getShaderInfoLog(v2));
        }
        gl.attachShader(program, v1);
        gl.attachShader(program, v2);
        gl.linkProgram(program);

        gl.useProgram(program);

        // Load mesh using the webgl-obj-loader library
        carMesh = new OBJ.Mesh(museumModelStr);
        skybox = new OBJ.Mesh(museumModelStr);

        // Create the textures
        imgtx = new Image();
        imgtx.txNum = 0;
        imgtx.onload = textureLoaderCallback;
        imgtx.src = manet_dejeuner;

        skyboxLattx = new Image();
        skyboxLattx.txNum = 1;
        skyboxLattx.onload = textureLoaderCallback;
        skyboxLattx.src = manet_dejeuner;

        skyboxTbtx = new Image();
        skyboxTbtx.txNum = 2;
        skyboxTbtx.onload = textureLoaderCallback;
        skyboxTbtx.src = manet_dejeuner;

        // links mesh attributes to shader attributes
        program.vertexPositionAttribute = gl.getAttribLocation(program, "in_pos");
        gl.enableVertexAttribArray(program.vertexPositionAttribute);

        program.vertexNormalAttribute = gl.getAttribLocation(program, "in_norm");
        gl.enableVertexAttribArray(program.vertexNormalAttribute);

        program.textureCoordAttribute = gl.getAttribLocation(program, "in_uv");
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.WVPmatrixUniform = gl.getUniformLocation(program, "pMatrix");
        program.NmatrixUniform = gl.getUniformLocation(program, "nMatrix");
        program.textureUniform = gl.getUniformLocation(program, "u_texture");
        program.lightDir = gl.getUniformLocation(program, "lightDir");
//		program.ambFact = gl.getUniformLocation(program, "ambFact");

        OBJ.initMeshBuffers(gl, carMesh);
        OBJ.initMeshBuffers(gl, skybox);

        // prepares the world, view and projection matrices.
        let w = canvas.clientWidth;
        let h = canvas.clientHeight;

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.viewport(0.0, 0.0, w, h);

//		perspectiveMatrix = utils.MakePerspective(60, w/h, 0.1, 1000.0);
        aspectRatio = w / h;

        // turn on depth testing
        gl.enable(gl.DEPTH_TEST);


        // algin the skybox with the light
        gLightDir = [-1.0, 0.0, 0.0, 0.0];
        skyboxWM = utils.multiplyMatrices(utils.MakeRotateZMatrix(30), utils.MakeRotateYMatrix(135));
        gLightDir = utils.multiplyMatrixVector(skyboxWM, gLightDir);

        drawScene();
    } else {
        alert("Error: WebGL not supported by your browser!");
    }
}

let lastUpdateTime;
let camVel = [0, 0, 0];
let fSk = 500.0;
let fDk = 2.0 * Math.sqrt(fSk);

// Driving dynamic coefficients
let sAT = 0.5;
let mAT = 5.0;
let ATur = 3.0;
let ATdr = 5.5;
let sBT = 1.0;
let mBT = 3.0;
let BTur = 5.0;
let BTdr = 5.5;
let Tfric = Math.log(0.05);
let sAS = 0.1;	// Not used yet
let mAS = 108.0;
let ASur = 1.0;	// Not used yet
let ASdr = 0.5;	// Not used yet

let carLinAcc = 0.0;
let carLinVel = 0.0;
let carAngVel = 0.0;
let preVz = 0;

function drawScene() {
    // compute time interval
    let currentTime = (new Date).getTime();
    let deltaT;
    if (lastUpdateTime) {
        deltaT = (currentTime - lastUpdateTime) / 1000.0;
    } else {
        deltaT = 1 / 50;
    }
    lastUpdateTime = currentTime;

    // call user procedure for world-view-projection matrices
    wvpMats = worldViewProjection(carX, 0.0, carZ, carAngle, cx, cy, cz, aspectRatio);

    viewMatrix = wvpMats[1];

    perspectiveMatrix = wvpMats[2];

    dvecmat = wvpMats[0];

    // computing car velocities
    carAngVel = mAS * deltaT * rvy;

    vz = -vz;
    // = 0.8 * deltaT * 60 * vz;
    if (vz > 0.1) {
        if (preVz > 0.1) {
            carLinAcc = carLinAcc + ATur * deltaT;
            if (carLinAcc > mAT) carLinAcc = mAT;
        } else if (carLinAcc < sAT) carLinAcc = sAT;
    } else if (vz > -0.1) {
        carLinAcc = carLinAcc - ATdr * deltaT * Math.sign(carLinAcc);
        if (Math.abs(carLinAcc) < 0.001) carLinAcc = 0.0;
    } else {
        if (preVz < 0.1) {
            carLinAcc = carLinAcc - BTur * deltaT;
            if (carLinAcc < -mBT) carLinAcc = -mBT;
        } else if (carLinAcc > -sBT) carLinAcc = -sBT;
    }
    preVz = vz;
    vz = -vz;
    carLinVel = carLinVel * Math.exp(Tfric * deltaT) - deltaT * carLinAcc;


    // Magic for moving the car
    worldMatrix = utils.multiplyMatrices(dvecmat, utils.MakeScaleMatrix(1.0));
    xaxis = [dvecmat[0], dvecmat[4], dvecmat[8]];
    yaxis = [dvecmat[1], dvecmat[5], dvecmat[9]];
    zaxis = [dvecmat[2], dvecmat[6], dvecmat[10]];

    if (rvy != 0) {
        qy = Quaternion.fromAxisAngle(yaxis, utils.degToRad(carAngVel));
        newDvecmat = utils.multiplyMatrices(qy.toMatrix4(), dvecmat);
        R11 = newDvecmat[10];
        R12 = newDvecmat[8];
        R13 = newDvecmat[9];
        R21 = newDvecmat[2];
        R22 = newDvecmat[0];
        R23 = newDvecmat[1];
        R31 = newDvecmat[6];
        R32 = newDvecmat[4];
        R33 = newDvecmat[5];

        if ((R31 < 1) && (R31 > -1)) {
            theta = -Math.asin(R31);
            phi = Math.atan2(R32 / Math.cos(theta), R33 / Math.cos(theta));
            psi = Math.atan2(R21 / Math.cos(theta), R11 / Math.cos(theta));

        } else {
            phi = 0;
            if (R31 <= -1) {
                theta = Math.PI / 2;
                psi = phi + Math.atan2(R12, R13);
            } else {
                theta = -Math.PI / 2;
                psi = Math.atan2(-R12, -R13) - phi;
            }
        }
//			elevation = theta/Math.PI*180;
//			roll      = phi/Math.PI*180;
//			angle     = psi/Math.PI*180;
        carAngle = psi / Math.PI * 180;
    }
    // spring-camera system
    // target coordinates
    nC = utils.multiplyMatrixVector(worldMatrix, [0, 5, -10, 1]);
    // distance from target

    deltaCam = [cx - nC[0], cy - nC[1], cz - nC[2]];

    camAcc = [-fSk * deltaCam[0] - fDk * camVel[0], -fSk * deltaCam[1] - fDk * camVel[1], -fSk * deltaCam[2] - fDk * camVel[2]];

    camVel = [camVel[0] + camAcc[0] * deltaT, camVel[1] + camAcc[1] * deltaT, camVel[2] + camAcc[2] * deltaT];
    cx += camVel[0] * deltaT;
    cy += camVel[1] * deltaT;
    cz += camVel[2] * deltaT;

    // car motion
    delta = utils.multiplyMatrixVector(dvecmat, [0, 0, carLinVel, 0.0]);
    carX -= delta[0];
    carZ -= delta[2];

    projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewMatrix);

    // draws the skybox
    gl.bindBuffer(gl.ARRAY_BUFFER, skybox.vertexBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute, skybox.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, skybox.textureBuffer);
    gl.vertexAttribPointer(program.textureCoordAttribute, skybox.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, skybox.normalBuffer);
    gl.vertexAttribPointer(program.vertexNormalAttribute, skybox.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.uniform4f(program.lightDir, gLightDir[0], gLightDir[1], gLightDir[2], 1.0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, skybox.indexBuffer);
    WVPmatrix = utils.multiplyMatrices(projectionMatrix, utils.MakeScaleMatrix(200.0));
    gl.uniformMatrix4fv(program.WVPmatrixUniform, gl.FALSE, utils.transposeMatrix(WVPmatrix));
    gl.uniformMatrix4fv(program.NmatrixUniform, gl.FALSE, utils.identityMatrix());
    gl.uniform1i(program.textureUniform, 2);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 12);
    gl.uniform1i(program.textureUniform, 1);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);


    // draws the request
    gl.bindBuffer(gl.ARRAY_BUFFER, carMesh.vertexBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute, carMesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, carMesh.textureBuffer);
    gl.vertexAttribPointer(program.textureCoordAttribute, carMesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, carMesh.normalBuffer);
    gl.vertexAttribPointer(program.vertexNormalAttribute, carMesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, carMesh.indexBuffer);

    gl.uniform1i(program.textureUniform, 0);
    gl.uniform4f(program.lightDir, gLightDir[0], gLightDir[1], gLightDir[2], 0.2);
    WVPmatrix = utils.multiplyMatrices(projectionMatrix, worldMatrix);
    gl.uniformMatrix4fv(program.WVPmatrixUniform, gl.FALSE, utils.transposeMatrix(WVPmatrix));
    gl.uniformMatrix4fv(program.NmatrixUniform, gl.FALSE, utils.transposeMatrix(worldMatrix));
    gl.drawElements(gl.TRIANGLES, carMesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    window.requestAnimationFrame(drawScene);
}
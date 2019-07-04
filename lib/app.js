var canvas, checkbox;
var gl = null;

var shaderProgram = new Array(2); //Two handles, one for each shaders' couple. 0 = goureaud; 1 = phong

var shaderDir = "shaders/";
var modelsDir = "assets/";

var perspectiveMatrix,
    viewMatrix;

var vertexNormalHandle = new Array(2);
var vertexPositionHandle = new Array(2);
var vertexUVHandle = new Array(2);
var textureFileHandle = new Array(2);
var textureInfluenceHandle = new Array(2);
var ambientLightInfluenceHandle = new Array(2);
var ambientLightColorHandle = new Array(2);

var matrixPositionHandle = new Array(2);
var materialDiffColorHandle = new Array(2);
var lightDirectionHandle = new Array(2);
var lightPositionHandle = new Array(2);
var lightColorHandle = new Array(2);
var lightTypeHandle = new Array(2);
var eyePositionHandle = new Array(2);
var materialSpecColorHandle = new Array(2);
var materialSpecPowerHandle = new Array(2);
var objectSpecularPower = 20.0;

//Parameters for light definition (directional light)
var dirLightAlpha = -utils.degToRad(60);
var dirLightBeta = -utils.degToRad(120);
//Use the Utils 0.2 to use mat3
var lightDirection = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
    Math.sin(dirLightAlpha),
    Math.cos(dirLightAlpha) * Math.sin(dirLightBeta),
];
var lightPosition = [0.0, 3.0, 0.0];
var lightColor = new Float32Array([1.0, 1.0, 1.0, 1.0]);

var sceneObjects; //total number of nodes
// The following arrays have sceneObjects as dimension.
var vertexBufferObjectId = [];
var indexBufferObjectId = [];
var objectWorldMatrix = [];
var projectionMatrix = [];
var facesNumber = [];
var diffuseColor = [];	//diffuse material colors of objs
var specularColor = [];
var diffuseTextureObj = [];	//Texture material
var nTexture = [];	//Number of textures per object

//Parameters for Camera (10/13/36) - -20.-20
var cx = 1.479;
var cy = 1.8;
var cz = 0.09;
var elevation = 0.01;
var angle = -93;
var vx = 0, vy = 0, vz = 0;
var rvx = 0, rvy = 0, rvz = 0;
var theta = 0, psi = 0;

var keys = [];

const KEY_CODE = {
    'A': 65,
    'W': 87,
    'S': 83,
    'D': 68,
    'I': 73,
    'UP': 38,
    'DOWN': 40
};

// Eye parameters;
// We need now 4 eye vector, one for each cube
// As well as 4 light direction vectors for the same reason
var observerPositionObj = [];
var lightDirectionObj = [];
var lightPositionObj = [];

var currentLightType = 5;
var currentShader = 0;                //Defines the current shader in use.
var textureInfluence = 1.0;
var ambientLightInfluence = 0.0;
var ambientLightColor = [1.0, 1.0, 1.0, 1.0];

function main() {

    canvas = document.getElementById("my-canvas");

    //Setting up the interaction using keys
    initInteraction();

    try {
        gl = canvas.getContext("webgl2", {alpha: false});
    } catch (e) {
        console.log(e);
    }
    if (gl) {

        //Setting the size for the canvas equal to half the browser window
        //and other useful parameters
        var w = canvas.clientWidth;
        var h = canvas.clientHeight;
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.viewport(0.0, 0.0, w, h);
        gl.enable(gl.DEPTH_TEST);
        perspectiveMatrix = utils.MakePerspective(60, w / h, 0.1, 1000.0);

        //Open the json file containing the 3D model to load,
        //parse it to retreive objects' data
        //and creates the VBO and IBO from them
        //The vertex format is (x,y,z,nx,ny,nz,u,v)
        loadModel("museumTri.json");

        //Load shaders' code
        //compile them
        //retrieve the handles
        loadShaders();

        //Rendering cycle
        drawScene();


    } else {
        alert("Error: Your browser does not support WebGL.");
    }

}

function loadShaders() {
    // odd numbers are VSs, even are FSs
    var numShader = 0;

    //*** Shaders loading using external files
    utils.loadFiles([shaderDir + 'vs_g.glsl', shaderDir + 'fs_g.glsl'],
        function (shaderText) {
            for (i = 0; i < shaderText.length; i += 2) {
                var vertexShader = gl.createShader(gl.VERTEX_SHADER);
                gl.shaderSource(vertexShader, shaderText[i]);
                gl.compileShader(vertexShader);
                if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
                    alert("ERROR IN VS SHADER : " + gl.getShaderInfoLog(vertexShader));
                }
                var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
                gl.shaderSource(fragmentShader, shaderText[i + 1]);
                gl.compileShader(fragmentShader);
                if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
                    alert("ERROR IN FS SHADER : " + gl.getShaderInfoLog(fragmentShader));
                }
                shaderProgram[numShader] = gl.createProgram();
                gl.attachShader(shaderProgram[numShader], vertexShader);
                gl.attachShader(shaderProgram[numShader], fragmentShader);
                gl.linkProgram(shaderProgram[numShader]);
                if (!gl.getProgramParameter(shaderProgram[numShader], gl.LINK_STATUS)) {
                    alert("Unable to initialize the shader program...");
                }
                numShader++;
            }

        });

    //*** Getting the handles to the shaders' vars

    for (i = 0; i < numShader; i++) {


        vertexPositionHandle[i] = gl.getAttribLocation(shaderProgram[i], 'inPosition');
        vertexNormalHandle[i] = gl.getAttribLocation(shaderProgram[i], 'inNormal');
        vertexUVHandle[i] = gl.getAttribLocation(shaderProgram[i], 'inUVs');

        matrixPositionHandle[i] = gl.getUniformLocation(shaderProgram[i], 'wvpMatrix');

        materialDiffColorHandle[i] = gl.getUniformLocation(shaderProgram[i], 'mDiffColor');
        materialSpecColorHandle[i] = gl.getUniformLocation(shaderProgram[i], 'mSpecColor');
        materialSpecPowerHandle[i] = gl.getUniformLocation(shaderProgram[i], 'mSpecPower');
        textureFileHandle[i] = gl.getUniformLocation(shaderProgram[i], 'textureFile');

        textureInfluenceHandle[i] = gl.getUniformLocation(shaderProgram[i], 'textureInfluence');
        ambientLightInfluenceHandle[i] = gl.getUniformLocation(shaderProgram[i], 'ambientLightInfluence');
        ambientLightColorHandle[i] = gl.getUniformLocation(shaderProgram[i], 'ambientLightColor');

        eyePositionHandle[i] = gl.getUniformLocation(shaderProgram[i], 'eyePosition');

        lightDirectionHandle[i] = gl.getUniformLocation(shaderProgram[i], 'lightDirection');
        lightPositionHandle[i] = gl.getUniformLocation(shaderProgram[i], 'lightPosition');
        lightColorHandle[i] = gl.getUniformLocation(shaderProgram[i], 'lightColor');
        lightTypeHandle[i] = gl.getUniformLocation(shaderProgram[i], 'lightType');

    }

}

function loadModel(modelName) {

    utils.get_json(modelsDir + modelName, function (loadedModel) {

        sceneObjects = loadedModel.meshes.length;

        //preparing to store objects' world matrix & the lights & material properties per object
        for (i = 0; i < sceneObjects; i++) {
            objectWorldMatrix[i] = new utils.identityMatrix();
            projectionMatrix[i] = new utils.identityMatrix();
            diffuseColor[i] = [1.0, 1.0, 1.0, 1.0];
            specularColor[i] = [1.0, 1.0, 1.0, 1.0];
            observerPositionObj[i] = new Array(3);
            lightDirectionObj[i] = new Array(3);
            lightPositionObj[i] = new Array(3);
        }

        for (i = 0; i < sceneObjects; i++) {

            // console.log(loadedModel.meshes[i].name);

            //Creating the vertex data.
            var meshMatIndex = loadedModel.meshes[i].materialindex;

            var UVFileNamePropertyIndex = -1;
            var diffuseColorPropertyIndex = -1;
            var specularColorPropertyIndex = -1;
            for (n = 0; n < loadedModel.materials[meshMatIndex].properties.length; n++) {
                if (loadedModel.materials[meshMatIndex].properties[n].key == "$tex.file") UVFileNamePropertyIndex = n;
                if (loadedModel.materials[meshMatIndex].properties[n].key == "$clr.diffuse") diffuseColorPropertyIndex = n;
                if (loadedModel.materials[meshMatIndex].properties[n].key == "$clr.specular") specularColorPropertyIndex = n;
            }


            //*** Getting vertex and normals
            var objVertex = [];
            for (n = 0; n < loadedModel.meshes[i].vertices.length / 3; n++) {
                objVertex.push(loadedModel.meshes[i].vertices[n * 3],
                    loadedModel.meshes[i].vertices[n * 3 + 1],
                    loadedModel.meshes[i].vertices[n * 3 + 2]);
                objVertex.push(loadedModel.meshes[i].normals[n * 3],
                    loadedModel.meshes[i].normals[n * 3 + 1],
                    loadedModel.meshes[i].normals[n * 3 + 2]);
                if (UVFileNamePropertyIndex >= 0) {
                    objVertex.push(loadedModel.meshes[i].texturecoords[0][n * 2],
                        loadedModel.meshes[i].texturecoords[0][n * 2 + 1]);

                } else {
                    objVertex.push(0.0, 0.0);
                }
            }

            facesNumber[i] = loadedModel.meshes[i].faces.length;
            s = 0;
            if (UVFileNamePropertyIndex >= 0) {

                nTexture[i] = true;

                var imageName = loadedModel.materials[meshMatIndex].properties[UVFileNamePropertyIndex].value;

                var getTexture = function (imageName) {

                    var image = new Image();
                    image.webglTexture = false;

                    image.onload = function (e) {

                        var texture = gl.createTexture();

                        gl.bindTexture(gl.TEXTURE_2D, texture);

                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        gl.generateMipmap(gl.TEXTURE_2D);

                        gl.bindTexture(gl.TEXTURE_2D, null);
                        image.webglTexture = texture;
                    };

                    image.src = textures[imageName];

                    return image;
                };

                diffuseTextureObj[i] = getTexture(imageName);
            } else {
                nTexture[i] = false;
            }

            //*** mesh color
            diffuseColor[i] = loadedModel.materials[meshMatIndex].properties[diffuseColorPropertyIndex].value; // diffuse value

            diffuseColor[i].push(1.0);													// Alpha value added

            specularColor[i] = loadedModel.materials[meshMatIndex].properties[specularColorPropertyIndex].value;
            console.log("Specular: " + specularColor[i]);

            //vertices, normals and UV set 1
            vertexBufferObjectId[i] = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObjectId[i]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objVertex), gl.STATIC_DRAW);


            //Creating index buffer
            facesData = [];
            for (n = 0; n < loadedModel.meshes[i].faces.length; n++) {

                facesData.push(loadedModel.meshes[i].faces[n][0],
                    loadedModel.meshes[i].faces[n][1],
                    loadedModel.meshes[i].faces[n][2]
                );
            }


            indexBufferObjectId[i] = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObjectId[i]);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(facesData), gl.STATIC_DRAW);


            //creating the objects' world matrix
            objectWorldMatrix[i] = loadedModel.rootnode.children[i].transformation;
        }
    });


}

function initInteraction() {
    let keyFunctionUp = function (e) {
        if (keys[e.keyCode]) {
            keys[e.keyCode] = false;
            switch (e.keyCode) {
                case KEY_CODE.A:
                    rvy -= 0.5;
                    break;
                case KEY_CODE.D:
                    rvy += 0.5;
                    break;
                case KEY_CODE.W:
                    vz += 0.5;
                    break;
                case KEY_CODE.S:
                    vz -= 0.5;
                    break;
                case KEY_CODE.UP:
                    rvx -= 1;
                    break;
                case KEY_CODE.DOWN:
                    rvx += 1;
                    break;
                case KEY_CODE.I:
                    console.log("Info up");
                    break;
            }
        }
    };

    let keyFunctionDown = function (e) {
        if (!keys[e.keyCode]) {
            keys[e.keyCode] = true;
            switch (e.keyCode) {
                case KEY_CODE.A:
                    rvy += 0.5;
                    break;
                case KEY_CODE.D:
                    rvy -= 0.5;
                    break;
                case KEY_CODE.W:
                    vz -= 0.5;
                    break;
                case KEY_CODE.S:
                    vz += 0.5;
                    break;
                case KEY_CODE.UP:
                    rvx += 1;
                    break;
                case KEY_CODE.DOWN:
                    rvx -= 1;
                    break;
                case KEY_CODE.I:
                    console.log("Info down");
                    break;
            }
        }
    };

    window.addEventListener("keyup", keyFunctionUp, false);
    window.addEventListener("keydown", keyFunctionDown, false);
}


function computeMatrices() {
    // viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);
    viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);

    var viewMatrixTransposed = utils.transposeMatrix(viewMatrix);
    viewMatrixTransposed[12] = viewMatrixTransposed[13] = viewMatrixTransposed[14] = 0.0;
    var xaxis = [viewMatrixTransposed[0], viewMatrixTransposed[4], viewMatrixTransposed[8]];
    var yaxis = [viewMatrixTransposed[1], viewMatrixTransposed[5], viewMatrixTransposed[9]];
    var zaxis = [viewMatrixTransposed[2], viewMatrixTransposed[6], viewMatrixTransposed[10]];

    if (rvx || rvy) {
        var qx = Quaternion.fromAxisAngle(xaxis, utils.degToRad(rvx));
        var qy = Quaternion.fromAxisAngle(yaxis, utils.degToRad(rvy));
        var qz = Quaternion.fromAxisAngle(zaxis, utils.degToRad(rvz));
        var viewMatFromQuat = utils.multiplyMatrices(utils.multiplyMatrices(utils.multiplyMatrices(qy.toMatrix4(), qx.toMatrix4()), qz.toMatrix4()), viewMatrixTransposed);
        var R11 = viewMatFromQuat[10];
        var R12 = viewMatFromQuat[8];
        var R13 = viewMatFromQuat[9];
        var R21 = viewMatFromQuat[2];
        var R31 = viewMatFromQuat[6];

        if ((R31 < 1) && (R31 > -1)) {
            theta = -Math.asin(R31);
            psi = Math.atan2(R21 / Math.cos(theta), R11 / Math.cos(theta));
        } else if (R31 <= -1) {
            theta = Math.PI / 2;
            psi = Math.atan2(R12, R13);
        } else {
            theta = -Math.PI / 2;
            psi = Math.atan2(-R12, -R13);
        }

        elevation = utils.radToDeg(theta);
        angle = -utils.radToDeg(psi); // why the -angle ????
    }

    var delta = utils.multiplyMatrixVector(viewMatrixTransposed, [vx, vy, vz, 0.0]);
    cx += delta[0] / 10;
    // cy += delta[1] / 10; // we need to keep the camera at the same height
    cz += delta[2] / 10;

    var eyeTemp = [cx, cy, cz];

    for (var i = 0; i < sceneObjects; i++) {
        projectionMatrix[i] = utils.multiplyMatrices(perspectiveMatrix, utils.multiplyMatrices(viewMatrix, objectWorldMatrix[i]));

        lightDirectionObj[i] = utils.multiplyMatrix3Vector3(utils.transposeMatrix3(utils.sub3x3from4x4(objectWorldMatrix[i])), lightDirection);

        lightPositionObj[i] = utils.multiplyMatrix3Vector3(utils.invertMatrix3(utils.sub3x3from4x4(objectWorldMatrix[i])), lightPosition);

        observerPositionObj[i] = utils.multiplyMatrix3Vector3(utils.invertMatrix3(utils.sub3x3from4x4(objectWorldMatrix[i])), eyeTemp);
    }
}

function drawScene() {

    computeMatrices();

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(shaderProgram[currentShader]);

    for (i = 0; i < sceneObjects; i++) {
        gl.uniformMatrix4fv(matrixPositionHandle[currentShader], false, utils.transposeMatrix(projectionMatrix[i]));

        gl.uniform1f(textureInfluenceHandle[currentShader], textureInfluence);
        gl.uniform1f(ambientLightInfluenceHandle[currentShader], ambientLightInfluence);

        gl.uniform1i(textureFileHandle[currentShader], 0);		//Texture channel 0 used for diff txt
        if (nTexture[i] == true && diffuseTextureObj[i].webglTexture) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, diffuseTextureObj[i].webglTexture);
        }

        gl.uniform4f(lightColorHandle[currentShader], lightColor[0],
            lightColor[1],
            lightColor[2],
            lightColor[3]);
        gl.uniform4f(materialDiffColorHandle[currentShader], diffuseColor[i][0],
            diffuseColor[i][1],
            diffuseColor[i][2],
            diffuseColor[i][3]);

        gl.uniform4f(materialSpecColorHandle[currentShader], specularColor[i][0],
            specularColor[i][1],
            specularColor[i][2],
            specularColor[i][3]);
        gl.uniform4f(ambientLightColorHandle[currentShader], ambientLightColor[0],
            ambientLightColor[1],
            ambientLightColor[2],
            ambientLightColor[3]);

        gl.uniform1f(materialSpecPowerHandle[currentShader], objectSpecularPower);


        gl.uniform3f(lightDirectionHandle[currentShader], lightDirectionObj[i][0],
            lightDirectionObj[i][1],
            lightDirectionObj[i][2]);
        gl.uniform3f(lightPositionHandle[currentShader], lightPositionObj[i][0],
            lightPositionObj[i][1],
            lightPositionObj[i][2]);

        gl.uniform1i(lightTypeHandle[currentShader], currentLightType);

        gl.uniform3f(eyePositionHandle[currentShader], observerPositionObj[i][0],
            observerPositionObj[i][1],
            observerPositionObj[i][2]);


        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObjectId[i]);

        gl.enableVertexAttribArray(vertexPositionHandle[currentShader]);
        gl.vertexAttribPointer(vertexPositionHandle[currentShader], 3, gl.FLOAT, false, 4 * 8, 0);

        gl.enableVertexAttribArray(vertexNormalHandle[currentShader]);
        gl.vertexAttribPointer(vertexNormalHandle[currentShader], 3, gl.FLOAT, false, 4 * 8, 4 * 3);

        gl.vertexAttribPointer(vertexUVHandle[currentShader], 2, gl.FLOAT, false, 4 * 8, 4 * 6);
        gl.enableVertexAttribArray(vertexUVHandle[currentShader]);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObjectId[i]);
        gl.drawElements(gl.TRIANGLES, facesNumber[i] * 3, gl.UNSIGNED_SHORT, 0);

        gl.disableVertexAttribArray(vertexPositionHandle[currentShader]);
        gl.disableVertexAttribArray(vertexNormalHandle[currentShader]);
    }

    window.requestAnimationFrame(drawScene);
}

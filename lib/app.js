var canvas;
var gl = null;

var shaderProgram = null;

var shaderDir = "shaders/";
var modelsDir = "assets/";

var perspectiveMatrix, viewMatrix;

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
var dirLightAlpha = -utils.degToRad(180);//60 Z-axis
var dirLightBeta = -utils.degToRad(-90);//120 X-axis
//Use the Utils 0.2 to use mat3
var lightDirection = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
    Math.sin(dirLightAlpha),
    Math.cos(dirLightAlpha) * Math.sin(dirLightBeta),
];
var lightPosition = [-4.35, 0.0, 2.45];//[0.0, 3.0, 0.0];
var lightColor = new Float32Array([1.0, 0.0, 1.0, 1.0]);

var sceneObjects = [];
const FIXED_ELEMENTS = 13;
const MAX_ELEVATION_ANGLE = 0.75;
const MIN_ELEVATION_ANGLE = MAX_ELEVATION_ANGLE * -1;

//Parameters for Camera (10/13/36) - -20.-20
var cx = 1.479;
var cy = 1.8;
var cz = 0.09;
var elevation = 0.01;
var angle = -90;
var vx = 0, vy = 0, vz = 0;
var rvx = 0, rvy = 0, rvz = 0;
var theta = 0, psi = 0;
var prevVz = 0, prevCx = 0, prevCz = 0;
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

var currentLightType = 0; //0
var textureInfluence = 1.0;
var ambientLightInfluence = 0.8;
var ambientLightColor = [0.937, 0.84, 0.73, 1.0];

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

        // loading info objects
        loadModel("infoObjects.json");

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
                shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, vertexShader);
                gl.attachShader(shaderProgram, fragmentShader);
                gl.linkProgram(shaderProgram);
                if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                    alert("Unable to initialize the shader program...");
                }
            }

        });

    //*** Getting the handles to the shaders' vars

    vertexPositionHandle = gl.getAttribLocation(shaderProgram, 'inPosition');
    vertexNormalHandle = gl.getAttribLocation(shaderProgram, 'inNormal');
    vertexUVHandle = gl.getAttribLocation(shaderProgram, 'inUVs');

    matrixPositionHandle = gl.getUniformLocation(shaderProgram, 'wvpMatrix');

    materialDiffColorHandle = gl.getUniformLocation(shaderProgram, 'mDiffColor');
    materialSpecColorHandle = gl.getUniformLocation(shaderProgram, 'mSpecColor');
    materialSpecPowerHandle = gl.getUniformLocation(shaderProgram, 'mSpecPower');
    textureFileHandle = gl.getUniformLocation(shaderProgram, 'textureFile');

    textureInfluenceHandle = gl.getUniformLocation(shaderProgram, 'textureInfluence');
    ambientLightInfluenceHandle = gl.getUniformLocation(shaderProgram, 'ambientLightInfluence');
    ambientLightColorHandle = gl.getUniformLocation(shaderProgram, 'ambientLightColor');

    eyePositionHandle = gl.getUniformLocation(shaderProgram, 'eyePosition');

    lightDirectionHandle = gl.getUniformLocation(shaderProgram, 'lightDirection');
    lightPositionHandle = gl.getUniformLocation(shaderProgram, 'lightPosition');
    lightColorHandle = gl.getUniformLocation(shaderProgram, 'lightColor');
    lightTypeHandle = gl.getUniformLocation(shaderProgram, 'lightType');


}

function loadModel(modelName) {

    utils.get_json(modelsDir + modelName, function (loadedModel) {

        //preparing to store objects' world matrix & the lights & material properties per object
        for (var i = 0; i < loadedModel.meshes.length; i++) {
            let mesh = loadedModel.meshes[i];
            var meshMatIndex = mesh.materialindex;
            let material = loadedModel.materials[meshMatIndex];

            let object = GLObjectModel.create(material, mesh, loadedModel.rootnode.children[i].transformation);

            sceneObjects.push(object);
        }
    });
}

let paint_name = -1;

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
                    prevVz = vz;
                    vz += 0.5;
                    break;
                case KEY_CODE.S:
                    prevVz = vz;
                    vz -= 0.5;
                    break;
                case KEY_CODE.UP:
                    rvx -= 1;
                    break;
                case KEY_CODE.DOWN:
                    rvx += 1;
                    break;
                case KEY_CODE.I:
                    paint_name = -1;
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
                    prevVz = vz;
                    vz -= 0.5;
                    break;
                case KEY_CODE.S:
                    prevVz = vz;
                    vz += 0.5;
                    break;
                case KEY_CODE.UP:
                    rvx += 1;
                    break;
                case KEY_CODE.DOWN:
                    rvx -= 1;
                    break;
                case KEY_CODE.I:
                    paint_name = get_painting_name([cx, cy, cz]);
                    break;
            }
        }
    };

    window.addEventListener("keyup", keyFunctionUp, false);
    window.addEventListener("keydown", keyFunctionDown, false);
}

function get_light(element){
    var light = {
        "color": lightColor,
        "position": lightPosition,
        "direction": lightDirection,
        "type": currentLightType
    };

    if(element.name === "self"){
        // light.color = [0.35, 0.7, 0.94, 1.0];
        light.color = [1, 0.98, 0.85, 1.0];
        light.position = [0.25, 2.3, 0];
        light.type = 3;
    } else if(element.name === "guernica"){
        light.color = [0.35, 0.7, 0.94, 1.0];
        light.position = [0.1, 2.3, 2];
        light.type = 3;
    } else if(element.name === "Picasso_Guernica"){
        light.color = [1, 1, 1, 1.0];
        light.position = [0.1, 2.3, 2];
        light.type = 3;
    } else if(element.name === "a_sunday" || element.name === "Seurat_a_sunday"){
        light.color = [1, 0.98, 0.85, 1.0];
        light.position = [-1.1755, 1.88744, 2];
        light.type = 3;
    } else if(element.name === "the_bathers" || element.name === "theBathers_Cezanne"){
        light.color = [1, 0.98, 0.85, 1.0];
        light.position = [-2.17547, 1.88744, 2];
        light.type = 3;
    } else if(element.name === "starring_night" || element.name === "starringNight"){
        light.color = [1, 0.98, 0.85, 1.0];
        light.position = [-3.29439, 1.88744, 2];
        light.type = 3;
    } else if(element.name === "fourth_estate" || element.name === "Volpedo_FourthEstate"){
        light.color = [1, 0.98, 0.85, 1.0];
        light.position = [-6.103585, 1.88744, 2];
        light.type = 3;
    } else if(element.name === "dejeuner"){
        light.color = [1, 0.98, 0.85, 1.0];
        light.position = [-6.103585, 1.88744, 0];
        light.type = 3;
    } else if(element.name === "the_dance" || element.name === "sunrise"){
        light.color = [1, 0.98, 0.85, 1.0];
        light.position = [-3.29439, 1.88744, 0];
        light.type = 3;
    } else if(element.name === "boulevard_monmarte" || element.name === "scream"){
        light.color = [1, 0.98, 0.85, 1.0];
        light.position = [-2.17547, 1.88744, 0];
        light.type = 3;
    }

    return light;
}


function computeMatrices() {
    prevCx = cx;
    prevCz = cz;
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

        theta = (theta >= MAX_ELEVATION_ANGLE) ? MAX_ELEVATION_ANGLE : (theta <= MIN_ELEVATION_ANGLE ? MIN_ELEVATION_ANGLE : theta);

        elevation = utils.radToDeg(theta);
        angle = -utils.radToDeg(psi); // why the -angle ????
    }


    var delta = utils.multiplyMatrixVector(viewMatrixTransposed, [vx, vy, vz, 0.0]);
    cx += delta[0] / 10;
    cz += delta[2] / 10;

    //Move is invalid
    if (prevVz !== vz && !is_valid_move([cx, cy, cz])) {
        cx = prevCx;
        cz = prevCz;
    }

    var camCoods = [cx, cy, cz];

    _.forEach(sceneObjects, (elem, index) => {
        //TODO: find a fancy way to know whether the element is an info element or not.
        if(index >= FIXED_ELEMENTS && elem.name !== paint_name){
            elem.hide();
        }else {
            elem.setProjectionMatrix(perspectiveMatrix, viewMatrix);
        }

        var light = get_light(elem);
        elem.setLightDirection(light.direction);
        elem.setLightPosition(light.position);
        elem.setLightColor(light.color);
        elem.setLightType(light.type);
        elem.setObserverPosition(camCoods);
    });
}

function drawScene() {

    computeMatrices();

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(shaderProgram);

    _.forEach(sceneObjects, (elem) => {
        gl.uniformMatrix4fv(matrixPositionHandle, false, utils.transposeMatrix(elem.projectionMatrix));

        gl.uniform1f(textureInfluenceHandle, textureInfluence);
        gl.uniform1f(ambientLightInfluenceHandle, ambientLightInfluence);

        gl.uniform1i(textureFileHandle, 0);		//Texture channel 0 used for diff txt
        if (elem.nTexture === true && elem.diffuseTextureObj.webglTexture) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, elem.diffuseTextureObj.webglTexture);
        }

        gl.uniform4f(lightColorHandle, elem.lightColor[0], elem.lightColor[1], elem.lightColor[2], elem.lightColor[3]);
        gl.uniform4f(materialDiffColorHandle, elem.diffuseColor[0], elem.diffuseColor[1], elem.diffuseColor[2], elem.diffuseColor[3]);

        gl.uniform4f(materialSpecColorHandle, elem.specularColor[0], elem.specularColor[1], elem.specularColor[2], elem.specularColor[3]);
        gl.uniform4f(ambientLightColorHandle, ambientLightColor[0], ambientLightColor[1], ambientLightColor[2], ambientLightColor[3]);

        gl.uniform1f(materialSpecPowerHandle, objectSpecularPower);


        gl.uniform3f(lightDirectionHandle, elem.lightDirectionObj[0], elem.lightDirectionObj[1], elem.lightDirectionObj[2]);
        gl.uniform3f(lightPositionHandle, elem.lightPositionObj[0], elem.lightPositionObj[1], elem.lightPositionObj[2]);

        gl.uniform1i(lightTypeHandle, elem.lightType);

        gl.uniform3f(eyePositionHandle, elem.observerPositionObj[0], elem.observerPositionObj[1], elem.observerPositionObj[2]);


        gl.bindBuffer(gl.ARRAY_BUFFER, elem.vertexBufferObjectId);

        gl.enableVertexAttribArray(vertexPositionHandle);
        gl.vertexAttribPointer(vertexPositionHandle, 3, gl.FLOAT, false, 4 * 8, 0);

        gl.enableVertexAttribArray(vertexNormalHandle);
        gl.vertexAttribPointer(vertexNormalHandle, 3, gl.FLOAT, false, 4 * 8, 4 * 3);

        gl.vertexAttribPointer(vertexUVHandle, 2, gl.FLOAT, false, 4 * 8, 4 * 6);
        gl.enableVertexAttribArray(vertexUVHandle);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elem.indexBufferObjectId);
        gl.drawElements(gl.TRIANGLES, elem.facesNumber * 3, gl.UNSIGNED_SHORT, 0);

        gl.disableVertexAttribArray(vertexPositionHandle);
        gl.disableVertexAttribArray(vertexNormalHandle);
    });

    window.requestAnimationFrame(drawScene);
}

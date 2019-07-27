class GLObjectModel {

    constructor() {
        this.facesNumber = null;
        this.diffuseTextureObj = null;
        this.diffuseColor = [];
        this.specularColor = null;
        this.vertexBufferObjectId = null;
        this.indexBufferObjectId = null;
        this.objectWorldMatrix = null;

        this.name = null;
        this.nTexture = true;
        this.observerPositionObj = new Array(3);
        this.lightDirectionObj = new Array(3);
        this.lightPositionObj = new Array(3);
        this.lightColor = new Float32Array([1.0, 1.0, 1.0, 1.0]);
        this.lightType = 0;
        this.projectionMatrix = utils.identityMatrix();
    }

    static __getTexture(imageName) {

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
    }

    static create(material, mesh, owm) {
        let self = new GLObjectModel();
        self.name = mesh.name || null;
        self.objectWorldMatrix = owm;

        self.facesNumber = mesh.faces.length;

        //*** Getting vertex and normals
        var objVertex = [];
        for (let n = 0; n < mesh.vertices.length / 3; n++) {
            objVertex.push(mesh.vertices[n * 3], mesh.vertices[n * 3 + 1], mesh.vertices[n * 3 + 2]);
            objVertex.push(mesh.normals[n * 3], mesh.normals[n * 3 + 1], mesh.normals[n * 3 + 2]);
            objVertex.push(mesh.texturecoords[0][n * 2], mesh.texturecoords[0][n * 2 + 1]);
        }

        self.diffuseTextureObj = GLObjectModel.__getTexture(self.name);


        //*** mesh color
        self.diffuseColor = _.find(material.properties, (e) => e.key === '$clr.diffuse').value || []; // diffuse value
        self.diffuseColor.push(1.0); // Alpha value added
        self.specularColor = _.find(material.properties, (e) => e.key === '$clr.specular').value;

        //vertices, normals and UV set 1
        self.vertexBufferObjectId = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, self.vertexBufferObjectId);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objVertex), gl.STATIC_DRAW);


        //Creating index buffer
        let facesData = [];
        for (let n = 0; n < mesh.faces.length; n++) {
            facesData.push(mesh.faces[n][0], mesh.faces[n][1], mesh.faces[n][2]);
        }

        self.indexBufferObjectId = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.indexBufferObjectId);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(facesData), gl.STATIC_DRAW);

        return self;
    };

    setProjectionMatrix(perspectiveMatrix, viewMatrix) {
        this.projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, utils.multiplyMatrices(viewMatrix, this.objectWorldMatrix));
    }

    hide() {
        this.projectionMatrix = 0;
    }

    setLightDirection(lightDirection) {
        this.lightDirectionObj = utils.multiplyMatrix3Vector3(utils.transposeMatrix3(utils.sub3x3from4x4(this.objectWorldMatrix)), lightDirection);
    }

    setLightPosition(lightPosition) {
        this.lightPositionObj = utils.multiplyMatrix3Vector3(utils.invertMatrix3(utils.sub3x3from4x4(this.objectWorldMatrix)), lightPosition);
    }

    setObserverPosition(camCoords){
        this.observerPositionObj = utils.multiplyMatrix3Vector3(utils.invertMatrix3(utils.sub3x3from4x4(this.objectWorldMatrix)), camCoords);
    }

    setLightColor(lightColor){
        this.lightColor = lightColor;
    }

    setLightType(type){
        this.lightType = type;
    }
}
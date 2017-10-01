import { gl } from '../gl'

export class SimpleModel {

    vertexCount: number

    verticesVBO: WebGLBuffer
    normalsVBO: WebGLBuffer

    constructor(vertices: Float32Array, /* normals: Float32Array */) {
        //Vertex count
        this.vertexCount = vertices.length
        //Vertices buffer
        this.verticesVBO = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO)
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
        //Normals buffer
        // this.normalsBuffer = gl.createBuffer()
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer)
        // gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW)

        gl.bindBuffer(gl.ARRAY_BUFFER, null)
    }

    draw() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO)
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0)

        // gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer)
        // gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0)

        gl.drawArrays(gl.TRIANGLES, 0, this.vertexCount)
    }

}
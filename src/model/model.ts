import { gl } from '../gl'

export class SimpleModel {

    vertexCount: number

    verticesVBO: WebGLBuffer
    normalsVBO: WebGLBuffer

    constructor(vertices: Float32Array, /* normals: Float32Array */) {
        //Vertex count
        this.vertexCount = vertices.length / 3
        //Vertices buffer
        this.verticesVBO = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO)
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

        //Unbind
        gl.bindBuffer(gl.ARRAY_BUFFER, null)

        //Debug
        console.log(`Created model (${gl.isBuffer(this.verticesVBO)}) with ${this.vertexCount} vertices.`)
    }

}
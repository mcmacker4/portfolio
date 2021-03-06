import { gl } from '../gl'

export class Model {

    vertexCount: number

    verticesVBO: WebGLBuffer
    normalsVBO: WebGLBuffer

    constructor(vertices: Array<number> | Float32Array, normals: Array<number> | Float32Array) {

        vertices = (vertices instanceof Float32Array) ? vertices : new Float32Array(vertices)
        normals = (normals instanceof Float32Array) ? normals : new Float32Array(normals)

        //Vertex count
        this.vertexCount = vertices.length / 3
        
        //Vertices buffer
        this.verticesVBO = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesVBO)
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

        //Normals buffer
        this.normalsVBO = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsVBO)
        gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW)

        //Unbind
        gl.bindBuffer(gl.ARRAY_BUFFER, null)

        //Debug
        console.log(`Created model (${gl.isBuffer(this.verticesVBO)}) with ${this.vertexCount} vertices.`)
    }

}
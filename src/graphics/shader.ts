import { gl } from '../gl'

export abstract class ShaderProgram {

    program: WebGLProgram

    constructor(vertexSrc: string, fragmentSrc: string) {
        this.program = gl.createProgram()
        var vertexShader = this.createShader(gl.VERTEX_SHADER, vertexSrc)
        var fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentSrc)
        gl.attachShader(this.program, vertexShader)
        gl.attachShader(this.program, fragmentShader)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
        gl.linkProgram(this.program)
        if(!gl.getProgramParameter(this.program, gl.LINK_STATUS))
            throw new Error(gl.getProgramInfoLog(this.program))
        gl.validateProgram(this.program)
        if(!gl.getProgramParameter(this.program, gl.VALIDATE_STATUS))
            throw new Error(gl.getProgramInfoLog(this.program))
    }

    start() {
        gl.useProgram(this.program)
    }

    stop() {
        gl.useProgram(null)
    }

    private createShader(type: number, source: string) {
        var shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
            throw new Error(gl.getShaderInfoLog(shader))
        return shader
    }

}

export class SimpleShader extends ShaderProgram {

    loadProjectionMatrix(matrix: Float32Array) {
        var location = gl.getUniformLocation(this.program, "projectionMatrix")
        gl.uniformMatrix4fv(location, false, matrix)
    }

    loadViewMatrix(matrix: Float32Array) {
        var location = gl.getUniformLocation(this.program, "viewMatrix")
        gl.uniformMatrix4fv(location, false, matrix)
    }

    loadModelMatrix(matrix: Float32Array) {
        var location = gl.getUniformLocation(this.program, "modelMatrix")
        gl.uniformMatrix4fv(location, false, matrix)
    }

}
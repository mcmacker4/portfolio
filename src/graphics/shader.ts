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

    getAttributeLocation(name: string) : number {
        return gl.getAttribLocation(this.program, name)
    }

    getUniformLocation(name: string) : WebGLUniformLocation {
        return gl.getUniformLocation(this.program, name)
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

export class DefaultShader extends ShaderProgram {

    readonly positionAttr: number
    readonly normalAttr: number

    readonly projectionMatrixLocation: WebGLUniformLocation
    readonly viewMatrixLocation: WebGLUniformLocation
    readonly modelMatrixLocation: WebGLUniformLocation

    constructor(vertexSrc: string, fragmentSrc: string) {
        super(vertexSrc, fragmentSrc)
        this.positionAttr = this.getAttributeLocation("position")
        this.normalAttr = this.getAttributeLocation("normal")

        this.projectionMatrixLocation = this.getUniformLocation("projectionMatrix")
        this.viewMatrixLocation = this.getUniformLocation("viewMatrix")
        this.modelMatrixLocation = this.getUniformLocation("modelMatrix")
    }

    loadProjectionMatrix(matrix: Float32Array) {
        gl.uniformMatrix4fv(this.projectionMatrixLocation, false, matrix)
    }

    loadViewMatrix(matrix: Float32Array) {
        gl.uniformMatrix4fv(this.viewMatrixLocation, false, matrix)
    }

    loadModelMatrix(matrix: Float32Array) {
        gl.uniformMatrix4fv(this.modelMatrixLocation, false, matrix)
    }

}
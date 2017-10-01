import { SimpleModel } from './model/model'
import { SimpleShader } from './graphics/shader'

export const gl: WebGLRenderingContext = (<HTMLCanvasElement>document.getElementById('glCanvas')).getContext('webgl')

const vertices = [
    -0.5, 0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,
    
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    0.5, 0.5, 0.0,
]

const vertexShader = `\
attribute vec3 position;

varying vec3 color;

void main(void) {
    gl_Position = vec4(position, 1.0);
    color = vec3(position.x + 0.5, 1.0, position.y + 0.5);
}
`

const fragmentShader = `\
precision mediump float;

varying vec3 color;

void main(void) {
    gl_FragColor = vec4(color, 1.0);
}
`

class Portfolio {

    simpleModel: SimpleModel
    simpleShader: SimpleShader

    constructor() {
        //Model
        var verticesBuffer = new Float32Array(vertices.length)
        verticesBuffer.set(vertices)
        this.simpleModel = new SimpleModel(verticesBuffer)

        //Shader
        this.simpleShader = new SimpleShader(vertexShader, fragmentShader);
    }

    start() {
        gl.clearColor(0.2, 0.2, 0.4, 1.0)
        this.loop()
    }
    
    private loop() {
        gl.clear(gl.COLOR_BUFFER_BIT)

        this.simpleShader.start()
        this.simpleModel.draw()

        //requestAnimationFrame(() => this.loop())
    }

}

new Portfolio().start();
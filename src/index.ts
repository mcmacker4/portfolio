import { SimpleModel } from './model/model'
import { SimpleShader } from './graphics/shader'
import { Renderer } from './graphics/renderer'

import { canvas, gl } from './gl'

const vertices = [
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,
    0.0, 0.5, 0.0,
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
    renderer: Renderer

    constructor() {
        //Resize
        this.onResize();
        window.onresize = () => this.onResize();

        //Model
        var verticesBuffer = new Float32Array(vertices.length)
        verticesBuffer.set(vertices)
        this.simpleModel = new SimpleModel(verticesBuffer)

        //Shader
        this.simpleShader = new SimpleShader(vertexShader, fragmentShader)

        //Renderer
        this.renderer = new Renderer()
        this.renderer.setShader(this.simpleShader)        
    }

    start() {
        gl.clearColor(0.2, 0.2, 0.4, 1.0)
        this.loop()
    }
    
    private loop() {
        gl.clear(gl.COLOR_BUFFER_BIT)

        this.renderer.draw(this.simpleModel)

        requestAnimationFrame(() => this.loop())
    }

    private onResize() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        gl.viewport(0, 0, canvas.width, canvas.height)
        console.log(`Window size: ${canvas.width}, ${canvas.height}`)
    }

}

new Portfolio().start();
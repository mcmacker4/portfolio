import { Model } from './model/model'
import { Entity } from './model/entity'
import { DefaultShader } from './graphics/shader'
import { Renderer } from './graphics/renderer'
import { Camera } from './view/camera'
import * as ObjParser from './model/objparser'

import { vec3 } from 'gl-matrix'

import { canvas, gl } from './gl'

class Portfolio {

    simpleModel: Model
    simpleEntity: Entity
    simpleShader: DefaultShader
    camera: Camera
    renderer: Renderer

    constructor() {

        //Configure WebGL
        gl.enable(gl.DEPTH_TEST)

        //Camera
        this.camera = new Camera()

        //Model
        //this.simpleModel = new Model(vertices, colors)
        this.simpleModel = ObjParser.loadModel('capsule')
        this.simpleEntity = new Entity(this.simpleModel, vec3.fromValues(0, 0, -3))

        //Shader
        this.simpleShader = new DefaultShader(vertexShader, fragmentShader)

        //Renderer
        this.renderer = new Renderer()
        this.renderer.setShader(this.simpleShader)

        //Resize
        this.onResize();
        window.onresize = () => this.onResize();
        console.log(`Window size: ${canvas.width}, ${canvas.height}`)
    }

    start() {
        gl.clearColor(0.2, 0.2, 0.4, 1.0)
        this.loop()
    }
    
    private loop() {
        gl.clear(gl.COLOR_BUFFER_BIT)

        this.simpleEntity.rotate(vec3.fromValues(0.01, 0, 0))
        this.renderer.draw(this.camera, this.simpleEntity)

        requestAnimationFrame(() => this.loop())
    }

    private onResize() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        gl.viewport(0, 0, canvas.width, canvas.height)
        this.camera.updateProjection()
    }

}

const vertices: Array<number> = [
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,

    0.5, -0.5, 0.5,
    0.5, -0.5, -0.5,
    0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,
    
    0.5, -0.5, -0.5,
    -0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,
    -0.5, 0.5, -0.5,
    
    -0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,
    -0.5, 0.5, -0.5,
    -0.5, 0.5, -0.5,
    -0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,

    -0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, -0.5,
    -0.5, 0.5, -0.5,
    0.5, 0.5, 0.5,
    0.5, 0.5, -0.5,

    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,
    -0.5, -0.5, 0.5,
    0.5, -0.5, -0.5,
    0.5, -0.5, 0.5
]

const colors: Array<number> = [
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,

    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,

    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,

    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,

    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,

    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
]

const vertexShader = `\
attribute vec3 position;\
attribute vec3 normal;\
\
varying vec3 _normal;\
\
uniform mat4 projectionMatrix;\
uniform mat4 viewMatrix;\
uniform mat4 modelMatrix;\
\
void main(void) {\
    gl_Position = projectionMatrix * modelMatrix * vec4(position, 1.0);\
    _normal = normalize((modelMatrix * vec4(normal, 1.0)).xyz);\
}\
`

const fragmentShader = `\
precision mediump float;\
\
varying vec3 _normal;\
\
uniform vec3 sunDir;\
\
void main(void) {\
    float angle = max(0.0, dot(_normal, -normalize(sunDir)));
    gl_FragColor = vec4(angle, angle, angle, 1.0);\
}\
`

new Portfolio().start();
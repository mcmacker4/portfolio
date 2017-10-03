import { vec3, mat4 } from 'gl-matrix'
import { Model } from './model'

export class Entity {

    readonly model: Model

    position: vec3
    rotation: vec3
    scale: vec3

    matrix: mat4

    constructor(model: Model, position?: vec3, rotation?: vec3, scale?: vec3) {
        this.model = model
        this.position = position || vec3.create()
        this.rotation = rotation || vec3.create()
        this.scale = scale || vec3.fromValues(1, 1, 1)

        this.matrix = mat4.create()
    }

    move(delta: vec3) {
        vec3.add(this.position, this.position, delta)
    }

    rotate(delta: vec3) {
        vec3.add(this.rotation, this.rotation, delta)
    }

    get modelMatrix() : mat4 {
        mat4.identity(this.matrix)
        mat4.translate(this.matrix, this.matrix, this.position)
        mat4.rotate(this.matrix, this.matrix, this.rotation[0], [1, 0, 0])
        mat4.rotate(this.matrix, this.matrix, this.rotation[1], [0, 1, 0])
        mat4.rotate(this.matrix, this.matrix, this.rotation[2], [0, 0, 1])
        mat4.scale(this.matrix, this.matrix, this.scale)
        return this.matrix
    }

}
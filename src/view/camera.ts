import { vec3, mat4 } from 'gl-matrix'
import { canvas } from '../gl'

export class Camera {

    position = vec3.create()
    rotation = vec3.create()
    projection = mat4.create()

    constructor() {
        mat4.perspective(this.projection, 90.0, canvas.width / canvas.height, 0.01, 1000)
    }

    updateProjection() {
        mat4.perspective(this.projection, 90.0, canvas.width / canvas.height, 0.01, 1000)
    }

}
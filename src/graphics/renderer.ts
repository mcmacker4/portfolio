import { DefaultShader } from '../graphics/shader'
import { Model } from '../model/model'
import { Camera } from '../view/camera'
import { Entity } from '../model/entity'

import { vec3 } from 'gl-matrix'

import { gl } from '../gl'

export class Renderer {

    shader: DefaultShader

    setShader(shader: DefaultShader) {
        this.shader = shader
    }

    draw(camera: Camera, entity: Entity) {

        let model = entity.model

        //Bind shader
        this.shader.start()

        //Load matrices
        this.shader.loadProjectionMatrix(camera.projection)
        this.shader.loadModelMatrix(entity.modelMatrix)
        this.shader.loadSunDirection(vec3.fromValues(0, -1, 1))

        //Bind vertices buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, model.verticesVBO)
        gl.vertexAttribPointer(this.shader.positionAttr, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(this.shader.positionAttr)

        //Bind normals buffer
        if(this.shader.normalAttr >= 0) {
            gl.bindBuffer(gl.ARRAY_BUFFER, model.normalsVBO)
            gl.vertexAttribPointer(this.shader.normalAttr, 3, gl.FLOAT, false, 0, 0)
            gl.enableVertexAttribArray(this.shader.normalAttr)
        }

        //Draw
        gl.drawArrays(gl.TRIANGLES, 0, model.vertexCount)

        //Disable arrays and unbind buffer
        gl.disableVertexAttribArray(this.shader.positionAttr)
        if(this.shader.normalAttr >= 0) gl.disableVertexAttribArray(this.shader.normalAttr)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
    }

}
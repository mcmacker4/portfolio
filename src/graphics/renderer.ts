import { SimpleShader } from '../graphics/shader'
import { SimpleModel } from '../model/model'

import { gl } from '../gl'

export class Renderer {

    shader: SimpleShader

    setShader(shader: SimpleShader) {
        this.shader = shader
    }

    draw(model: SimpleModel) {
        //Bind shader
        this.shader.start()

        gl.bindBuffer(gl.ARRAY_BUFFER, model.verticesVBO)
        gl.vertexAttribPointer(this.shader.positionAttr, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(this.shader.positionAttr)

        // gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer)
        // gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0)

        gl.drawArrays(gl.TRIANGLES, 0, model.vertexCount)
    }

}
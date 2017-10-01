import { ShaderProgram } from '../graphics/shader'

class Renderer {

    shader: ShaderProgram

    setShader(shader: ShaderProgram) {
        this.shader = shader;
    }

}
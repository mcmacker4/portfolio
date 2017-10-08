import { Model } from './model'
import { vec3 } from 'gl-matrix'

export function loadModel(name: string) : Model {

    const element = document.getElementById(name)
    if(!element) throw new Error("Could not find model: " + name)
    const objString = element.textContent

    const vertices: Array<vec3> = []

    const normals: Array<vec3> = []
    const ordVertices: Array<vec3> = []

    const ordNormals: Array<vec3> = []
    objString.split(/\r?\n/).forEach(line => {

        const parts = line.split(/\s+/)
        if(parts[0] === 'v') {
            vertices.push(vec3.fromValues(
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
            ))
        } else if(parts[0] === 'vn') {
            normals.push(vec3.fromValues(
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
            ))
        } else if(parts[0] === 'f') {
            for(let i = 1; i < 4; i++) {
                let indices = parts[i].split('/')
                ordVertices.push(vertices[parseInt(indices[0])])
                ordNormals.push(normals[parseInt(indices[2])])
            }
        }
    })
    const verticesBuffer = new Float32Array(ordVertices.length * 3)

    const normalsBuffer = new Float32Array(ordNormals.length * 3)

    let i;
    for(i = 0; i < ordVertices.length; i++) {
        const vertex = ordVertices[i];
        if(vertex) {
            verticesBuffer[i * 3] = vertex[0]
            verticesBuffer[i * 3 + 1] = vertex[1]
            verticesBuffer[i * 3 + 2] = vertex[2]
        }
    }

    for(i = 0; i < ordNormals.length; i++) {
        const normal = ordNormals[i];
        if(normal) {
            normalsBuffer[i * 3] = normal[0]
            normalsBuffer[i * 3 + 1] = normal[1]
            normalsBuffer[i * 3 + 2] = normal[2]
        }
    }

    return new Model(verticesBuffer, normalsBuffer)

}
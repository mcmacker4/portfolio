import { Model } from "./model"
import request from '../util/request'

export function create(path: string) : Promise<Model> {
    return new Promise((resolve, reject) => {
        request(path).then((data) => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(data, 'application/xml')
            console.log(doc.rootElement)
        }).catch(reject)
    })
}
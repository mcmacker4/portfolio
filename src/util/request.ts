import * as http from 'http'

export default function request(path: string) : Promise<string> {
    return new Promise((resolve, reject) => {
        http.get(path, res => {
            if(res.statusCode !== 200) {
                reject(new Error(`Server responded with status code ${res.statusCode}`))
            } else {
                let data = ""
                res.on('error', err => reject(err))
                res.on('data', chunk => data += chunk.toString())
                res.on('end', () => {
                    resolve(data)
                })
            }
        })
    })
}
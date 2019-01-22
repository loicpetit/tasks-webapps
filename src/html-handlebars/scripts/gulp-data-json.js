const fs = require('fs')
const path = require('path')

class Context {
    constructor(userOptions){
        if(!userOptions){
            userOptions = {}
        }
        this.debug = userOptions.debug || false
        this.src = userOptions.src || null
        this.relativeFrom = userOptions.relativeFrom || null
        this.encoding = userOptions.encoding || 'utf-8'
    }

    log(message){
        if(this.debug){
            console.log('gulp-data-json |', message)
        }
    }

    computePath(filePath){
        //  TODO : implement src option
        //  TODO : implement relativeFrom option
        const dir = path.dirname(filePath)
        const ext = path.extname(filePath)
        const name = path.basename(filePath, ext)
        this.log(`dir | ${dir}`)
        this.log(`name | ${name}`)
        this.log(`ext | ${ext}`)
        const filename = `${name}.json`
        const jsonPath = path.join(dir, filename)
        return jsonPath
    }

    getFile(path){
        return new Promise(function(resolve, reject){
            if(fs.existsSync(path)){
                fs.readFile(path, this.encoding, function(err, content){
                    if(!err){
                        resolve(content)
                    }
                    else {
                        reject(err)
                    }
                })
            }
            else {
                reject(`File ${path} not found`)
            }
        }.bind(this))
    }
}

function jsonFactory(userOptions){
    const ctx = new Context(userOptions)
    ctx.log(`src | ${ctx.src}`)
    ctx.log(`relativeFrom | ${ctx.relativeFrom}`)
    return function(file){
        return new Promise(function(resolve, reject){
            if(file){
                const jsonPath = ctx.computePath(file.path)
                ctx.log(`jsonPath | ${jsonPath}`)
                ctx.getFile(jsonPath).then(function(content){
                    var json = JSON.parse(content)
                    ctx.log(JSON.stringify(json, null, 2))
                    resolve(json)
                }).catch(function(err){
                    ctx.log(err)
                    // file not mandatory, so complete with empty data
                    resolve({})
                })
            }
            else{
                const err = 'no file'
                ctx.log(err)
                reject(err)
            }
        })
    }
}

module.exports = jsonFactory

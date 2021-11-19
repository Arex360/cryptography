const fs = require('fs')
const {exec,spawn} = require('child_process')
const editJson = require('edit-json-file')
const createFile = ({filename,data})=>{
        fs.writeFile(`${filename}.json`,`
    {
         
    }
    `,()=>{
        let file = editJson(`${__dirname}/${filename}.json`)
        file.set(data.path,data.value)
        file.save()
        exec(`python upload.py --path ${filename}.json`,()=>{
            console.log(`created hash: ${filename}`)
            exec(`del ${filename}.json`,()=>{
                getFile({
                    filename: filename
                })
            })
           
        })
        
        
    })
}
const getFile = ({filename})=>{
    filename = filename+'.json'
    console.log(filename)
    exec(`python download.py --path ${filename}`,()=>{
        let file = require(`./${filename}`)
        console.log(file)
        exec(`del ${filename}`)
    })
}
module.exports = {
    create: createFile
}
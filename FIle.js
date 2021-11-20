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
                //getFile({
                //    filename: filename
               // })
            })
           
        })
        
        
    })
}
const getFile = ({filelist,response})=>{
    out = {}
    let length = filelist.length
    console.log(`total lenght = ${length}`)
    for(let i = 0; i < length;i++){
        filelist[i] = filelist[i]+'.json' 
    }
    let i = 0
    let getData = ()=>{
        exec(`python download.py --path ${filelist[i]}`,()=>{
            console.log(i)
            let file = require(`./${filelist[i]}`)
            exec(`del ${filelist[i]}`,()=>{
                console.log(length)
                i = i + 1
                if(i == length){
                    console.log('done')
                   for(var key in file){
                       out[key] = file[key]
                   } 
                   console.log(out)
                   response.send(out)
                }else if(i > length){
                   return
                }
                else{
                   for(var key in file){
                       out[key] = file[key]
                   } 
                   getData()
                }
            })
        })
    }
    getData()
}
module.exports = {
    create: createFile,
    get: getFile
}
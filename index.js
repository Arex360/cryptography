const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {PushData,SetData,ChainData} = require('./Database.js')
const {Info} = require('./Info.js')
const crypto = require('crypto')
const {create} = require('./FIle.js')
const editJson = require('edit-json-file')
let file = editJson(`${__dirname}/key.json`)
let superFile = editJson(`${__dirname}/superkey.json`)

const app = express()
app.use(bodyParser())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('server is working')
})
app.post('/register',(req,res)=>{
    const regNo = req.body.reg
    const password = req.body.pass
    const name = req.body.name
    const cnic = req.body.cnic
    const address = req.body.address
    let eRegNo = crypto.createHash('md5').update(regNo).digest("hex")
    let ePassword = crypto.createHash('md5').update(password).digest("hex")
    let eCNIC = crypto.createHash('md5').update(cnic).digest("hex")
    file.set(eRegNo,{
        regNo: regNo,
        password: ePassword,
        name: name,
        cnic: eCNIC,
        address: address
    })
    create({
        filename: eRegNo,
        data: {
            path: eRegNo,
            value: {
                regNo: regNo,
                password: ePassword,
                name: name,
                cnic: eCNIC,
                address: address
            }
        }
    })
    superFile.set(eCNIC,{
        cnic: cnic
    })
    file.save()
    superFile.save()
    SetData({
        key:'members/'+ eRegNo+'/password',
        value: ePassword
    })
    ChainData(eRegNo)
    res.send('user registerd')
})
app.listen(5000,()=>{
   Info('Hostel Security')
})
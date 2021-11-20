const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;
const port = 5000;
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {PushData,SetData,ChainData} = require('./Database.js')
const {Info} = require('./Info.js')
const crypto = require('crypto')
const {create,get} = require('./appFile')
const editJson = require('edit-json-file')
let file = editJson(`${__dirname}/key.json`)
let superFile = editJson(`${__dirname}/superkey.json`)

if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      cluster.fork();
    });
  
  } else {
    const app = express()
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(cors())
    app.get('/',(req,res)=>{
        res.send('server is working')
    })
    app.post('/getData',(req,res)=>{
        let filename = req.body.filename
         get({
             filelist: filename,
             response: res
         })
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
  
    app.listen(port, () => {
        console.log('server started')
    })
  
  }
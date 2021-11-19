const {initializeApp} = require('firebase/app')
const {getDatabase,ref,set,push,onValue} = require('firebase/database')
const crypto = require('crypto')
const firebaseConfig = {
    apiKey: "AIzaSyCUokJ3Qf9sygAfX-8kL8eM7eRuEiYtfjo",
    authDomain: "hostel-9583b.firebaseapp.com",
    databaseURL: "https://hostel-9583b-default-rtdb.firebaseio.com",
    projectId: "hostel-9583b",
    storageBucket: "hostel-9583b.appspot.com",
    messagingSenderId: "962980713241",
    appId: "1:962980713241:web:9330473b856b0b11e92b88",
    measurementId: "G-VZR0ET3GQ8"
};
let fApp = initializeApp(firebaseConfig)
let Database = getDatabase(fApp)
//set(ref(Database, 'users/' + 'owais'), {
//        fump: "ss"
//});
let SetData = ({key,value}) =>{
    set(ref(Database, key), value);
}
let PushData = ({key,value})=>{
    push(ref(Database, key), value);
    console.log('data inserted')
}
let ChainData = (actor)=>{
    let RandomBytes = crypto.randomBytes(10).toString()
    const hash = crypto.createHash('md5').update(Date.UTC.toString+RandomBytes).digest('hex')
        const date = new Date()
        SetData({
            key: 'updates/'+hash.toString(),
            value: {
                actor: actor,
                timeStamp: date.toTimeString()
            }
        })
}
module.exports = {
    SetData: SetData,
    PushData: PushData,
    ChainData: ChainData
}
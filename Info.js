const figlet = require('figlet');
const Info = (text)=>{
    figlet(text, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log('\x1b[36m%s\x1b[0m',data)
        console.log('\x1b[36m%s\x1b[0m',"===== Group members =====")
        const table = [
            {
            Member: "Muhammad Owais",
            regNo: "2018-uam-1274"
           },
           {
            Member: "Farheen Tahir",
            regNo: "2018-uam-1281"
           },
           {
            Member: "Saba Ijaz",
            regNo: "2018-uam-1294"
           },
           {
            Member: "Saima Batool",
            regNo: "2018-uam-1273"
           },
    ]
    console.table(table)
    });
}
module.exports = {
    Info: Info
}
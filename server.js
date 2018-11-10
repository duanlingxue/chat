
const http = require("http");

const fs = require("fs");


const port = 9000;

const server = http.createServer((req,res)=>{

    res.writeHead(200,{"Content-Type":"text/html;charset=utf8"})
    let content = fs.readFileSync("./index.html")
    res.end(content);

}).listen(9000,"172.20.248.88",()=>{
    console.log("已上线...")
})
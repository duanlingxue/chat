
const WsServer = require("ws").Server;

let wss = new WsServer({
    port : 3000,
    host : '172.20.248.88'
})

//存储用户

let clientMap = {};

let count = 0

//当客户端连接时触发

wss.on('connection',(client,req)=>{
    console.log('有人来了---->',req.connection.remoteAddress)
    client.name = ++count
    clientMap[client.name] = client
    client.on("message",(message)=>{
        let messageInfo = JSON.parse(message);
        client.nickname = messageInfo.nickname;
        let type = messageInfo.word=="234"?1:0;
        broadcast(messageInfo.word,client,type);
    })
    client.on("error",(message)=>{
        broadcast(err);
    })
    client.on("close",(message)=>{
        console.log(client.name+'说：已下线')
        delete clientMap[client.name]
        broadcast("",client,2);
    })
})

//广播函数  ， 
let broadcast = (message,client,type)=>{
    let messageInfo = {
        user : client.nickname,
        message,
        isMe : false,
        type
    }
    for(let clientName in clientMap){
        messageInfo.isMe = (clientName==client.name);
        clientMap[clientName].send(JSON.stringify(messageInfo))
    }
}

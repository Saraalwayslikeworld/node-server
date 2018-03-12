var http = require('http')
var path = require('path')
var url = require('url')     //解析url的模块
// var fs = require('')

console.log(path.join(__dirname,'node-server'))
var server = http.createServer(function(req,res){
    serverRoot(path.join(__dirname,'node-server'),req,res)
})
function serverRoot(staticPath,req,res){
    
}
server.listen(8080)
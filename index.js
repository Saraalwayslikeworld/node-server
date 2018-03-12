var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

var server = http.createServer(function(req,res){
    console.log('服务器成功')
    staticRoot(path.join(__dirname,'sample'),req,res)
})
server.listen(8080)
function staticRoot(staticPath,req,res){
    var pathObj = url.parse(req.url,true)
    if(pathObj.pathname === '/'){
        pathObj.pathname += 'test.html'
    }
    var filePath = path.join(staticPath , pathObj.pathname)
    console.log(filePath)
    fs.readFile(filePath,'binary',function(err,fileContent){
        if(err){ 
            console.log('404');
            res.writeHead(404,'not found') 
            res.end('<h1>404notfound</h1>')
           }else{ 
            console.log('200')
            res.writeHead(200,'ok')
            res.write(fileContent, 'binary') 
            res.end()
           } 
    })
}

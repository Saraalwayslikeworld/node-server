# node 服务器
-------------------------------
支持静态目录
```
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
```
对不同的路由设置对应的处理函数
```
var routes = {
    "/getsrc":function(req,res){
        res.end(JSON.stringify({"src":"http://123.com/1.mp3"}))
    },
    "/getpics":function(req,res){
        console.log('pic is not loaded')
    },
    "/getmusic":function(req,res){
        res.end('name='+req.body.name)
    }
} 
```
通过函数获取并处理post请求
```
function pathRoute(req,res){
    var pathObj = url.parse(req.url,true)
    var handle = routes[pathObj.pathname]
    if(handle){
        console.log(req.query)
        req.query = pathObj.query
        //解析post信息
        var body=''
        req.on('data',function(chunk){
            body += chunk
        })
        req.on('end',function(){
            req.body = parseBody(body)
            handle(req,res) 
        })
    }else{
        staticRoot(path.join(__dirname,'sample'),req,res)
    }
}
```


var xhr = new XMLHttpRequest()
xhr.open('POST','/getmusic',true)
xhr.onload = function(req,res){
    if((xhr.status>=200 && xhr.status<300) ||xhr.status===304){
        console.log(xhr.responseText)
    }
}
xhr.onerror = function(){
    console.log('服务器异常')
}
xhr.send('name=hello')
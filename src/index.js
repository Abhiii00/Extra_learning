const http = require('http')

let server = http.createServer(function(req,res){
    res.write("hey")
    res.end()
})

server.listen(3000, function(){
    console.log("server running on port 3000")
})
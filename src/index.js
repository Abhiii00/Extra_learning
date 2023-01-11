const express = require('express')
const route = require('./routes/route.js')
const app = express()


app.use('/',route)

app.listen(3000,function(){
    console.log('Express app running on port 3000')
})
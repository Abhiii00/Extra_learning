
const express = require('express')
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://abhay:abhayabhay@cluster0.6itwk6b.mongodb.net/Auto_Increment_Id?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

let schSchema = new mongoose.Schema({
    id: Number,
    name: String

})

let schModel = mongoose.model('Id_Inc',schSchema)

let counterSchema = new mongoose.Schema({
    id: String,
    seq: Number
})

let counterModel = mongoose.model('counter',counterSchema)

app.post('/',function(req, res){
    counterModel.findOneAndUpdate(
        {id: 'autoval'},
        {'$inc':{'seq':1}},
        {new: true},(err,cd)=>{
            let seqId;
            if(cd == null){
                let newVal = counterModel({id:'autoval',seq:1})
                newVal.save()
                seqId = 1
            }else{
                seqId = cd.seq
            }
            let data = req.body
            data.id = seqId
            let createData = schModel.create(data)
            res.send(createData)
        }
    )
})



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
})


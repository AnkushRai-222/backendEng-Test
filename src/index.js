const express = require("express")
const mongoose = require("mongoose")
const route = require("./routes/route")
const app = express()

app.use(express.json())

app.use("/", route)


mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://ankushrai222:Ankushrai222@newproject.tknxizt.mongodb.net/assingment?retryWrites=true&w=majority",{
    useNewUrlParser:true
}).then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err))

app.listen(3000, ()=>{
    console.log("Server runnig on port",3000)
})

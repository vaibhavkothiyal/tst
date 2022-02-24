const mongoose=require('mongoose')
module.exports= ()=>{
    try{
        mongoose.connect(process.env.DATABASE)
    }catch(e){
        console.log("connection refused")
    }
}
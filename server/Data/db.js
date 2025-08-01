const mongoose = require("mongoose")
const dotenv= require("dotenv")

dotenv.config()

const connectDb= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DataBase connected")
    }catch(err){
        console.log(err,"DataBase did not connect")
    }
    
}

module.exports=connectDb
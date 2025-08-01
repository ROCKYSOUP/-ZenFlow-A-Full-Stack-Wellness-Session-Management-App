const mongoose=require("mongoose")

const sessionSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    json_file_url:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Draft","Published"],
        default:"Draft"
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
})

const Session=mongoose.model("Session",sessionSchema)

module.exports=Session
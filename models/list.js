const mongoose=require("mongoose")



const listSchema=new mongoose.Schema({
    createdby:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"user obb"],
        unique:[true,"cant make 2 lists for 1 user"]
    },
    list:[{
        title:{
            type:String,
            required:[true,"please enter a name for"]
        },
        content:{
            type:String,
        }
    }]
})

module.exports=mongoose.model("List",listSchema)

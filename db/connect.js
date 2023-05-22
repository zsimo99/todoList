const mongoose=require("mongoose")

const connectDb=(dbURI)=>{
    return mongoose.connect(dbURI)
}
module.exports=connectDb
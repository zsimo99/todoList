const mongoose=require("mongoose")

const connectDb=async(dbURI)=>{
     try {
        await mongoose.connect(dbURI)
     } catch (error) {
        console.log("mongodb connection error :"+error)
        process.exit(0)
     }
}
module.exports=connectDb
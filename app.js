require("express-async-errors")
const express=require("express")
const connectDb=require("./db/connect")
const cookieParser=require("cookie-parser")
const dotenv=require("dotenv")
dotenv.config()


const authRoute=require("./routes/authRoutes")
const listRoute=require("./routes/listRoutes")


const errorHandlerMiddleware=require("./middlewares/errorHandler")
const {requireAuth,checkUser}=require("./middlewares/authMiddleware")

const dbURI = process.env.DATA_URI ;
console.log(dbURI)
const port =process.env.PORT || 3000


const app=express()

app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())


app.set("view engine","ejs")

const start=async()=>{
    await connectDb(dbURI)
    app.listen(port,()=>{console.log("server is rnning in port : "+port)})
}
start()
app.get("*",checkUser)
app.get("/",(req,res)=>{
    res.render("home")
})
app.use(authRoute)
app.use("/mylist",requireAuth,listRoute)

app.use(errorHandlerMiddleware)

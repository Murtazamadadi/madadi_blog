import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
// ============================== routes
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"
import cookieParser from "cookie-parser"
import path from "path"


dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("mogoDB is connected")
}).catch((err)=>{
    console.log(err)
})
const PORT=process.env.PORT || 8080;
const app=express()
const __dirname=path.resolve()

app.use(express.json())
app.use(cookieParser())



app.listen(3000,()=>{
    console.log("server is running on port 3000!")
})


app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/comment",commentRouter)


app.use(express.static(path.join(__dirname, '/client/dist')));


app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });


// =========================================Middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "internal error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})
const app=require("./app");
const dotenv =require("dotenv")
const connectDataBase =require("./config/database");
const cloudinary=require("cloudinary");

// Handling uncaught Error
process.on("uncaughtException",(err)=>{
  console.log(err.message);
  console.log("Shtting Down the Server due to Uncaught Exception")
    process.exit(1)
  })
dotenv.config({path:'backend/config/config.env'})
connectDataBase();
cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET_KEY

})
port=process.env.PORT

 const server=app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


//  Handling unhandled Promise rejection
process.on("unhandledRejection",(err)=>{
console.log("ok"+err.message);
console.log("Shtting Down the Server")
server.close(()=>{
  process.exit(1)
})
})
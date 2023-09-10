const app=require("./app");
const dotenv =require("dotenv")
const connectDataBase =require("./config/database")

// Handling uncaught Error
process.on("uncaughtException",(err)=>{
  console.log(err.message);
  console.log("Shtting Down the Server due to Uncaught Exception")
    process.exit(1)
  })

dotenv.config({path:'backend/config/config.env'})
connectDataBase();
port=process.env.PORT
 const server=app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

//  Handling unhandled Promise rejection
process.on("unhandledRejection",(err)=>{
console.log(err.message);
console.log("Shutting Down the Server")
server.close(()=>{
  process.exit(1)
})
})
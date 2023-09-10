const mongoose = require('mongoose');
const dotenv =require("dotenv")
dotenv.config({path:'backend/config/config.env'})


const connectDataBase=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data)=>(
        console.log(`Database Connected Successfully with server:${data.connection.host}`)
      ))
}
module.exports=connectDataBase;
const app=require("./app");
const dotenv =require("dotenv")
const connectDataBase =require("./config/database")
dotenv.config({path:'backend/config/config.env'})
connectDataBase();
port=process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
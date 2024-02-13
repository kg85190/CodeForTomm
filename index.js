const express = require("express");
const { userroutes } = require("./Routes/userroutes");
  require("./connection/Dbconnection")
const app = express();


app.use(express.json())

app.use('/',userroutes)


app.listen(7000,()=>{
    console.log("server is running at 7000")
})
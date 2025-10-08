const express = require('express');
const {adminAuth} = require('./middlewares/auth');

const app = express();

app.use("/admin",adminAuth);

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data for admin view");
})

app.get("/user",(req,res)=>{
    res.send("user data");
})

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});
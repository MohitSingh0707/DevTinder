const express = require('express');

const app = express();

app.get("/user/:userId/:name/:password",(req,res) => {
    console.log(req.params)
    res.send({firstName: "Mohit",lastname: "Singh"});
});

app.get("/test",(req,res) => {
    res.send("Testing is done and dusted!");
})

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});
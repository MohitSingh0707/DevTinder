const express = require('express');

const app = express();

app.get("/user",(req,res) => {
    res.send({firstName: "Mohit",lastname: "Singh"});
});

app.post("/user",(req,res) => {
    res.send("Data posted sucessfully"); 
});

app.delete("/user",(req,res) => {
    res.send("Data deleted sucessfully"); 
});

app.get("/hello",(req,res) => {
    res.send("Hello Hello!");
});

app.get("/test",(req,res) => {
    res.send("Testing is done and dusted!");
})

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});
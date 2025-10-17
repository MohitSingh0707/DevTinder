const express = require("express");
const connectDB = require("./config/database");
const { default: mongoose } = require("mongoose");
const User = require("./models/user");

const app = express();
app.use(express.json());

// API endpoint for user registration

app.post("/signup",async (req,res) => {
  try {
    // step-1 ==> Get the input fields from the request body
    const {firstName,lastName,emailId,password,age,gender} = req.body;

    // step-2 ==> Validate the input fields
    if(!firstName || !emailId || !password || !age || !gender){
      return res.status(400).json({message : "All fields are required"});
    }

    // step-3 ==> Check if the user already exists
    const existingUser = await User.findOne({emailId});
    if(existingUser){
      return res.status(400).json({message : " User Already Exists"});
    }

    // step-4 ==> Create a new user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password,
      age,
    })

    // step-5 ==> Save the user to the database
    await user.save();
    // step-6 ==> Return a success response
    return res.status(201).json({message : "User registered successfully"});
  } catch (error) {
    console.error("Error during user registration",error);
    return res.status(500).json({message : "Internal Server Error"});
  }
})

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });

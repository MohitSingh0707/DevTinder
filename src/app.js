const express = require("express");
const connectDB = require("./config/database");
const { default: mongoose } = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();
app.use(express.json());
app.use(cookieparser());

// API endpoint for user registration

// Signup Route --> POST
app.post("/signup", async (req, res) => {
  try {
    // step-1 ==> Get the input fields from the request body
    const { firstName, lastName, emailId, password, age, gender } = req.body;

    // step-2 ==> Validate the input fields
    if (!firstName || !emailId || !password || !age || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // step-3 ==> Check if the user already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: " User Already Exists" });
    }

    // step-3.1 ==> Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // step-4 ==> Create a new user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
    });

    // step-5 ==> Save the user to the database
    await user.save();
    // step-6 ==> Return a success response
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration", error);
    return res.status(500).json({ message: "Error while creating user" });
  }
});

// Login Route  --> POST
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // step-1 ==> Validate the input fields
    if (!emailId || !password) {
      return res.status(400).json({ message: "All fieds are required" });
    }

    // step-2 ==> check if user exists
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // step-3 ==> Compare the password and use jwt token here for the user session
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // step-4 ==> if password is valid create a jwt token
    const token = await user.getJWT();

    // step-5 ==> if jwt created store it in cookies and send response to the user
    res.cookie(
      "token",
      token,
      { httpOnly: true },
      { expires: new Date(Date.now() + 8 * 3600000) }
    );

    //step-6 ==> return success response
    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Error during user login", error);
    return res.status(500).json({ message: "There is Problem in login" });
  }
});

//Profile Route - GET
app.get("/profile", userAuth, async (req, res) => {
  try {
    // step-5 ==> fetch the user profile from the database
    const user = req.user;
    res.send("Profile Route is working" + user);
  } catch (error) {
    console.error("Error fetching profile", error);
    return res.status(500).json({ message: "Erroe in getting profile" });
  }
});

// SendingConnectionRequest Route - POST
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " Sent Connection Request");
  } catch (error) {
    console.error("Error in sending connection request", error);
    return res
      .status(500)
      .json({ message: "Error in sending connection request" });
  }
});
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

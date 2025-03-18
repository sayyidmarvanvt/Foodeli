import userModal from "../models/userModal.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import validator from "validator";

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user
export const registerUser = async (req, res) => {
  console.log(req.body);
  
  const { name, password, email } = req.body;
  try {
    //checking is user already exists
    const exists = await userModal.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    //validating email
    if (!validator.isEmail(email)) {
      return (
        res, json({ success: false, message: "Please enter a valid email" })
      );
    }
    //strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    //encrypt password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //new user
    const newUser = await userModal({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export const googleUser = async (req, res) => {
  try {
     const user = await userModal.findOne({ email: req.body.email });
     if (user) {
       const token = createToken(user._id);
       res.json({ success: true, token });
     } else {
       const generatedPassword =
         Math.random().toString(36).slice(-8) +
         Math.random().toString(36).slice(-8);

       const salt = await bcryptjs.genSalt(10);
       const hashedPassword = await bcryptjs.hash(generatedPassword, salt);

       const newUser = await userModal({
         name: name,
         email: email,
         password: hashedPassword,
       });

       const user = await newUser.save();

       const token = createToken(user._id);
       res.json({ success: true, token });
     }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
 
};

import userModal from "../models/userModal.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import validator from "validator";

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Doesn't exist" }); // 404 Not Found
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" }); // 401 Unauthorized
    }
    const token = createToken(user._id);
    res.status(200).json({ success: true, token }); // 200 OK
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" }); // 500 Internal Server Error
  }
};

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
export const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Check if user already exists
    const exists = await userModal.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" }); // 400 Bad Request
    }
    // Validate email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" }); // 400 Bad Request
    }
    // Check for strong password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a strong password" }); // 400 Bad Request
    }
    // Encrypt password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = await userModal({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.status(201).json({ success: true, token }); // 201 Created
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Register Error" }); // 500 Internal Server Error
  }
};

// Google user login/signup
export const googleUser = async (req, res) => {
  try {
    const user = await userModal.findOne({ email: req.body.email });
    if (user) {
      const token = createToken(user._id);
      res.status(200).json({ success: true, token }); // 200 OK
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(generatedPassword, salt);

      const newUser = await userModal({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      const user = await newUser.save();

      const token = createToken(user._id);
      res.status(201).json({ success: true, token }); // 201 Created
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Google login Error" }); // 500 Internal Server Error
  }
};

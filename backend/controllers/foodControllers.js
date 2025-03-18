import cloudinary from "../config/cloudinary.js";
import foodModal from "../models/foodModel.js";
import fs from "fs";

//add food item
export const addFood = async (req, res) => {
  console.log("started");

  // Upload image to Cloudinary
   const result = await cloudinary.uploader.upload(req.file.path, {
     folder: "foods", // Organize images into folders
     public_id: req.file.filename, // Use the file name as the public ID
     transformation: [
       {
         width: 500, // Resize to a maximum width of 500px
         height: 500, // Resize to a maximum height of 500px
         crop: "fill", // Crop the image to fill the specified dimensions
         gravity: "auto", // Automatically detect the most important part of the image
         fetch_format: "auto", // Automatically choose the best format (e.g., webp, jpg)
         quality: "auto", // Automatically adjust the quality for optimal performance
       },
     ],
   });

   // Delete the temporary file
   fs.unlinkSync(req.file.path);

  const food = new foodModal({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: result.secure_url, // Store the Cloudinary URL
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding food" });
  }
};

//all food list
export const listFood = async (req, res) => {
  try {
    const foods = await foodModal.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove food item
export const removeFood = async (req, res) => {
  try {
    const food = await foodModal.findById(req.body.id);

    // Extract the public ID from the Cloudinary URL
    const publicId = food.image.split("/").pop().split(".")[0];

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(`foods/${publicId}`);

    // Delete food from MongoDB
    await foodModal.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.json({ success: false, message: "Error removing food" });
  }
};

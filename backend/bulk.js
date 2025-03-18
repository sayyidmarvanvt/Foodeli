import fs from "fs";
import path from "path";
import cloudinary from "./config/cloudinary.js"; // Import Cloudinary
import foodModal from "./models/foodModel.js";

const uploadDir = "uploads"; // Directory where local images are stored

const bulkUploadImages = async () => {
  try {
    const files = fs.readdirSync(uploadDir);

    for (const file of files) {
      const filePath = path.join(uploadDir, file);

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "foods", // Optional: Organize images into folders
      });

      // Get the public download URL
      const imageURL = result.secure_url;

      // Find the corresponding food item in MongoDB
      const food = await foodModal.findOne({ image: file });

      if (food) {
        // Update the food item with the new image URL
        food.image = imageURL;
        await food.save();
        console.log(`Updated food: ${food.name}`);
      }

      // Optionally, delete the local file after upload
      fs.unlinkSync(filePath);
    }

    console.log("Bulk upload completed!");
  } catch (error) {
    console.error("Error during bulk upload:", error);
  }
};


export default bulkUploadImages;
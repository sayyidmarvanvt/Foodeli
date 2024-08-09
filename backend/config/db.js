import mongoose from "mongoose"

export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://sayyidmarvanvt:AHVQiDfyixeukJzq@cluster0.pwpw7sr.mongodb.net/foodeli').then(()=>console.log("DB Connected"))
}
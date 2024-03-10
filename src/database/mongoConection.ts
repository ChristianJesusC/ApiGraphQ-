import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/stands");
    console.log("Conexión a MongoDB exitosa!");
  } catch (error) {
    console.log("Error al conectar a MongoDB:", error);
  }
};

export default connectDB;

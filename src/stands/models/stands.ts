import mongoose from "mongoose";

const StandSchema = new mongoose.Schema({
    nombre: String,
    tipo: String,
    usuario: String,
    descripcion: String,
  });
  
export const Stand = mongoose.model("Stand", StandSchema);
  
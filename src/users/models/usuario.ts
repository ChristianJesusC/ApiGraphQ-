import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    tipo: String,
    usuario: String,
    descripcion: String,
  });
  
export const Usuario = mongoose.model("Usuario", UsuarioSchema);
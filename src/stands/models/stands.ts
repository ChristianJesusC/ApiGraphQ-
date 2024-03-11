import mongoose from "mongoose";

const StandSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
});

export const Stand = mongoose.model("Stand", StandSchema);

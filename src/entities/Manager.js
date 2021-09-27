import mongoose from 'mongoose';
const { Schema } = mongoose;

const managerSchema = new Schema(
  {
    nome: { type: String },
    email: { type: String },
    gerencia: { type: String },
    cargo: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Manager', managerSchema);

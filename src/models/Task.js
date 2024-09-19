import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Task || mongoose.model("Task", taskSchema);

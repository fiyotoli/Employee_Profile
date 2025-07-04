import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const FeedbackModel = mongoose.model("Feedback", feedbackSchema);
export default FeedbackModel;

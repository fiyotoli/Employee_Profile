import mongoose from "mongoose";

const EmployeeProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  image: { type: Array, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  educationLevel: { 
    type: String, 
    enum: ['High School', 'Diploma', 'Degree', 'Masters', 'PhD'], 
    required: true 
  },
  totalWorkExperience: { type: Number, required: true },
  workExperienceGovernment: { type: Number, required: true },
  workExperienceSelf: { type: Number, required: true },
  additionalSkills: { type: [String], default: [] }, // <=== changed to array
  neededJobType: { type: [String], required: true }, // <=== changed to array
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true }
});

const EmployeeProfile = mongoose.models.product || mongoose.model("product", EmployeeProfileSchema);
export default EmployeeProfile;

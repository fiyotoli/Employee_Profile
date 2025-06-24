import EmployeeProfile from "../models/EmployeeProfile.js";
import { v2 as cloudinary } from "cloudinary";

// Add Employee Controller
const AddEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      educationLevel,
      totalWorkExperience,
      workExperienceGovernment,
      workExperienceSelf,
      additionalSkills,
      neededJobType,
      email,
      phoneNumber,
      isFeatured,  // <-- accept this from req.body
    } = req.body;

    // Parse JSON strings to arrays if needed
    let parsedAdditionalSkills = additionalSkills;
    let parsedNeededJobType = neededJobType;

    try {
      if (typeof additionalSkills === "string") {
        parsedAdditionalSkills = JSON.parse(additionalSkills);
      }
    } catch {
      parsedAdditionalSkills = additionalSkills;
    }

    try {
      if (typeof neededJobType === "string") {
        parsedNeededJobType = JSON.parse(neededJobType);
      }
    } catch {
      parsedNeededJobType = neededJobType;
    }

    const image1 = req.files?.image1?.[0];
    let imagesUrl = [];
    if (image1) {
      const result = await cloudinary.uploader.upload(image1.path, {
        resource_type: "image",
      });
      imagesUrl.push(result.secure_url);
    }

    const EmployeeData = {
      firstName,
      lastName,
      address,
      educationLevel,
      totalWorkExperience: Number(totalWorkExperience),
      workExperienceGovernment: Number(workExperienceGovernment),
      workExperienceSelf: Number(workExperienceSelf),
      additionalSkills: parsedAdditionalSkills,
      neededJobType: parsedNeededJobType,
      email,
      phoneNumber,
      image: imagesUrl,
      isFeatured: isFeatured === 'true' || isFeatured === true || false, // ensure boolean
    };

    const product = new EmployeeProfile(EmployeeData);
    await product.save();

    res.json({ success: true, message: "Employee Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const EditEmployee = async (req, res) => {
  try {
    function normalizeToArray(field) {
      if (!field) return [];
      return Array.isArray(field) ? field : [field];
    }

    const {
      id,
      firstName,
      lastName,
      address,
      educationLevel,
      totalWorkExperience,
      workExperienceGovernment,
      workExperienceSelf,
      email,
      phoneNumber,
      isFeatured,  // <-- accept featured flag here too
    } = req.body;

    const additionalSkills = normalizeToArray(req.body.additionalSkills);
    const neededJobType = normalizeToArray(req.body.neededJobType);

    const image1 = req.files?.image1?.[0];
    let imagesUrl = [];

    if (image1) {
      const result = await cloudinary.uploader.upload(image1.path, {
        resource_type: "image",
      });
      imagesUrl.push(result.secure_url);
    }

    const updatedFields = {
      firstName,
      lastName,
      address,
      educationLevel,
      totalWorkExperience: Number(totalWorkExperience),
      workExperienceGovernment: Number(workExperienceGovernment),
      workExperienceSelf: Number(workExperienceSelf),
      additionalSkills,
      neededJobType,
      email,
      phoneNumber,
      isFeatured: isFeatured === 'true' || isFeatured === true || false,
    };

    if (imagesUrl.length > 0) {
      updatedFields.image = imagesUrl;
    }

    await EmployeeProfile.findByIdAndUpdate(id, updatedFields, { new: true });

    res.json({ success: true, message: "Employee Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List featured employees controller (new)
const ListFeaturedEmployees = async (req, res) => {
  try {
    const featuredEmployees = await EmployeeProfile.find({ isFeatured: true });
    res.json({ success: true, employees: featuredEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all employees controller (assuming you have this)
const ListEmployee = async (req, res) => {
  try {
    const employees = await EmployeeProfile.find({});
    res.json({ success: true, employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove employee controller (assuming you have this)
const RemoveEmployee = async (req, res) => {
  try {
    await EmployeeProfile.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Employee Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Single employee controller (assuming you have this)
const SingleEmployee = async (req, res) => {
  try {
    const { productId } = req.body;
    const employee = await EmployeeProfile.findById(productId);
    res.json({ success: true, employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Employee stats controller (assuming you have this)
const getEmployeeStats = async (req, res) => {
  try {
    const count = await EmployeeProfile.countDocuments();
    const latest = await EmployeeProfile.find().sort({ createdAt: -1 }).limit(5);
    res.json({ success: true, count, latest });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get profile stats" });
  }
};

export {
  ListEmployee,
  AddEmployee,
  RemoveEmployee,
  SingleEmployee,
  EditEmployee,
  getEmployeeStats,
  ListFeaturedEmployees,
};

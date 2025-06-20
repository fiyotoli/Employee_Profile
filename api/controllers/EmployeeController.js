import EmployeeProfile from "../models/EmployeeProfile.js";
import { v2 as cloudinary } from "cloudinary";

// Add Product Controller
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
    // Helper to ensure field is always an array
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
    } = req.body;

    // Normalize the potentially single-or-multi fields to arrays
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

// List Products
const ListEmployee = async (req, res) => {
  try {
    const products = await EmployeeProfile.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Single Product
const SingleEmployee = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await EmployeeProfile.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove Product
const RemoveEmployee = async (req, res) => {
  try {
    await EmployeeProfile.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Employee Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  ListEmployee,
  AddEmployee,
  RemoveEmployee,
  SingleEmployee,
  EditEmployee,
};

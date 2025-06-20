import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";


const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [educationLevel, setEducationLevel] = useState("Degree");
  const [totalWorkExperience, setTotalWorkExperience] = useState("");
  const [workExperienceGovernment, setWorkExperienceGovernment] = useState("");
  const [workExperienceSelf, setWorkExperienceSelf] = useState("");
  const [additionalSkills, setAdditionalSkills] = useState([""]);
  const [neededJobTypeList, setNeededJobTypeList] = useState([""]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSkillChange = (index, value) => {
    const updated = [...additionalSkills];
    updated[index] = value;
    setAdditionalSkills(updated);
  };

  const addSkillField = () => setAdditionalSkills([...additionalSkills, ""]);

  const removeSkillField = (index) => {
    const updated = [...additionalSkills];
    updated.splice(index, 1);
    setAdditionalSkills(updated);
  };

  const handleJobTypeChange = (index, value) => {
    const updated = [...neededJobTypeList];
    updated[index] = value;
    setNeededJobTypeList(updated);
  };

  const addJobTypeField = () => setNeededJobTypeList([...neededJobTypeList, ""]);

  const removeJobTypeField = (index) => {
    const updated = [...neededJobTypeList];
    updated.splice(index, 1);
    setNeededJobTypeList(updated);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image1) {
      toast.error("Image is not selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("address", address);
      formData.append("educationLevel", educationLevel);
      formData.append("totalWorkExperience", totalWorkExperience);
      formData.append("workExperienceGovernment", workExperienceGovernment);
      formData.append("workExperienceSelf", workExperienceSelf);
      formData.append("additionalSkills", JSON.stringify(additionalSkills));
      formData.append("neededJobType", JSON.stringify(neededJobTypeList));
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("image1", image1);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token, "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFirstName("");
        setLastName("");
        setAddress("");
        setEducationLevel("Degree");
        setTotalWorkExperience("");
        setWorkExperienceGovernment("");
        setWorkExperienceSelf("");
        setAdditionalSkills([""]);
        setNeededJobTypeList([""]);
        setEmail("");
        setPhoneNumber("");
        setImage1(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="container px-5 py-2 py-md-4 shadow my-3">
      {/* profile Upload */}
      <div className="mb-4 pt-2">
        <h2 className="mb-4 text-primary d-flex align-items-center gap-2">
  <FaUserPlus className="text-primary" /> Upload Employee Profile
</h2>

        <label
          htmlFor="image1"
          className="border p-2 rounded d-flex align-items-center justify-content-center"
          style={{ width: "150px", height: "150px", cursor: "pointer" }}
        >
          <img
            src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
            alt="upload preview"
            className="img-fluid"
            style={{ maxHeight: "100%" }}
          />
          <input
            type="file"
            id="image1"
            hidden
            accept="image/*"
            onChange={(e) => setImage1(e.target.files[0])}
          />
        </label>
      </div>

      {/* Two Columns */}
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Total Work Experience (years)</label>
            <input type="number" className="form-control" value={totalWorkExperience} onChange={(e) => setTotalWorkExperience(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Self Work Experience (years)</label>
            <input type="number" className="form-control" value={workExperienceSelf} onChange={(e) => setWorkExperienceSelf(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Education Level</label>
            <select className="form-select" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)}>
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Degree">Degree</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Government Work Experience (years)</label>
            <input type="number" className="form-control" value={workExperienceGovernment} onChange={(e) => setWorkExperienceGovernment(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </div>
        </div>
      </div>

      {/* Additional Skills */}
      <div className="mb-3">
        <label className="form-label">Additional Skills</label>
        {additionalSkills.map((skill, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              className="form-control me-2"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder={`Skill ${index + 1}`}
              required
            />
            {index > 0 && (
              <button type="button" className="btn btn-danger" onClick={() => removeSkillField(index)}>−</button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-outline-primary mt-2" onClick={addSkillField}>+ Add More Skill</button>
      </div>

      {/* Needed Job Types */}
      <div className="mb-3">
        <label className="form-label">Needed Job Types</label>
        {neededJobTypeList.map((job, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              className="form-control me-2"
              value={job}
              onChange={(e) => handleJobTypeChange(index, e.target.value)}
              placeholder={`Job Type ${index + 1}`}
              required
            />
            {index > 0 && (
              <button type="button" className="btn btn-danger" onClick={() => removeJobTypeField(index)}>−</button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-outline-primary mt-2" onClick={addJobTypeField}>+ Add Job Type</button>
      </div>

      <button type="submit" className="btn btn-primary">Submit Application</button>
    </form>
  );
};

export default Add;

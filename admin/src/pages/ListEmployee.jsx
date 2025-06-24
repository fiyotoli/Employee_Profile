import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App"; // make sure this exports the URL correctly
import { toast } from "react-toastify";
import { FaUsers } from "react-icons/fa";
import {  FaEdit, FaTrash, } from 'react-icons/fa';

const educationLevels = [
  "", // empty means no filter
  "High School",
  "Diploma",
  "Bachelor",
  "Master",
  "PhD",
];

const ListEmployee = ({ token }) => {
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter and sort states
  const [searchJobType, setSearchJobType] = useState("");
  const [filterEducation, setFilterEducation] = useState("");
  const [sortField, setSortField] = useState(""); // "firstName" or "totalWorkExperience"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${backendUrl}/api/profile/list`);
      const productsRaw = Array.isArray(response.data.employees) ? response.data.employees : [];

      if (response.data.success) {
        const products = productsRaw.map((product) => ({
          ...product,
          additionalSkills:
            typeof product.additionalSkills === "string"
              ? JSON.parse(product.additionalSkills)
              : Array.isArray(product.additionalSkills)
              ? product.additionalSkills
              : [],
          neededJobType:
            typeof product.neededJobType === "string"
              ? JSON.parse(product.neededJobType)
              : Array.isArray(product.neededJobType)
              ? product.neededJobType
              : [],
        }));

        setList(products);
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/profile/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleEdit = (item) => {
    const editItem = { ...item };

    if (
      Array.isArray(editItem.additionalSkills) &&
      editItem.additionalSkills.length === 1 &&
      typeof editItem.additionalSkills[0] === "string"
    ) {
      try {
        editItem.additionalSkills = JSON.parse(editItem.additionalSkills[0]);
      } catch {}
    }

    if (
      Array.isArray(editItem.neededJobType) &&
      editItem.neededJobType.length === 1 &&
      typeof editItem.neededJobType[0] === "string"
    ) {
      try {
        editItem.neededJobType = JSON.parse(editItem.neededJobType[0]);
      } catch {}
    }

    setEditData(editItem);
    setShowModal(true);
    setImage(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.keys(editData).forEach((key) => {
        if (Array.isArray(editData[key])) {
          editData[key].forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, editData[key]);
        }
      });

      formData.append("id", editData._id);
      if (image) formData.append("image1", image);

      const res = await axios.post(`${backendUrl}/api/profile/edit`, formData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Updated successfully");
        setShowModal(false);
        setEditData(null);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Filter by job type
  const filterByJobType = (data) => {
    if (!searchJobType.trim()) return data;
    return data.filter((item) =>
      item.neededJobType.some((job) =>
        job.toLowerCase().includes(searchJobType.toLowerCase())
      )
    );
  };

  // Filter by education level dropdown
  const filterByEducation = (data) => {
    if (!filterEducation) return data;
    return data.filter((item) => item.educationLevel === filterEducation);
  };

  // Sort by firstName (A-Z) or totalWorkExperience (asc/desc)
  const sortData = (data) => {
    if (!sortField) return data;

    const sorted = [...data].sort((a, b) => {
      if (sortField === "firstName") {
        const aName = a.firstName?.toLowerCase() || "";
        const bName = b.firstName?.toLowerCase() || "";
        if (aName < bName) return -1;
        if (aName > bName) return 1;
        return 0;
      } else if (sortField === "totalWorkExperience") {
        const aNum = Number(a.totalWorkExperience) || 0;
        const bNum = Number(b.totalWorkExperience) || 0;
        return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
      }
      return 0;
    });

    return sorted;
  };

  const displayedList = sortData(filterByEducation(filterByJobType(list)));

  return (
    <div className="container mt-3">
      <div className="text-center my-4 pt-4">
        <h2 className="mb-4 text-primary d-flex align-items-center gap-2">
          <FaUsers className="text-primary" /> List of Employee Profile
        </h2>

        {/* Filters and Sorting */}
        <div className="d-flex justify-content-start gap-3 mb-3 flex-wrap">

          {/* Search Job Type */}
          <div>
            <label htmlFor="searchJobType" className="form-label me-2">
              Search Job Type:
            </label>
            <input
              id="searchJobType"
              type="text"
              className="form-control"
              placeholder="e.g. developer"
              value={searchJobType}
              onChange={(e) => setSearchJobType(e.target.value)}
            />
          </div>

          {/* Education Level Dropdown */}
          <div>
            <label htmlFor="filterEducation" className="form-label me-2">
              Filter Education:
            </label>
            <select
              id="filterEducation"
              className="form-select"
              value={filterEducation}
              onChange={(e) => setFilterEducation(e.target.value)}
            >
              {educationLevels.map((level, i) => (
                <option key={i} value={level}>
                  {level === "" ? "-- All Levels --" : level}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Field */}
          <div>
            <label htmlFor="sortField" className="form-label me-2">
              Sort By:
            </label>
            <select
              id="sortField"
              className="form-select"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="firstName">First Name (A-Z)</option>
              <option value="totalWorkExperience">Total Work Experience</option>
            </select>
          </div>

          {/* Sort Order (only enabled if totalWorkExperience selected) */}
          <div>
            <label htmlFor="sortOrder" className="form-label me-2">
              Order:
            </label>
            <select
              id="sortOrder"
              className="form-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              disabled={sortField !== "totalWorkExperience"}
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <p>Loading employee profiles...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="table-responsive">
        <table
          className="table table-bordered table-striped text-nowrap"
          style={{ minWidth: "auto" }}
        >
          <thead className="thead-dark ">
            <tr className="">
              <th>Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Education</th>
              <th>Total Exp</th>
              <th>Govt Exp</th>
              <th>Self Exp</th>
              <th className="text-wrap">Skills</th>
              <th className="text-wrap">Needed Job</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedList.length === 0 ? (
              <tr>
                <td colSpan="13" className="text-center">
                  No employee profiles to display.
                </td>
              </tr>
            ) : (
              displayedList.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.image?.[0]}
                      alt={item.firstName}
                      className="img-fluid rounded"
                      style={{ width: "80px", height: "80px", objectFit: "contain" }}
                    />
                  </td>
                  <td className="text-nowrap text-capitalize">{item.firstName}</td>
                  <td className="text-nowrap text-capitalize">{item.lastName}</td>
                  <td className="text-nowrap text-capitalize">{item.address}</td>
                  <td className="text-nowrap text-capitalize">{item.educationLevel}</td>
                  <td className="text-nowrap">{item.totalWorkExperience} yrs</td>
                  <td className="text-nowrap">{item.workExperienceGovernment} yrs</td>
                  <td className="text-nowrap">{item.workExperienceSelf} yrs</td>
                  <td className="text-wrap text-capitalize">
                    {Array.isArray(item.additionalSkills)
                      ? item.additionalSkills.join(", ")
                      : String(item.additionalSkills)}
                  </td>
                  <td className="text-wrap text-capitalize">
                    {Array.isArray(item.neededJobType)
                      ? item.neededJobType.join(", ")
                      : String(item.neededJobType)}
                  </td>
                  <td className="text-nowrap">{item.email}</td>
                  <td className="text-nowrap">{item.phoneNumber}</td>
                  <td className="text-nowrap">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(item)}
                    >
                    <FaEdit/>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeProduct(item._id)}
                    >
                      <FaTrash/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && editData && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header border-0 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <FaEdit className="text-primary me-2 fs-5" />
                    <h5 className="modal-title mb-0">Edit Profile</h5>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {[
                    "firstName",
                    "lastName",
                    "address",
                    "educationLevel",
                    "totalWorkExperience",
                    "workExperienceGovernment",
                    "workExperienceSelf",
                    "additionalSkills",
                    "neededJobType",
                    "email",
                    "phoneNumber",
                  ].map((field, i) => (
                    <div className="mb-3" key={i}>
                      <input
                        type="text"
                        className="form-control"
                        name={field}
                        placeholder={field.replace(/([A-Z])/g, " $1")}
                        value={
                          Array.isArray(editData[field])
                            ? editData[field].join(", ")
                            : editData[field]
                        }
                        onChange={(e) => {
                          let value = e.target.value;
                          if (["additionalSkills", "neededJobType"].includes(field)) {
                            value = value.split(",").map((v) => v.trim());
                          }
                          setEditData({ ...editData, [field]: value });
                        }}
                      />
                    </div>
                  ))}
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])}
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Save Changes</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEmployee;
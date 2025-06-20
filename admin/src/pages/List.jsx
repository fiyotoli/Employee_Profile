import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaUsers } from "react-icons/fa";


const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
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
    setEditData({ ...item });
    setShowModal(true);
    setImage(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(editData).forEach((key) => {
        if (Array.isArray(editData[key])) {
          formData.append(key, JSON.stringify(editData[key]));
        } else {
          formData.append(key, editData[key]);
        }
      });

      formData.append("id", editData._id);
      if (image) formData.append("image1", image);

      const res = await axios.post(`${backendUrl}/api/product/edit`, formData, {
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

  return (
    <div className="container mt-5">
      <div className="text-center my-4 pt-4">
        <h2 className="mb-4 text-primary d-flex align-items-center gap-2">
  <FaUsers className="text-primary" /> List of Employee Profile
</h2>

      </div>

      <div className="table-responsive ">
        <table className="table table-bordered table-striped " style={{ minWidth: "2000px" }}>
          <thead className="thead-dark ">
            <tr>
              <th>Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Education</th>
              <th>Total Exp</th>
              <th>Govt Exp</th>
              <th>Self Exp</th>
              <th>Skills</th>
              <th>Needed Job</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.image?.[0]}
                    alt={item.firstName}
                    className="img-fluid rounded"
                    style={{ width: "80px", height: "80px",objectFit:'contain' }}
                  />
                </td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>{item.educationLevel}</td>
                <td>{item.totalWorkExperience} yrs</td>
                <td>{item.workExperienceGovernment} yrs</td>
                <td>{item.workExperienceSelf} yrs</td>
                <td>
                  {Array.isArray(item.additionalSkills)
                    ? item.additionalSkills.join(", ")
                    : String(item.additionalSkills)}
                </td>
                <td>
                  {Array.isArray(item.neededJobType)
                    ? item.neededJobType.join(", ")
                    : String(item.neededJobType)}
                </td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeProduct(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModal && editData && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Product</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
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
                      <label className="form-label text-capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                      <input
                        type="text"
                        className="form-control"
                        name={field}
                        value={Array.isArray(editData[field]) ? editData[field].join(", ") : editData[field]}
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
                    <label className="form-label">New Image (optional)</label>
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
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;

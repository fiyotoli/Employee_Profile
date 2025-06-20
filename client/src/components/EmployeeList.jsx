import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import EmployeeCard from './EmployeeCard';
import { FiSearch } from 'react-icons/fi';
import { FiFilter } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';

function EmployeeList() {
  const { products, search, showSearch, setSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  const [educationFilter, setEducationFilter] = useState('');
  const [jobTypeSearch, setJobTypeSearch] = useState('');
  const [expRange, setExpRange] = useState('');

  const applyFilter = () => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter(item =>
        item.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (educationFilter) {
      filtered = filtered.filter(item => item.educationLevel === educationFilter);
    }

    if (jobTypeSearch) {
      filtered = filtered.filter(item =>
        item.neededJobType?.toLowerCase().includes(jobTypeSearch.toLowerCase())
      );
    }

    if (expRange) {
      if (expRange === "0-6") {
        filtered = filtered.filter(item => item.totalWorkExperience >= 0 && item.totalWorkExperience <= 6);
      } else if (expRange === "6-18") {
        filtered = filtered.filter(item => item.totalWorkExperience > 6 && item.totalWorkExperience <= 18);
      } else if (expRange === "18+") {
        filtered = filtered.filter(item => item.totalWorkExperience > 18);
      }
    }

    setFilterProducts(filtered);
    setVisibleCount(6);
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [educationFilter, jobTypeSearch, expRange, search, showSearch]);

  const handleExploreMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="container mb-4 mt-5 pt-5">
      {/* Search bar */}
      <div className="row justify-content-center mt-2 pt-5">
        <div className="col-md-8 col-lg-7 mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control rounded-start-pill ps-4 py-2 shadow-sm bg-white"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => typeof setSearch === 'function' && setSearch(e.target.value)}
            />
            <span className="input-group-text text-white border-start-0 rounded-end-pill bg-primary">
              <FiSearch />
            </span>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        {/* Filters */}
        <div className="col-md-3 shadow-sm py-4">
          <div className="mb-4">
           <h5 className="mb-3 lead d-flex align-items-center gap-2">
  <FiFilter className="text-primary" /> Filter
</h5>

            {/* Education Level */}
            <div className="mb-3">
              <label className="form-label fw-bold">Education Level</label>
              <select
                className="form-select"
                value={educationFilter}
                onChange={(e) => setEducationFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Degree">Degree</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            {/* Work Experience Range */}
            <div className="mb-3">
  <label className="form-label fw-semibold">Work Experience</label>
  <div className="d-flex flex-wrap gap-3">
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="experience"
        value=""
        id="expAll"
        checked={expRange === ''}
        onChange={(e) => setExpRange(e.target.value)}
      />
      <label className="form-check-label" htmlFor="expAll">
        All
      </label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="experience"
        value="0-6"
        id="exp1"
        checked={expRange === '0-6'}
        onChange={(e) => setExpRange(e.target.value)}
      />
      <label className="form-check-label" htmlFor="exp1">
        0–6 Yrs
      </label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="experience"
        value="6-18"
        id="exp2"
        checked={expRange === '6-18'}
        onChange={(e) => setExpRange(e.target.value)}
      />
      <label className="form-check-label" htmlFor="exp2">
        6–18 Yrs
      </label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="experience"
        value="18+"
        id="exp3"
        checked={expRange === '18+'}
        onChange={(e) => setExpRange(e.target.value)}
      />
      <label className="form-check-label" htmlFor="exp3">
        18+ Yrs
      </label>
    </div>
  </div>
</div>


            {/* Job Type */}
            <div className="mb-3">
              <label className="form-label fw-bold">Search by Job Type</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Developer"
                value={jobTypeSearch}
                onChange={(e) => setJobTypeSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="col-md-9">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5 gap-3">
            <div className="text-center my-4 display-block">
              <h2 className="d-inline-flex align-items-center justify-content-center gap-2">
  <FaUsers className="text-primary" />
  Employee Profiles
</h2>
            </div>
          </div>

          <div className="row g-4">
            {filterProducts.slice(0, visibleCount).map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <EmployeeCard
                  id={item._id}
                  image={item.image}
                  name={`${item.firstName} ${item.lastName}`}
                  description={`${item.educationLevel}, ${item.totalWorkExperience} yrs,${item.workExperienceSelf} yrs,${item.workExperienceGovernment} yrs`}
                  price={item.phoneNumber}
                  additionalSkills={item.additionalSkills} 
                  workExperienceSelf={item.workExperienceSelf} 
                />
              </div>
            ))}
          </div>

          {visibleCount < filterProducts.length && (
            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={handleExploreMore}>
                Explore More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;

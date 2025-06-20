import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { FiSearch } from 'react-icons/fi'; // React search icon

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

 

  return showSearch && visible ? (
    <div className="container bg-white px-3 pt-5 mt-5 rounded">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-8 d-flex align-items-center">
          <div className="position-relative w-100 me-3 mt-3">
            <input
              className="form-control py-2 ps-4 pe-5 rounded-pill shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search..."
            />
            <FiSearch
              size={20}
              className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
            />
          </div>
          <button
            className="btn btn-danger btn-sm mt-3"
            onClick={() => setShowSearch(false)}
            aria-label="Close Search"
          >
            <RxCross2 size={20} />
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default SearchBar;

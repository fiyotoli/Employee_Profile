import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './EmployeeCard'; // Assuming ProductItem is defined elsewhere

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
      <div className="text-center my-4">
  <h2 className="d-inline-flex align-items-center justify-content-center">
    <span className="bg-primary me-2" style={{  borderRadius: '50px',width: '30px', height: '3px', display: 'inline-block' }}></span>
    Related Products
  </h2>
</div>
      </div>
      <div className="row g-4 mb-3">
            {related.map((item, index) => (
              <div key={index} className="col-md-3">
                <ProductItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                />
              </div>
            ))}
          </div>
    </div>
  );
};

export default RelatedProducts;

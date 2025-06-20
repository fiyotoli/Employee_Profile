import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

function BestSeller() {
       const { products } = useContext(ShopContext);
        const [bestSeller, setbestSeller] = useState([]);
    
        useEffect(() => {
            const bestProduct =products.filter((item )=>(item.bestSeller))
            setbestSeller(products.slice(0, 5));
        }, [products]);
    
  return (
    <div className='container'>
      <div className='text-center mb-4'>
      <div className="text-center my-4">
  <h2 className="d-inline-flex align-items-center justify-content-center">
    <span className="bg-primary me-2" style={{  borderRadius: '50px',width: '30px', height: '3px', display: 'inline-block' }}></span>
   Best Seller
  </h2>
</div>
                <p className="text-muted">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum enim eaque consectetur culpa velit eius dolor quod officiis deleniti, similique excepturi aspernatur, assumenda alias odit, sed odio aliquam tenetur.
                </p>
      </div>
       {/* Rendering Products */}
       <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                {bestSeller.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        description={item.description }
                    />
                ))}
            </div>
    </div>
  )
}

export default BestSeller

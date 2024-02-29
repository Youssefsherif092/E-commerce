import React from 'react'
import Product from './../Product/Product';
import CategorySlider from '../CategorySlider/CategorySlider';

export default function Home() {
  return (
    <div className=''>
      <div className="categories">
        <h3>Categories</h3>
        <CategorySlider/>
      </div>
      <div className="products py-5">
        <h3>Products</h3>
        <Product/>
      </div>
    </div>
  )
}

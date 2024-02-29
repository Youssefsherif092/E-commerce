import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  const [categoryList,setCategory] = useState([])
  async function getCategories(){
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategory(data.data)
  }
  useEffect(()=>{
    getCategories();
  },[])
  return (
    <div>
      <Slider {...settings}>
        {
          categoryList.map((category)=>{
          return  <>
                    <img src={category.image} key={category._id} className='w-100' height={300} />
                    <p>{category.name}</p>
                  </>
          })
        }
      </Slider>

    </div>
  )
}


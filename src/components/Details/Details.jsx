import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cartContext } from '../Context/cartContext';
import { toast } from 'react-toastify';
import Slider from "react-slick";
import { InfinitySpin } from 'react-loader-spinner';

export default function Details() {
  let {id} = useParams();
  let {addToCart,setCartNumber} = useContext(cartContext);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  async function addToMyCart(id){
    let {data} = await addToCart(id)
    console.log(data);
    if(data.status == 'success'){
      toast.success(data.message)
      setCartNumber(data.numOfCartItems)
    }
  }
  const [productDetails,setProduct] = useState()
  async function getProduct(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setProduct(data.data);
    console.log(data.data);
    console.log(productDetails);
  }
  useEffect(() => {
      getProduct();
  }, [])
  
  return (
    <div className='container my-5'>
      <div className="row">
        { productDetails != undefined ?
        <>
        <div className="col-md-3">
          {/* <img src={productDetails?.imageCover} alt="" className='w-100' /> */}
          <Slider {...settings}>
        {
          productDetails?.images.map((image)=>{
          return  <>
                    <img src={image} className='w-100' />
                  </>
          })
        }
      </Slider>
        </div>
        <div className="col-md-9 d-flex flex-column justify-content-around ">
          <div>
            <h2>{productDetails?.title}</h2>
            <p>{productDetails?.description}</p>
            <div className="d-flex">
              <img src={productDetails?.brand?.image} alt="" className='w-25'/>
            </div>
          </div>
          <div>
            <p>{productDetails?.category?.name}</p>
            <p><span className='text-main'>Price: </span>{productDetails?.price}</p>
            <p><span className='text-main'>{productDetails?.ratingsAverage}</span><i className='rating-color fa-solid fa-star mx-1'></i></p>
            <button className='btn bg-main text-light w-100' onClick={()=>{addToMyCart(productDetails._id)}}>Add to Cart</button>
          </div>
        </div>
        </>
        : 
        <div className="vh-100 d-flex justify-content-center align-items-center">
                          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
            />
            </div>
}
      </div>
    </div>
  )
}

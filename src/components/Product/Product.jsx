import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {InfinitySpin} from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/cartContext';
import { toast } from 'react-toastify';
export default function Product() {
  let {addToCart,setCartNumber} = useContext(cartContext);
  const [productList,setProduct] = useState([]);
  let lever = 0;
  async function addToMyCart(id){
    let {data} = await addToCart(id)
    console.log(data);
    if(data.status == 'success'){
      toast.success(data.message);
      setCartNumber(data.numOfCartItems)
    }
  }

  function addToWishList(id){
    let itemsArray = localStorage.getItem('wishList') ?
    JSON.parse(localStorage.getItem('wishList')) : [];
    if(itemsArray.includes(id) != true){
      itemsArray.push(id);
      localStorage.setItem('wishList',JSON.stringify(itemsArray))
      console.log(itemsArray);
      let ele = document.getElementById(id);
      ele.classList.remove('text-black')
      ele.classList.add('text-danger')
      toast.success('Product Added to Wishlist!');
    }
    else{
      const index = itemsArray.indexOf(id);
      if (index > -1) { // only splice array when item is found
        itemsArray.splice(index, 1); // 2nd parameter means remove one item only
      }
      localStorage.setItem('wishList',JSON.stringify(itemsArray))
      console.log(itemsArray);
      let ele = document.getElementById(id);
      ele.classList.remove('text-danger')
      ele.classList.add('text-black')
      toast.success('Product Removed From Wishlist!');
    }
  }
  
  async function getProducts(){

    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    setProduct(data.data)
  }
  useEffect(()=>{
    getProducts();

  },[])
  return (
    <div className='py-5'>
      <div className="row">
          {productList.length > 0 ?
            productList.map((product)=>{
              return <div className="col-md-3" key={product._id}>
                <div className="product rounded-3 p-5 ">
                  <Link to={`/details/${product._id}`} className=' text-decoration-none '>
                    <img src={product.imageCover} className='w-100' alt={product.title} />
                    <p className="text-main">{product.category.name}</p>
                    <h6>{product.title}</h6>
                    
                    <div className="d-flex justify-content-between ">
                      <p>{product.price} EGP</p>
                      <p>{product.ratingsAverage}<i className='fa-solid fa-star rating-color mx-1'></i></p>
                    </div>
                  </Link>
                  <button className='btn bg-main text-light w-100 ' onClick={()=>{addToMyCart(product._id)}}>Add To Cart</button>
                  <span className="icon w-100 d-flex justify-content-end my-2">
                      <i  id={product._id} className="fa-regular fs-3 fa-heart text-black  text-end "    onClick={async ()=>{addToWishList(product._id)}}></i>
                  </span>
                </div>
              </div>
            })
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

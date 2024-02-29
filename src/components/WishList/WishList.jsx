import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {InfinitySpin} from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/cartContext';
import { toast } from 'react-toastify';

export default function WishList() {
  let {addToCart,setCartNumber} = useContext(cartContext);
  let arr = [];
  const [wishList,setWishList] = useState([])
  async function addToMyCart(id){
    let {data} = await addToCart(id)
    console.log(data);
    if(data.status == 'success'){
      toast.success(data.message);
      setCartNumber(data.numOfCartItems)
    }
  }
  async function getWishList(){
    // setWishList(localStorage.getItem('wishList'));
    // wishList.map(
    //   (id)=>{
    //     console.log(id);
    //   }
    // )
    let x = localStorage.getItem('wishList');
  let mainArr = JSON.parse(x);
  let container = [];
  for(let i=0;i<mainArr.length;i++){
    let data = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${mainArr[i]}`);
    container.push(data.data.data)
  }
  setWishList(container);
}


useEffect(() => {
  getWishList();
})

  return (
    <div className='py-5'>
      <div className="row">
          { wishList.length > 0 ?
            wishList.map(
              (product)=>{ 
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

              </div>
            </div>
              }
            )
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

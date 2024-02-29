import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../Context/cartContext'
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartData,setData] = useState([]);
  const [cartPrice,setPrice] = useState('');
  const [userID,setUserID] = useState('');
  let {getCart,updateCart,deleteCart,setCartNumber} = useContext(cartContext);
  useEffect(() => {
    (async ()=>{
      let data = await getCart();
      console.log(data.data.data);
      setData(data.data.data.products);
      setPrice(data.data.data.totalCartPrice);
      setUserID(data.data.data.cartOwner);
      localStorage.setItem('userID',data.data.data.cartOwner);
    })()
  }, [])
  async function removeProduct(id){
    let data = await deleteCart(id);
    setData(data.data.data.products);
    setPrice(data.data.data.totalCartPrice);
    setCartNumber(data.data.numOfCartItems)
    console.log(data);
  }
  async function updateProduct(id,count){
    if(count == 0){
      deleteCart(id)
    }else{
    let data = await updateCart(id,count);
    setData(data.data.data.products);
    setPrice(data.data.data.totalCartPrice);
    setCartNumber(data.data.numOfCartItems)
    }
  }
  
  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-md-11 bg-main-light shadow p-5">
          <p><span className='text-main fw-bold'>Total Price</span> {cartPrice}</p>
          {
            cartData.map(
              (product)=>{
                return <div className='row border-bottom py-5' key={product._id}>
                  <div className="col-md-1">
                    <img src={product.product.imageCover} alt="" className='w-100'/>
                    {console.log(product)}
                  </div>
                  <div className="col-md-11 d-flex justify-content-between align-items-center ">
                    <div>
                      <h5>{product.product.title}</h5>
                      <p>{product.price}</p>
                      <button className='btn btn-danger' onClick={()=>{removeProduct(product.product._id)}}><i className='fa-regular fa-trash-can me-2'></i>Remove</button>
                    </div>
                    <div>
                      <button className='btn btn-success' onClick={()=>{updateProduct(product.product._id,product.count+1)}}>+</button>
                      <span className='mx-2 text-main'>{product.count}</span>
                      <button className='btn btn-success' onClick={()=>{updateProduct(product.product._id,product.count-1)}}>-</button>
                      </div>
                  </div>
                </div>
              }
            )
          }
          <Link to='/checkout'><button className='bg-main btn w-100 text-light '>Pay Now!</button></Link>
        </div>
      </div>
    </div>
  )
}

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../Context/cartContext';

export default function CheckOut() {
  let [isLoading,setLoading] = useState(false);
  let {checkoutSession,getCart} = useContext(cartContext);
  const [cartID,setID] = useState('')
  useEffect(() => {
    (async ()=>{
      let data = await getCart();
      setID(data.data.data._id);
      console.log(data.data.data.cartOwner);
    })()
  }, [])
  async function payment(val){
    setLoading(true)
    let {data} = await checkoutSession(cartID,val);
    console.log(data);
    window.location = data.session.url
    // let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}url=http://localhost:3000`,val).catch((err)=>{
    //   setLoading(false);
    // })
    // if(res.data.message == 'success'){
    //   setLoading(false);
    // }
  }
  let formik = useFormik({
    initialValues:{
      details:'',
      city:'',
      phone:''
    },
    onSubmit:payment
  })
  return (
    <div className='my-5'>
      <h1 className='text-main'>Payment Form: </h1>
      <form onSubmit={formik.handleSubmit} action="" className='d-flex justify-content-center align-items-center'>
        <div className="row w-50 bg-light shadow p-4 gy-4">
                  <div className="col-md-12">
                    <label htmlFor="userDetails">Details:</label>
                    <input type="text" className='form-control' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} id='userDetails' name='details'/>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="userPhone">Phone Number:</label>
                    <input type="tel" className='form-control' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id='userPhone' name='phone'/>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="userCity">City:</label>
                    <input type="text" className='form-control' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} id='userCity' name='city'/>
                  </div>
                  <div className="col-md-12 d-flex justify-content-end ">
                    
                    <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white my-2' onChange={formik.handleChange} type="submit">Pay {isLoading == true ? <i class="fa-solid fa-gear fa-spin"></i> : ''}</button>
                  </div>
        </div>


      </form>
    </div>
  )
}

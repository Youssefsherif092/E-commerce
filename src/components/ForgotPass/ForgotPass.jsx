import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgotPass() {
  const [isLoading,setLoading] = useState(false); 
  const [isErr,setErr] = useState(''); 
  let valSchema = Yup.object({
    email: Yup.string().required('Field Required').email('Invalid Email, Please try again'),
  })
  let navigate = useNavigate();
  async function forgetPass(val){
    setLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',val).catch((err)=>{
      setErr(err.message);
    })
    console.log(data);
    if(data.statusMsg == 'success'){
      navigate('/confirmCode');
      toast.success('Reset code sent to mail!')
    }

  }
  let formik = useFormik({
    initialValues:{
      email:''
    },
    validationSchema:valSchema,
    onSubmit:forgetPass
  })
  return (
    <div className='my-5'>
      <h1 className='text-main'>Login Form: </h1>
      <form onSubmit={formik.handleSubmit} action="" className='d-flex justify-content-center align-items-center'>
        <div className="row w-50 bg-light shadow p-4 gy-4">
                  <div className="col-md-12">
                    <label htmlFor="userEmail">Email:</label>
                    <input type="email" className='form-control' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='userEmail' name='email'/>
                    {formik.errors.email && formik.touched.email ? <p className=' text-danger '>{formik.errors.email}</p>:''}
                  </div>
                  <div className="col-md-12">
                    {isErr != '' ? <p className='text-danger'>{isErr}</p> : ''}
                  </div>
                  <div className="col-md-12 d-flex justify-content-end ">
                    <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white my-2' onChange={formik.handleChange} type="submit">Reset Password {isLoading ?  <span><i className='fa-solid fa-spinner fa-spin'></i></span> : ''}</button>
                  </div>
        </div>


      </form>
    </div>
  )
}

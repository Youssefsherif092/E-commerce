import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userContext } from '../Context/TokenContext';

export default function SetNewPass() {
  let {setToken} = useContext(userContext);
  const [isLoading,setLoading] = useState(false); 
  const [isSuccess,setSuccess] = useState(null); 
  let valSchema = Yup.object({
    email: Yup.string().required('Field Required').email('Invalid Email, Please try again'),
    newPassword: Yup.string().required('Password is Required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Minimum eight characters, at least one letter, one number and one special character'),
  })
  async function signIn(val){
    setLoading(true)
    let res = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',val).catch((err)=>{
      let message = err.response.data.message
      console.log(err);
      setSuccess(message)
      setLoading(false)
    })
    if(res.status == 200){
      localStorage.setItem('userToken',res.data.token)
      setToken(res.data.token)
      setLoading(false)
      setSuccess(true)
    }
    else{
      console.log(res);
    }
  }
  let formik = useFormik({
    initialValues:{
      email:'',
      newPassword:'',
    },
    validationSchema:valSchema,
    onSubmit:signIn
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
                    <label htmlFor="userPass">Password:</label>
                    <input type="password" className='form-control' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id='userPass' name='newPassword'/>
                    {formik.errors.newPassword && formik.touched.newPassword ? <p className=' text-danger '>{formik.errors.newPassword}</p>:''}
                  </div>
                  <div className="col-md-12 d-flex justify-content-end ">
                    <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white my-2' onChange={formik.handleChange} type="submit">Set New Passcode {isLoading ?  <span><i className='fa-solid fa-spinner fa-spin'></i></span> : ''}</button>
                  </div>
                  <div className="col-md-12">
                  {isSuccess == true ? <p>Success! <Link className='text-main' to='/'>Home...</Link></p> : <p className='text-danger'>{isSuccess}</p>}
                  </div>
        </div>


      </form>
    </div>
  )
}

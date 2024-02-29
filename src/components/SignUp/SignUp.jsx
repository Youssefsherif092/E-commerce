import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [isLoading,setLoading] = useState(false); 
  const [isSuccess,setSuccess] = useState(null); 
  let valSchema = Yup.object({
    name:Yup.string().min(3,'Min Length is 3').max(20,'Max Length is 20').required('Required Field'),
    email: Yup.string().required('Field Required').email('Invalid Email, Please try again'),
    phone: Yup.string().required('Phone is required').matches(/^01[1235][0-9]{8}$/,'Phone is Invalid'),
    password: Yup.string().required('Password is Required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Minimum eight characters, at least one letter, one number and one special character'),
    rePassword: Yup.string().required('Field Required').oneOf([Yup.ref('password')],"Passwords don't match")
  })
  async function signUp(val){
    setLoading(true)
    let res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',val).catch((err)=>{
      let message = err.response.data.message
      setSuccess(message)
      setLoading(false)
    })
    if(res.data.message == 'success'){
      setLoading(false)
      setSuccess(true)
    }
  }
  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema:valSchema,
    onSubmit:signUp
  })
  return (
    <div className='my-5'>
      <h1 className='text-main'>Register Form: </h1>
      <form onSubmit={formik.handleSubmit} action="" className='d-flex justify-content-center align-items-center'>
        <div className="row w-50 bg-light shadow p-4 gy-4">
                    <div className="col-md-12">
                    <label htmlFor="userName">Name:</label>
                    <input type="text" className='form-control' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id='userName' name='name'/>
                    {formik.errors.name && formik.touched.name ? <p className=' text-danger '>{formik.errors.name}</p>:''}
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="userEmail">Email:</label>
                    <input type="email" className='form-control' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='userEmail' name='email'/>
                    {formik.errors.email && formik.touched.email ? <p className=' text-danger '>{formik.errors.email}</p>:''}
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="userPhone">Phone Number:</label>
                    <input type="tel" className='form-control' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id='userPhone' name='phone'/>
                    {formik.errors.phone && formik.touched.phone ? <p className=' text-danger '>{formik.errors.phone}</p>:''}
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="userPass">Password:</label>
                    <input type="password" className='form-control' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='userPass' name='password'/>
                    {formik.errors.password && formik.touched.password ? <p className=' text-danger '>{formik.errors.password}</p>:''}
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="userRePassword">Repeat Password:</label>
                    <input type="password" className='form-control' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id='userRePassword' name='rePassword'/>
                    {formik.errors.rePassword && formik.touched.rePassword ? <p className=' text-danger '>{formik.errors.rePassword}</p>:''}
                  </div>
                  <div className="col-md-12 d-flex justify-content-end ">
                    <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white my-2' onChange={formik.handleChange} type="submit">Register {isLoading ?  <span><i className='fa-solid fa-spinner fa-spin'></i></span> : ''}</button>
                  </div>
                  <div className="col-md-12">
                  {isSuccess == true ? <p>Success! <Link className='text-main' to='/signin'>Login...</Link></p> : <p className='text-danger'>{isSuccess}</p>}
                  </div>
        </div>


      </form>
    </div>
  )
}

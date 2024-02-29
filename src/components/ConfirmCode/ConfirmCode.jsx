import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

export default function ConfirmCode() {
  const [isLoading,setLoading] = useState(false); 
  const [isErr,setErr] = useState(''); 
  let valSchema = Yup.object({
    resetCode: Yup.string().required('Field Required'),
  })
  let navigate = useNavigate();
  async function codeConfirm(val){
    setLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',val).catch((err)=>{
      setErr(err);
    })
    console.log(data);
    if(data.status == 'Success'){
      navigate('/SetNewPass')
    }

  }
  let formik = useFormik({
    initialValues:{
      resetCode:''
    },
    validationSchema:valSchema,
    onSubmit:codeConfirm
  })
  return (
    <div className='my-5'>
      <h1 className='text-main'>Reset Form: </h1>
      <form onSubmit={formik.handleSubmit} action="" className='d-flex justify-content-center align-items-center'>
        <div className="row w-50 bg-light shadow p-4 gy-4">
                  <div className="col-md-12">
                    <label htmlFor="userresetCode">Code:</label>
                    <input type="text" className='form-control' value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} id='userresetCode' name='resetCode'/>
                    {formik.errors.resetCode && formik.touched.resetCode ? <p className=' text-danger '>{formik.errors.resetCode}</p>:''}
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

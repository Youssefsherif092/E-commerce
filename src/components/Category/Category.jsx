import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { InfinitySpin } from 'react-loader-spinner';

export default function Category() {
  const [categoryData,setCategory] = useState([]);
  const [subCategoryData,setSubCategory] = useState([]);
  async function getSubCategory(id){
    let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    setSubCategory(res.data.data);
    console.log(res.data.data);
  }
  useEffect(() => {
    async function getCategories(){
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategory(data.data)
      
    }
    getCategories();
  }, []);

  
  return (
    <div className='container'>
      <div className="row gy-3">
        { categoryData.length > 0 ?
        categoryData.map((cat)=>{
          return <div className="col-md-4"  id={cat._id} onClick={()=>{getSubCategory(cat._id)}}> 
                  <div className="card w-100 product">
                    <img src={cat.image} className='card-img-top object-fit-cover  w-100' height={300} alt="" />
                    <div className="card-body d-flex justify-content-center align-items-center ">
                      <p className="card-text fw-bold text-success h3">{cat.name}</p>
                    </div>
                  </div>
                </div>
        })
        :
        ''
        }
        <div className="row my-5 gy-3">
        {
          subCategoryData.length > 0 ?
          subCategoryData?.map((subCat)=>{
            return <div className="col-md-4"  id={subCat._id}>
                <div className="card w-100 product">
                  <div className="card-body d-flex justify-content-center align-items-center ">
                    <p className="card-text fw-bold text-success h3">{subCat.name}</p>
                  </div>
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

    </div>
  )
}

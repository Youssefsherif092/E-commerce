import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';

export default function Brands() {
  const [brandsData,setBrands] = useState([]);
  
  useEffect(() => {
    async function getCategories(){
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(data.data)
    }
    getCategories();
  }, []);

  
  return (
    <div className='container my-5 py-5'>
      <div className="row gy-3">
        { brandsData.length > 0 ?
        brandsData.map((brand)=>{
          
          console.log(brand);
          return <> <div className="col-md-3"  id={brand._id}  data-bs-toggle="modal" data-bs-target={`#${brand.name}`}>
                  <div className="card w-100 product">
                    <img src={brand.image} className='card-img-top object-fit-cover  w-100 img-fluid ' alt="" />
                    <div className="card-body d-flex justify-content-center align-items-center ">
                      <p className="card-text fw-bold text-success h3">{brand.name}</p>
                    </div>
                  </div>
                </div>              
               <div className="modal fade" id={`${brand.name}`} tabIndex="-1" aria-labelledby={`${brand.name}Label`} aria-hidden="true">
                 <div className="modal-dialog">
                   <div className="modal-content">
                     <div className="modal-header">
                       
                       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div className="modal-body">
                       <div className="d-flex justify-content-between align-items-center">
                        <div className="para-contain">
                          <p className="card-text fw-bold text-success h3">{brand.name}</p>
                        </div>
                        <div className="img-contain d-flex justify-content-center ">
                        <img src={brand.image} className='card-img-top object-fit-cover w-50 img-fluid m-auto' alt="" />
                        </div>
                       </div>
                     </div>
                     <div className="modal-footer">
                       <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     </div>
                   </div>
                 </div>
               </div>
              </>

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

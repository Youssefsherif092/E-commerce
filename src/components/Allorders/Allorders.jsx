import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../Context/cartContext';
import axios from 'axios';

export default function Allorders() {
  const [orderData,setOrderData] = useState([])
  useEffect(() => {
    (async ()=>{
      let userID = localStorage.getItem('userID')
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`);
      setOrderData(data)
    })()
  }, [])
  return (
    <>
    <div className="container my-5 py-5">
      <div
        className="table-responsive"
      >
        <table
          className="table table-primary"
        >
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Price</th>
              <th scope="col">Paid</th>
              <th scope="col">Delivered</th>
              <th scope="col">Payment Date & Time</th>
              <th scope="col">View Order</th>
            </tr>
          </thead>
          <tbody>
          {orderData.map(
              (order)=>{
                let date = new Date(order.createdAt);
                let year = date.getFullYear();
                let month = ("0" + (date.getMonth() + 1)).slice(-2); 
                let day = ("0" + date.getDate()).slice(-2);
                let hours = ("0" + date.getHours()).slice(-2);
                let minutes = ("0" + date.getMinutes()).slice(-2);
                let seconds = ("0" + date.getSeconds()).slice(-2);
                let formattedText = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
                let orderIdentifier = `${order.id}`
                return <><tr scope='row'>
                        <td>{order.id}</td>
                        <td>{order.totalOrderPrice} EGP</td>
                        <td className=''>{order.isPaid ? <i className="fa-regular fa-circle-check fs-3 text-center m-auto  text-success"></i> : <i className="fa-regular fa-circle-xmark fs-3 text-center m-auto  text-danger"></i>}</td>
                        <td className=''>{order.isDelivered ? <i className="fa-regular fa-circle-check fs-3 text-center m-auto  text-success"></i> : <i className="fa-regular fa-circle-xmark fs-3 text-center m-auto  text-danger"></i>}</td>
                        <td>{formattedText}</td>
                        <td><button className='btn bg-main text-white' data-bs-toggle="modal" data-bs-target={`#ID` + orderIdentifier}>View Order</button></td>
                        <div
                                className="modal fade"
                                id={`ID` + orderIdentifier}
                                tabIndex="-1"
                                role="dialog"
                                aria-labelledby='hello'
                                aria-hidden="false"
                               >
                                <div
                                  className="modal-dialog modal-fullscreen modal-dialog-scrollable modal-dialog-centered modal-sm"
                                  role="document"
                                >
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h3 className="modal-title text-main" id="modalTitleId">
                                        Order details:
                                      </h3>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                    <div className="col-md-11 bg-main-light shadow p-5">
                                    <p><span className='text-main fw-bold'>Total Price</span> {order.totalOrderPrice}</p>
                                      {
                                        order.cartItems.map(
                                          (product)=>{
                                            return <div className='row border-bottom py-5' key={product._id}>
                                              <div className="col-md-1">
                                                <img src={product.product.imageCover} alt="" className='w-100'/>
                                              </div>
                                              <div className="col-md-11 d-flex justify-content-between align-items-center ">
                                                <div>
                                                  <h5>{product.product.title}</h5>
                                                  <p>{product.price} EGP</p>
                                                </div>
                                                <div>
                                                  <span className='mx-2 text-main'>Quantity: {product.count}</span>
                                                </div>
                                              </div>
                                            </div>
                                          }
                                        )
                                      }
                                      </div>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                               </div>
                        </tr>              
                               
                               
                               
                            </>
                          }
                        )
              }
            


          
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

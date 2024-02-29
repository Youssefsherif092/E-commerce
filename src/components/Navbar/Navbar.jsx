import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../Context/TokenContext'
import { cartContext } from '../Context/cartContext';

export default function Navbar() {
  let {userToken,setToken} = useContext(userContext);
  let {cartNumber,getCart,setCartNumber} = useContext(cartContext);
  let navigate = useNavigate();
  useEffect(() => {
    (async ()=>{
      if(userToken !== null){
      let data = await getCart();
      if(data.data.data != undefined)
      setCartNumber(data.data.numOfCartItems)
      }
    })()
  }, [])
  function logout(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    localStorage.removeItem('wishList');
    setToken(null)
    navigate('/signin')
  }
  return (
    <nav
      className="navbar navbar-expand-sm navbar-light bg-light fixed-top "
    >
      <div className="container">
        <Link className="navbar-brand" to="E-commerce/"><i className="fa-solid text-main fa-cart-shopping"></i><span className='fw-bold '>FreshCart</span></Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userToken !== null ? <> <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="E-commerce/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="E-commerce/category">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="E-commerce/brands">Brands</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="E-commerce/product">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="E-commerce/wishlist">Wishlist</Link>
              </li>

          </ul>
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item d-flex align-items-center ">
                <i className="fa-brands mx-3 fa-facebook"></i>
                <i className="fa-brands mx-3 fa-twitter"></i>
                <i className="fa-brands mx-3 fa-instagram"></i>
                <i className="fa-brands mx-3 fa-linkedin"></i>
              </li>
          <li className="nav-item">
            <Link to={'E-commerce/cart'}>
              <i className="fa-solid fa-cart-shopping text-main"></i>
              <span className='badge bg-main text-light'>{cartNumber}</span>
            </Link>
          </li>
          <li className="nav-item"  onClick={()=>{logout()}}>
                <Link className="nav-link">Logout</Link>
              </li>
          </ul>
          </>
           : <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="E-commerce/signup">Signup</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="E-commerce/signin">Login</Link>
              </li>
          </ul>
        </div>}
          
        </div>
        
      </div>
    </nav>
    
    
  )
}

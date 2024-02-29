import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext();
export let baseURL = 'https://ecommerce.routemisr.com';
export default function CartContextProvider(props){
    let headers = {token: localStorage.getItem('userToken')}
    const [cartNumber,setCartNumber] = useState(null)
    function addToCart(id){
        return axios.post(`${baseURL}/api/v1/cart`,
        {
            productId: id
        },
        {
            headers:headers
        }
        )
    }
    async function getCart(){
        return axios.get(`${baseURL}/api/v1/cart`,
        {
            headers:headers
        }
        ).catch((err)=>{console.error(err);})
    }
    function updateCart(id,count){
        return axios.put(`${baseURL}/api/v1/cart/${id}`,
        {
            count:count
        },
        {
            headers:headers
        }
        )
    }
    function deleteCart(id){
        return axios.delete(`${baseURL}/api/v1/cart/${id}`,
        {
            headers:headers
        }
        )
    }

    function checkoutSession(id,formData){
        return axios.post(`${baseURL}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
        {
            shippingAddress:formData
        },
        {
            headers:headers
        }
        )
    }
    async function addToWishList(id){
        return axios.post(`${baseURL}/api/v1/wishlist`, 
        {
            headers:headers
        },
        {
            productId:id
        }
        ).catch((err)=>{console.error(err)})
    }


    return <cartContext.Provider value={{addToCart,setCartNumber,cartNumber,getCart,deleteCart,updateCart,checkoutSession,addToWishList}}>
        {props.children}
    </cartContext.Provider>
}
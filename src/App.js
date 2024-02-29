import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MasterLayout from './components/MasterLayout/MasterLayout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Signin from './components/Signin/Signin';
import SignUp from './components/SignUp/SignUp';
import Brands from './components/Brands/Brands';
import Product from './components/Product/Product';
import NotFound from './components/NotFound/NotFound';
import UserContextProvider, { userContext } from './components/Context/TokenContext';
import { useContext } from 'react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Details from './components/Details/Details';
import CartContextProvider from './components/Context/cartContext';
import { ToastContainer } from 'react-toastify';
import Category from './components/Category/Category';
import CheckOut from './components/CheckOut/CheckOut';
import Allorders from './components/Allorders/Allorders';
import ForgotPass from './components/ForgotPass/ForgotPass';
import ConfirmCode from './components/ConfirmCode/ConfirmCode';
import SetNewPass from './components/SetNewPass/SetNewPass';
import WishList from './components/WishList/WishList';


const router = createBrowserRouter([
  {path:'E-commerce',element:<MasterLayout/>,children:[
    {path:'E-commerce',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'E-commerce/home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'E-commerce/cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'E-commerce/checkout',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:'E-commerce/allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'E-commerce/details/:id',element:<ProtectedRoute><Details/></ProtectedRoute>},
    {path:'E-commerce/wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'E-commerce/signin',element:<Signin/>},
    {path:'E-commerce/forgetPassword',element:<ForgotPass/>},
    {path:'E-commerce/SetNewPass',element:<SetNewPass/>},
    {path:'E-commerce/confirmCode',element:<ConfirmCode/>},
    {path:'E-commerce/signup',element:<SignUp/>},
    {path:'E-commerce/product',element:<ProtectedRoute><Product/></ProtectedRoute>},
    {path:'E-commerce/category',element:<ProtectedRoute><Category/></ProtectedRoute>},
    {path:'E-commerce/brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'*',element:<NotFound/>}
  ]}
])

function App() {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={router}/>
        <ToastContainer theme='colored'/>
      </UserContextProvider>
    </CartContextProvider>
  );
}

export default App;

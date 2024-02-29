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
  {path:'',element:<MasterLayout/>,children:[
    {path:'',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'ُE-commerce/cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'checkout',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'details/:id',element:<ProtectedRoute><Details/></ProtectedRoute>},
    {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'signin',element:<Signin/>},
    {path:'forgetPassword',element:<ForgotPass/>},
    {path:'SetNewPass',element:<SetNewPass/>},
    {path:'confirmCode',element:<ConfirmCode/>},
    {path:'signup',element:<SignUp/>},
    {path:'product',element:<ProtectedRoute><Product/></ProtectedRoute>},
    {path:'category',element:<ProtectedRoute><Category/></ProtectedRoute>},
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
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

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Header from "./compenent/layout/header.js"
import Footer from './compenent/layout/footer';
import WebFont from "webfontloader";
import Home from './compenent/Home/home.js';
import ProductDetails from './compenent/Product/Product'
import AllProducts from './compenent/Products/AllProducts';
import Search from './compenent/Products/search';
import LoginSignup from './compenent/User/LoginSignup';
import Store from './store'
import { loadUser } from './action/userAction'
import { useSelector } from 'react-redux';
import Useroption from './compenent/layout/useroption'
import Account from './compenent/User/profile'
import UpdateProfile from './compenent/User/UpdateProfile'
import PasswordUpdate from './compenent/User/PasswordUpdate';
import ForgetPassword from './compenent/User/ForgetPassword'
import ResetPassword from './compenent/User/ResetPassword'
import Cart from './compenent/Cart/cart'
import Shipping from './compenent/Cart/Shippinginfo'
import ConfirmOrder from './compenent/Cart/ConfirmOrder'
import Payment from './compenent/Cart/Elements'
import axios from 'axios';
// import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './compenent/Cart/orderSuccess'
import MyOrders from './compenent/order/MyOrder'
import OrderDetails from './compenent/order/OrderDetails'
import Dashboard from './compenent/admin/Dashboard';
import ProductList from './compenent/admin/productList'
import NewProduct from './compenent/admin/NewProduct'
import UpdateProduct from './compenent/admin/updateProduct'
import OrderList from './compenent/admin/OrderList'
import UserList from './compenent/admin/Userlist'
import ProcessOrder from './compenent/admin/processOrder'
import UpdateUser from './compenent/admin/UpdateUser'
import ReviewsList from './compenent/admin/ReviewsList'
import NotFound from './compenent/NotFound/NotFound'
import About from './compenent/About/About';
import Contact from './compenent/Contact/Contact';

function App() {

  const { isAuthentication, user, loading } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = React.useState("")

  async function getStripeApiKey() {
 
    const { data } = await axios.get('/api/v1/stripeapikey')
   
    setStripeApiKey(data.stripeApiKey)
    
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    Store.dispatch(loadUser())
    getStripeApiKey()
   
  }, []);

  // window.addEventListener('contextmenu', (e)=> e.preventDefault())

  return (

    <Router>

      <Header />

      {isAuthentication && <Useroption user={user} />}
      <Routes>

        <Route extact path="/" element={<Home />} />
        <Route extact path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={< AllProducts />} />
        <Route path="/products/:keyword" element={< AllProducts />} />
        <Route path="/search" element={< Search />} />
        <Route path="/login" element={<LoginSignup />} />
        { loading === false && (isAuthentication && <Route path="/account" element={<Account />} />)}
        { loading === false && ( isAuthentication === false &&<Route path="/account" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/me/update" element={<UpdateProfile />} />)}
        { loading === false && ( isAuthentication === false &&<Route path="/me/update" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/password/update" element={<PasswordUpdate />} />)}
        { loading === false && ( isAuthentication === false &&<Route path="/password/update" element={<Navigate to="/login" />} />)}
        <Route path="/password/forgot" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/Cart" element={<Cart />} />
        { loading === false && (isAuthentication && <Route path="/login/shipping" element={<Shipping />} />)}
        { loading === false && ( isAuthentication === false &&<Route path="/login/shipping" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/order/confirm" element={<ConfirmOrder />} />)}
        { loading === false && ( isAuthentication === false &&<Route path="/order/confirm" element={<Navigate to="/login" />} />)}
        {/* {isAuthentication && <Route path="/process/payment" element={ <Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements>} />} */}
        { loading === false && (isAuthentication && <Route path="/process/payment" element={ <Payment  stripe={  loadStripe(stripeApiKey)  }  /> }  />   ) }
        { loading === false && ( isAuthentication === false &&<Route path="/process/payment" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/success" element={ <OrderSuccess/> } />) }
        { loading === false && ( isAuthentication === false && <Route path="/success" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/orders" element={ <MyOrders/> } />) }
        { loading === false && ( isAuthentication === false && <Route path="/orders" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/order/:id" element={ <OrderDetails/> } />) }
        { loading === false && ( isAuthentication === false && <Route path="/order/:id" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication &&<Route path="/admin/dashboard" element={ <Dashboard user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/dashboard" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/products" element={ <ProductList user={user} loading={loading} />} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/products" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/Create" element={ <NewProduct user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/Create" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/product/:id" element={ <UpdateProduct user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/product/:id" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/orders" element={ <OrderList user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/orders" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/users" element={ <UserList user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/users" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/order/:id" element={ <ProcessOrder user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/order/:id" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/user/:id" element={ <UpdateUser user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/user/:id" element={<Navigate to="/login" />} />)}
        { loading === false && (isAuthentication && <Route path="/admin/reviews" element={ <ReviewsList user={user} loading={loading}/>} />) }
        { loading === false && ( isAuthentication === false && <Route path="/admin/reviews" element={<Navigate to="/login" />} />)}
        <Route path='*' element={<NotFound />} />
        <Route path='contact' element={<Contact />} />
        <Route path='about' element={<About />} />

      </Routes>
      <Footer />

    </Router>

  );
}

export default App;

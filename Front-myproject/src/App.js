import React from 'react';
import Navbar from './core/Navbar';
import Footer from './core/Footer';
import Signin from './user/Signin';
import Signup from './user/Signup';
import NavbarTest from './NavbarTest';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Layout from './core/Layout'
import Product from './core/Product';
import Home from './core/Home';
import ProductDetail from './core/ProductDetail';
import AboutHook from './core/AboutHook';
import AdminDashboard from './admin/AdminDashboard';
import AdminRoute from './auth/AdminRoute';
import PageNotFound from './core/PageNotFound';
import NoAccess from './core/NoAccess';
import AdminProductManage from './admin/AdminProductManage';
import AdminProductUpdate from './admin/AdminProductUpdate';
import AdminProductCreate from './admin/AdminProductCreate';
import PrivateRoute from './auth/PrivateRoute';
import UserProfile from './user/UserProfile';
import UserDashboard from './user/UserDashboard';
import Cart from './core/Cart';

// ipmort css
import navbar from './css/navbar.css'
import loader from './css/loader.css'
import product from './css/product.css'
import home from './css/home.css'
import filter from './css/filter.css';
import card from './css/card.css';
import app from './App.css'
import adminProductCreate from './css/adminProductCreate.css'
import adminRouteLayout from './css/adminRouteLayout.css'
import cart from './css/cart.css'
import productDetail from './css/productDetail.css'


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/AboutHook" exact component={AboutHook} />
        <Route exact path="/products/" exact component={Product} />
        <Route path="/product/:productId" exact component={ProductDetail} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard/profile" exact component={UserProfile} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />

        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
        <AdminRoute path="/admin/dashboard/product/create" exact component={AdminProductCreate}/>
        <AdminRoute path="/admin/dashboard/product/manage" exact component={AdminProductManage}/>
        <AdminRoute path="/admin/dashboard/product/update/:productId" exact component={AdminProductUpdate}/>

        <Route exact path="/noAccess" component={NoAccess} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;

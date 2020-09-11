import React from 'react';
import Navbar from './core/Navbar';
// import Signin from './user/Signin';
// import Signup from './user/Signup';
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


import myBootstrap from './GlobalCSS/myBootstrap.scss'


// ipmort css
import navbar from './css/navbar.scss'
import loader from './css/loader.css'
import product from './css/product.css'
import home from './css/home.css'
import filter from './css/filter.css';
import card from './css/card.scss';
import app from './App.css'
import adminProductCreate from './css/adminProductCreate.css'
import adminRouteLayout from './css/adminRouteLayout.scss'
import cart from './css/cart.scss'
import productDetail from './css/productDetail.scss'
// import signup from './css/signup.scss'
import checkout from './css/checkout.scss'
import dashboardHistory from './css/dashboardHistory.scss'
import review from './css/review.scss'
import cateSection from './css/cateSection.scss'
import cardPreview from './css/cardPreview.scss'
import productCarousel from './css/productCarousel.css'


import UserDashboardHistory from './user/UserDashboardHistory';
import AdminCateCreate from './admin/AdminCateCreate';
import AdminCateManage from './admin/AdminCateManage';
import AdminCateUpdate from './admin/AdminCateUpdate';


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
        <PrivateRoute path="/user/dashboard/history" exact component={UserDashboardHistory} />
        
        {/* <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/> */}
        <AdminRoute path="/admin/dashboard/product/create" exact component={AdminProductCreate}/>
        <AdminRoute path="/admin/dashboard/product/manage" exact component={AdminProductManage}/>
        <AdminRoute path="/admin/dashboard/product/update/:productId" exact component={AdminProductUpdate}/>
        
        <AdminRoute path="/admin/dashboard/category/create" exact component={AdminCateCreate}/>
        <AdminRoute path="/admin/dashboard/category/manage" exact component={AdminCateManage}/>
        <AdminRoute path="/admin/dashboard/category/update/:categoryId" exact component={AdminCateUpdate}/>
        <Route exact path="/noAccess" component={NoAccess} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;

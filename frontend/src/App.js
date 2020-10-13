import React from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Product from './core/Product';
import Home from './core/Home';
import ProductDetail from './core/ProductDetail';
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
import './css/navbar.scss'
import './css/loader.css'
import './css/product.css'
import './css/home.css'
import './css/filter.css'
import './css/card.scss'
import './App.css'
import './css/adminProductCreate.css'
import './css/adminRouteLayout.scss'
import './css/cart.scss'
import './css/productDetail.scss'
// import signup from './css/signup.scss'
import './css/checkout.scss'
import './css/dashboardHistory.scss'
import './css/review.scss'
import './css/cateSection.scss'
import './css/cardPreview.scss'
import './css/productCarousel.css'


import UserDashboardHistory from './user/UserDashboardHistory';
import AdminCateCreate from './admin/AdminCateCreate';
import AdminCateManage from './admin/AdminCateManage';
import AdminCateUpdate from './admin/AdminCateUpdate';


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route exact path="/products/" exact component={Product} />
        <Route path="/product/:productId" exact component={ProductDetail} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard/profile" exact component={UserProfile} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/user/dashboard/history" exact component={UserDashboardHistory} />

        <AdminRoute path="/admin/dashboard/product/create" exact component={AdminProductCreate} />
        <AdminRoute path="/admin/dashboard/product/manage" exact component={AdminProductManage} />
        <AdminRoute path="/admin/dashboard/product/update/:productId" exact component={AdminProductUpdate} />

        <AdminRoute path="/admin/dashboard/category/create" exact component={AdminCateCreate} />
        <AdminRoute path="/admin/dashboard/category/manage" exact component={AdminCateManage} />
        <AdminRoute path="/admin/dashboard/category/update/:categoryId" exact component={AdminCateUpdate} />
        <Route exact path="/noAccess" component={NoAccess} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;

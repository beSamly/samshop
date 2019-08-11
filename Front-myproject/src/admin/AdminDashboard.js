import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { BrowserRouter, Router,Switch, Route, Link } from "react-router-dom";
import AdminProductCreate from "./AdminProductCreate";
import AdminProductManage from "./AdminProductManage";
import AdminProductUpdate from "./AdminProductUpdate";
import AdminRouteLayout from "./AdminRouteLayout";

const AdminDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

   
    return (
        <AdminRouteLayout>
            children
        </AdminRouteLayout>
    );
};

export default AdminDashboard;
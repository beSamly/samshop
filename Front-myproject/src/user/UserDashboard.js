import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";
import UserDashboardLayout from "./UserDashboardLayout";

const UserDashboard = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
    }, []);

    return (
        <UserDashboardLayout>
            <div className="row">
          
            </div>
        </UserDashboardLayout>
    );
};

export default UserDashboard;

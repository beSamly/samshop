import React, { useState, useEffect } from "react";
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

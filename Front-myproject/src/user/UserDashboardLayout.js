import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { BrowserRouter, Router, Switch, Route, Link, withRouter } from "react-router-dom";

const UserDashboardLayout = ({ children, history, location, keywordIn }) => {

    const isActive = (history, path) => {
        if (history.location.pathname === path) {
            return "dashboard-sidebar-item dashboard-sidebar-item-active ";
        } else {
            return "dashboard-sidebar-item ";
        }
    };

    const showSideBar = () => {
        return (
            <div className="dashboard-sidebar" >
                <div className="dashboard-sidebar-title">User Options</div>
                <ul className="dashboard-sidebar-item-box">
                    <Link to={'/user/dashboard/profile'}>
                        <div className={isActive(history, '/user/dashboard/profile')}>
                            <li className="" >Profile</li>
                        </div>
                    </Link>
                    {/* <Link to={'/user/dashboard'}>
                        <li className={isActive(history, '/user/dashboard')}>Dashboard</li>
                    </Link> */}
                    <Link to={'/user/dashboard/history'}>
                        <div className={isActive(history, '/user/dashboard/history')}>
                            <li >History</li>
                        </div>
                    </Link>
                </ul>
            </div>
        )
    }

    return (
        <Layout keywordIn={keywordIn}>
            <div className="row dashboard-cont">
                <div className="col-3">
                    {showSideBar()}
                </div>
                <div className="col-9">
                    {children}
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(UserDashboardLayout)
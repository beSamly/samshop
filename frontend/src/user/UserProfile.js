import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";
import UserDashboardLayout from "./UserDashboardLayout";

const UserProfile = ({ match }) => {
    const [values, setValues] = useState({
        name: "",
        password: "",
        error: false,
        success: false
    });

    const userId = JSON.parse(localStorage.getItem('jwt')).user._id
    console.log( JSON.parse(localStorage.getItem('jwt')))
    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = userId => {
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(userId, token, { name, email, password }).then(
            data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            name: data.name,
                            password:"",
                            success: true
                        });
                    });
                }
            }
        );
    };

   

    const profileUpdate = (name, email, password) => (
        <form className="profile-cont">
            {success===true&& <div className="success-message">Succesfully changed!</div>}
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    onChange={handleChange("name")}
                    className="form-control"
                    value={name}
                />
            </div>
          
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    onChange={handleChange("password")}
                    className="form-control"
                    value={password}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
        <UserDashboardLayout>
            <div className="profile-header">Profile update</div>
            {profileUpdate(name, email, password)}
        </UserDashboardLayout >
    );
};

export default UserProfile
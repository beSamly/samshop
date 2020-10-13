import React, { useState, useEffect } from "react";
import { signup} from '../../auth/index'
import './SignIn.scss'

const SignUp = ({ history, visible, flipVisibility, closeForm }) => {
    var jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt && jwt.token) {
        // history.push('/dashboard/')
    }

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: [],
        loading: false,
        success: false
    })

    const { name, email, password, password2, loading, errors, success } = values;

    useEffect(() => {

    }, [])

    const handleChange = name => event => {
        setValues({ ...values, errors: [], [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, errors: [{ 'message': data.error }], success: false, loading: false });
            } else {
                setValues({
                    errors: [],
                    name: "",
                    email: "",
                    password: "",
                    error: false,
                    success: true,
                    loading: false
                });
            }
        });
    };


    const ValidateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            if (ValidateEmail(email)) {
                handleSubmit(e)
            } else {
                setValues({ ...values, error: true })
            }
        }
    }

    const isFilled = (option) => {
        if (values[option] !== '') {
            return 'label label-active'
        } else {
            return 'label'
        }
    }

    const showErrors = () => {
        var errorMessage = errors[0].message
        return errorMessage
    }

    const passwordCheck = () => {
        if (password === password2) {
            return true
        } else {
            setValues({ ...values, errors: [{ password: "Password do not match" }] })
        }
    }

    const showForm = () => {
        return (
            <form onKeyDown={handleEnter} className={`signin-form `}>
                <div className="close-btn " onClick={closeForm}>x</div>
                <div class="signin-header">
                    <div class="row justify-content-center ">
                        <img src={require('./img/user.png')} className="user-icon" />
                    </div>
                    <div className="">Sign Up</div>
                </div>
                {errors.length > 0 && (<div className=" showError ">{showErrors()}</div>)}
                {success === true && (<div className="success-message">Your account has been created. please sign in!</div>)}

                <div class="signin-body">
                    <div class="my-form ">
                        <input type="email" class="my-form-input" onChange={handleChange('name')} value={name} />
                        <label data-error="wrong" className={isFilled("name")} for="Form-email1">Your name</label>
                    </div>
                    <div class="my-form ">
                        <input type="email" class="my-form-input" onChange={handleChange('email')} value={email} />
                        <label data-error="wrong" className={isFilled("email")} for="Form-email1">Your email</label>
                    </div>

                    <div class="my-form ">
                        <input type="password" class="my-form-input " onChange={handleChange('password')} value={password} />
                        <label className={isFilled("password")} data-error="wrong" for="Form-pass1">Your password</label>
                    </div>

                    <div className="row JCC">
                        <div type="button" class="btn signin-button" onClick={handleSubmit}>Sign Up</div>
                    </div>
                </div>
                <div className="signin-footer">
                    <div className="text-center no-have-account">
                        Already have account?
                    </div>
                    <div className="text-center sign-up-link pointer" onClick={flipVisibility}>
                        Sign In
                    </div>
                </div>
            </form>
        )
    }


    return visible === 1 && (
        <div className={`signin-container signup-cont`}>
            {showForm()}
        </div>
    )
}

export default SignUp
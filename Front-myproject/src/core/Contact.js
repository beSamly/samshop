import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import { getCategories } from "./apiCore";
import { getCart } from "./cartHelpers";
import NavCartItem from "./NavCartItem";
import Card2 from "./Card2";
import Footer from "./Footer";

const Contact = () => {
    const showContactForm = () => {
        return (
            <section class="my-5">

                <h2 class="h1-responsive font-weight-bold text-center my-5">Contact me</h2>
                <p class="text-center w-responsive mx-auto mb-5"></p>

                <div class="row justify-content-center">
                    <div class="col-md-9 mb-md-0 mb-5">
                        <form>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="contact-name" class="form-control" />
                                        <label for="contact-name" class="" style={{color:'black'}}>Your name</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="contact-email" class="form-control" />
                                        <label for="contact-email" class="" style={{color:'black'}}>Your email</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="md-form mb-0">
                                        <input type="text" id="contact-Subject" class="form-control" />
                                        <label for="contact-Subject" class="" style={{color:'black'}}>Subject</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="md-form">
                                        <textarea id="contact-message" class="form-control md-textarea" rows="3"></textarea>
                                        <label for="contact-message" style={{color:'black'}}>Your message</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="text-center text-md-left">
                            <a class="btn btn-primary btn-md">Send</a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const showProfile = () => {
        return (
            <section class="text-center my-5">
                <h2 class="h1-responsive font-weight-bold my-5">About Me</h2>
                <div class="wrapper-carousel-fix">
                    <div id="carousel-example-1" class="carousel no-flex testimonial-carousel slide carousel-fade" data-ride="carousel"
                        data-interval="false">
                        <div class="carousel-inner" role="listbox">
                            <div class="carousel-item active">
                                <div class="testimonial">
                                    <div class="avatar mx-auto mb-4">
                                        <img src="/img/sam-profile1.jpg" class="rounded-circle img-fluid"
                                            alt="First sample avatar image"/>
                                    </div>
                                    <p>
                                        <i class="fas fa-quote-left"></i> 
                                        Please give me some feedback about UI, UX or my photo, whatever.
                                        Thank you a lot for visiting my website!!
                              </p>
                                    <h4 class="font-weight-bold">Sam Lee</h4>
                                    <h6 class="font-weight-bold my-3">Student at RMIT Vietnam</h6>
                                    <h6 class="font-weight-bold my-3">Aspiring Software Engineer</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        )
    }

    return (
        <div className="row contact-background-img">
            <div className="col-7">
                {showContactForm()}
            </div>
            <div className="col-5">
                {showProfile()}
            </div>
        </div>
    )
}

export default Contact
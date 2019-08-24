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

                <h2 class="h1-responsive font-weight-bold text-center my-5">Contact us</h2>
                <p class="text-center w-responsive mx-auto mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam
    eum porro a pariatur veniam.</p>

                <div class="row justify-content-center">
                    <div class="col-md-9 mb-md-0 mb-5">
                        <form>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="contact-name" class="form-control" />
                                        <label for="contact-name" class="">Your name</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="contact-email" class="form-control" />
                                        <label for="contact-email" class="">Your email</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="md-form mb-0">
                                        <input type="text" id="contact-Subject" class="form-control" />
                                        <label for="contact-Subject" class="">Subject</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="md-form">
                                        <textarea id="contact-message" class="form-control md-textarea" rows="3"></textarea>
                                        <label for="contact-message">Your message</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="text-center text-md-left">
                            <a class="btn btn-primary btn-md">Send</a>
                        </div>
                    </div>
                    {/* <div class="col-md-3 text-center">
                        <ul class="list-unstyled mb-0">
                            <li>
                                <i class="fas fa-map-marker-alt fa-2x blue-text"></i>
                                <p>San Francisco, CA 94126, USA</p>
                            </li>
                            <li>
                                <i class="fas fa-phone fa-2x mt-4 blue-text"></i>
                                <p>+ 01 234 567 89</p>
                            </li>
                            <li>
                                <i class="fas fa-envelope fa-2x mt-4 blue-text"></i>
                                <p class="mb-0">contact@example.com</p>
                            </li>
                        </ul>
                    </div> */}
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
                                        Please give me some feedback about anything like "I love you, Sam", "I want to hire you" whatever.
                                        For sending feedback to me, fill out form right next to here, and click send button.
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
        <div className="row">
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
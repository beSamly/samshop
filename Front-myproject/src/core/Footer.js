import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Footer = () => {
    const init = () => {
    }

    useEffect(() => {
        init();
    }, [])
    return (
        <div class="">
            <footer class="page-footer font-small stylish-color-dark pt-4">
                <div class="container text-center text-md-left">
                    <div class="row">
                        <div class="col-md-4 mx-auto">
                            <h5 class="font-weight-bold text-uppercase mt-3 mb-4">For website production</h5>
                            <p>Sam lee</p>
                            <p>E-mail : besamly2018@gmail.com</p>
                            <p>LinkedIn : <a style={{color:'blue'}} href="#www.linkedin.com/in/besamly2018">www.linkedin.com/in/besamly2018</a></p>
                        </div>
                        <hr class="clearfix w-100 d-md-none" />
                        <div class="col-md-2 mx-auto">
                            <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>
                            <ul class="list-unstyled">
                                <li>
                                    <a href="#!">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!">Link 4</a>
                                </li>
                            </ul>
                        </div>
                        <hr class="clearfix w-100 d-md-none" />
                        <div class="col-md-2 mx-auto">
                            <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>

                            <ul class="list-unstyled">
                                <li>
                                    <a href="#!">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!">Link 4</a>
                                </li>
                            </ul>
                        </div>
                        <hr class="clearfix w-100 d-md-none" />
                        <div class="col-md-2 mx-auto">
                            <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>
                            <ul class="list-unstyled">
                                <li>
                                    <a href="#!">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!">Link 4</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            
                <ul class="list-unstyled list-inline text-center">
                    <li class="list-inline-item">
                        <a class="btn-floating btn-fb mx-1">
                            <i class="fab fa-facebook-f"> </i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-tw mx-1">
                            <i class="fab fa-twitter"> </i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-gplus mx-1">
                            <i class="fab fa-google-plus-g"> </i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-li mx-1">
                            <i class="fab fa-linkedin-in"> </i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a class="btn-floating btn-dribbble mx-1">
                            <i class="fab fa-dribbble"> </i>
                        </a>
                    </li>
                </ul>
            </footer>
        </div>

    )
}

export default Footer
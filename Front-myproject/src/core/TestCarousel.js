import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import { API } from '../config'
import $ from 'jquery';

const TestCarousel = ({ item, url = "product", forWhat }) => {

    const init = () => {
        fetch(`${API}/product/numberOfPhoto/${item._id}`).then(res =>
            res.json()
        ).then(res => { setNumberOfPhoto(res) })
    }
    const [numberOfPhoto, setNumberOfPhoto] = useState(0)

    useEffect(() => {
        init()
    }, [])

    const showImages = () => {
        var arr = []
        for (var i = 0; i < numberOfPhoto; i++) {
            arr.push(
                <div class={i === 0 ? "carousel-item active" : "carousel-item"}>
                    <img class="d-block w-100" src={`${API}/${url}/photo/${item._id}/${i}`}
                        alt="Second slide" />
                </div>
            )
        }
        return arr
    }

    const showThumbNail = () => {

        var arr = []
        for (var i = 0; i < numberOfPhoto; i++) {
            arr.push(
                <li data-target="#carousel-thumb" data-slide-to={`${i}`} class="">
                    <img class="d-block w-100" src={`${API}/${url}/photo/${item._id}/${i}`}
                        alt="Second slide" />
                </li>
            )
        }
        return arr
    }
    const showCarousel = () => {
        return (
            <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails" data-ride="carousel">
                <div class="carousel-inner" role="listbox">
                    {showImages()}
                </div>
                <a class="carousel-control-prev" href="#carousel-thumb" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel-thumb" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
                <ol class="carousel-indicators">
                    {showThumbNail()}
                </ol>
            </div>
        )
    }


    return (
        <div >
            {showCarousel()}
        </div>
    )



}

export default TestCarousel
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import { API } from '../config'

const ShowImage = ({ item, url, forWhat }) => {

    const photosize = {
        width: 200,
        height: 220
    }
    const init = () => {

    }

    useEffect(() => {
        init()
    }, [])
    console.log("what is itme :", item)
    console.log("item.photos :", item.photos)
    var numberOfPhoto = item ? item.photos.length : 0

    const carouselPhoto = () => {
        let arr = []
        for (let i = 0; i < numberOfPhoto; i++) {
            if (i === 0) {
                arr.push(
                    <div class="carousel-item active">
                        <img class="d-block w-100 image" src={item.photos[i].image_url}
                            alt="Second slide" />
                    </div>
                )
            } else {
                arr.push(
                    <div class="carousel-item">
                        <img class="d-block w-100 image" src={item.photos[i].image_url}
                            alt="Second slide" />
                    </div>
                )
            }
        }
        return arr
    }

    const carouselRoundButton = () => {
        let arr = []
        for (let i = 0; i < numberOfPhoto; i++) {
            if (i === 0) {
                arr.push(
                    <li data-target="#carousel-example-1z" data-slide-to={`${i}`} class="active"></li>
                )
            } else {
                arr.push(
                    <li data-target="#carousel-example-1z" data-slide-to={`${i}`} ></li>
                )
            }
        }
        return arr
    }

    const corouselId = `${forWhat}-${item._id}`
    const carousel = () => {
        return (
            <div id={corouselId} class="carousel slide carousel" data-ride="carousel" data-interval="5000">
                <ol class="carousel-indicators">
                    {carouselRoundButton()}
                </ol>
                <div class="carousel-inner" role="listbox">
                    {carouselPhoto()}
                </div>
                <a class="carousel-control-prev" href={`#${corouselId}`} role="button" data-slide="prev">
                    <i class="fas fa-angle-left fa-3x" style={{ color: 'rgb(179, 179, 192)' }}></i>
                </a>
                <a class="carousel-control-next" href={`#${corouselId}`} role="button" data-slide="next">
                    <i class="fas fa-angle-right fa-3x" style={{ color: 'rgb(179, 179, 192)' }}></i>
                </a>
            </div>
        )
    }

    return (
        <div>
            {carousel()}
        </div>
    )
}

export default ShowImage
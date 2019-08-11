import React, { useState, useEffect } from "react";
import { getCategories } from "./apiCore";
import prices from "./fixedPrice.js"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const PageButton = ({ myFilters, count, handleFilters }) => {

  

    const init=()=>{
        if(count!==0){
            var a = (myFilters.skip/myFilters.limit) +1
            var b= document.querySelector(`.page-button-${a}`)
            var allPageButton = document.querySelectorAll('.page-button')
            allPageButton.forEach((c)=>{
                c.classList.remove('page-button-active')
            })
            b.classList.add('page-button-active')
        }
    }

    useEffect(()=>{
        init()
    })

    const handleClick = (filterBy) => (e) => {
        const pageNumber = e.target.title
        handleFilters(pageNumber, filterBy)
    }

    const showPageButton = () => {

        let pageNumberNeeded = Math.ceil(count / myFilters.limit)
        var returnArr = []

        for (var i = 1; i <= pageNumberNeeded; i++) {
            returnArr.push(
                <div className={`page-button page-button-${i}`} onClick={handleClick('skip')} title={i}>
                    {i}
                </div>
            )
        }
        return (
            <div className="col-9 row align-items-center justify-content-end page-button-container">
                {returnArr}
            </div>
        )
    }

    return (
        <div className="row justify-content-center">
            {showPageButton()}
        </div>
    );
}

export default PageButton                                
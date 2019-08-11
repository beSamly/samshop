import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getCategories } from "./apiCore";
import prices from "./fixedPrice.js"

// Filter based on : price, numberofreview?
const Filter = ({ category, handleFilters }) => {
    const [categories, setCategories] = useState([]);

    const init = () => {
        getCategories().then(data => setCategories(data))
    }

    useEffect(() => {
        init()
    }, [])

    const handleClick = (filterTarget) => (e) => {
        let newValue = e.target.title
        console.log("what is newValue : ", newValue, filterTarget)
        handleFilters(newValue, filterTarget)

        e.target.querySelector('i').classList.toggle('filter-checkbox-active')
    }

    const showCategory = () => {
        return (
            <div className="filter category-filter row">
                Category<i class="fas fa-angle-down fa-1x ml-1"></i>
                <div className="filter-dropdown category-filter-dropdown">
                    {categories.map((c) =>
                        <Link to={'/products?p=1'}>
                            <div className="category-filter-dropdown-item dropdown-item" title={c._id} onClick={handleClick("category")}>
                                {c.name}
                                <i class="fas fa-check filter-checkbox"></i>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        )
    }

    const showPriceRange = () => {
        return (
            <div className="filter price-filter row">
                Price<i class="fas fa-angle-down fa-1x ml-1"></i>
                <div className="filter-dropdown price-filter-dropdown">
                    {prices.map((c) =>
                        <div className="price-filter-dropdown-item dropdown-item" title={c._id} onClick={handleClick("price")}>
                            {c.name}
                            <i class="fas fa-check filter-checkbox"></i>
                        </div>)}
                </div>
            </div>
        )
    }

    const showByRate = () => {
        return (
            <div className="filter rate-filter row align-items-center" title="totalRate" onClick={handleClick('sortBy')}>
                Highest Review<i class="fas fa-angle-down fa-1x ml-1"></i>
            </div>
        )
    }

    const showByCreatedAt = () => {
        return (
            <div className="filter createdAt-filter row align-items-center" title="createdAt" onClick={handleClick('sortBy')}>
                Newest<i class="fas fa-angle-down fa-1x ml-1"></i>
            </div>
        )
    }

    return (
        <div>
            <div className="row justify-content-center my-3">
                <div className="col-8 row">
                    {showCategory()}
                    {showPriceRange()}
                    {showByRate()}
                    {showByCreatedAt()}
                </div>
            </div>
        </div>
    )
}

export default Filter
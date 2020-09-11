import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getCategories } from "./apiCore";
import prices from "./fixedPrice.js"
import ReactDOM from "react-dom";

// Filter based on : price, numberofreview?
const Filter = ({ myFilters, handleFilters }) => {
    const [categories, setCategories] = useState([]);

    const init = () => {

        // initCategoryFilter()
        // initPriceFilter()
        if (categories.length === 0) {
            getCategories().then(data => setCategories(data))
        }
        initFilterActive()

    }

    useEffect(() => {
        init()
    })

    const initFilterActive = () => {
        var testArr = []

        if (myFilters.category.length !== 0) {
            testArr = testArr.concat(myFilters.category)
        }

        if (myFilters.price.length !== 0) {
            var array = myFilters.price.map((c) => {
                return getPriceId(c['greaterThan'], c['lessThan'])
            })
            testArr = testArr.concat(array)
        }

        var dropDownItem = document.querySelectorAll('.dropdown-item')
        dropDownItem.forEach((c) => {
            var checkboxIcon = c.querySelector('i')
            checkboxIcon.classList.remove("filter-checkbox-active")
        })

        dropDownItem.forEach((c) => {
            if (testArr.includes(c.title)) {
                var checkboxIcon = c.querySelector('i')
                checkboxIcon.classList.add("filter-checkbox-active")
            }
        })
    }

    const initCategoryFilter = () => {
        var categoriesFilterItem = document.querySelectorAll('.category-filter-dropdown-item')
        var dropDownItem = document.querySelectorAll('.dropdown-item')
        console.log("dropDownItem : ", dropDownItem)

        console.log("categoriesFilterItem : ", categoriesFilterItem)
        if (categoriesFilterItem.length === 0) {
            getCategories().then(data => setCategories(data))
        }

        if (categoriesFilterItem.length !== 0) {
            // Delete all active class first
            categoriesFilterItem.forEach((c) => {
                var checkboxIcon = c.querySelector('i')
                checkboxIcon.classList.remove("filter-checkbox-active")
            })

            categoriesFilterItem.forEach((c) => {
                if (myFilters.category.includes(c.title)) {
                    // add active cl"ass c['graeterThan']
                    var checkboxIcon = c.querySelector('i')
                    checkboxIcon.classList.add("filter-checkbox-active")
                }
            })
        }
    }

    const initPriceFilter = () => {
        var priceFilterItem = document.querySelectorAll('.price-filter-dropdown-item')
        if (priceFilterItem.length !== 0) {
            var array = myFilters.price.map((c) => {
                return getPriceId(c['greaterThan'], c['lessThan'])
            })

            priceFilterItem.forEach((c) => {
                var checkboxIcon = c.querySelector('i')
                checkboxIcon.classList.remove('filter-checkbox-active')
            })

            priceFilterItem.forEach((c) => {
                if (array.includes(JSON.parse(c.title))) {
                    var checkboxIcon = c.querySelector('i')
                    checkboxIcon.classList.add('filter-checkbox-active')
                }
            })
        }
    }

    const getPriceId = (greaterThan, lessThan) => {
        var priceId = undefined
        prices.forEach((c) => {
            if (c.array['greaterThan'] === greaterThan && c.array['lessThan'] === lessThan) {
                priceId = c._id
            }
        })
        return JSON.stringify(priceId)
    }

    const handleClick = (filterTarget) => (e) => {
        let newValue = e.target.title
        handleFilters(newValue, filterTarget)
    }

    const showCategory = () => {
        return (
            <div className="filter category-filter row">
                <i class="fas fa-tags mx-1"></i>
                Category
                <i class="fas fa-angle-down fa-1x ml-1"></i>
                <div className="filter-dropdown category-filter-dropdown">
                    {categories.map((c) =>
                        <div className="category-filter-dropdown-item dropdown-item waves-effect" title={c._id} onClick={handleClick("category")}>
                            {c.name}
                            <i class="fas fa-check filter-checkbox"></i>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const showPriceRange = () => {
        return (
            <div className="filter price-filter row">
                <i class="fas fa-comment-dollar mx-1"></i>
                Price
                <i class="fas fa-angle-down fa-1x ml-1"></i>
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
                <i class="far fa-thumbs-up mx-1"></i>
                Highest Rate<i class="fas fa-angle-down fa-1x ml-1"></i>
            </div>
        )
    }

    const showByCreatedAt = () => {
        return (
            <div className="filter createdAt-filter row align-items-center" title="createdAt" onClick={handleClick('sortBy')}>
                <i class="fab fa-angellist mx-1"></i>
                Newest<i class="fas fa-angle-down fa-1x ml-1"></i>
            </div>
        )
    }

    return categories.length !== 0 ? (
        <div className="row justify-content-center my-3">
            {showCategory()}
            {showPriceRange()}
            {showByRate()}
            {showByCreatedAt()}
        </div>
    ) : ""
}

export default Filter
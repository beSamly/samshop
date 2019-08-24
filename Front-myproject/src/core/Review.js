import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import { read } from "../user/apiUser"
import { createReview, updateReview, deleteReview } from "./apiCore"

const Review = ({ reviews, product }) => {

    const [reviewByUser, setReviewByUser] = useState({
        comment: "",
        rating: "",
        reviewer: "",
        updateOrNew: "new"
    })
    const [right, setRight] = useState()
    const [user, setUser] = useState()
    const [values, setValues] = useState({
        limit: 7,
        skip: 0
    })


    const userId = isAuthenticated() && isAuthenticated().user._id
    const userToken = isAuthenticated() && isAuthenticated().token

    useEffect(() => {
        !user && userId && userToken && read(userId, userToken).then(user => {
            setUser(user)
        })
        if (user) {
            setRight(false)
            findReviewByUser()
            rightToCreateReview()
        }
        resetPageButtonActive()
        // document.querySelector('.review-form-box').addEventListener('mouseover',()=>{
        //     alert("?")
        // })
    }, [user, reviews, values.skip])

    const resetPageButtonActive = () => {
        if (reviews.length !== 0) {
            var currentPage = (values.skip / values.limit) + 1
            var allPageButton = document.querySelectorAll('.review-page-button')
            allPageButton.forEach((c) => {
                c.classList.remove('review-page-button-active')
            })
            document.querySelector(`.review-page-button-${currentPage}`).classList.add('review-page-button-active')

        }
    }

    const findReviewByUser = () => {
        var reviewFound = undefined
        reviews.map((c) => {
            if (c.reviewer && c.reviewer._id === user._id) {
                reviewFound = c
            }
        })

        if (reviewFound) {
            setReviewByUser({ ...reviewFound, updateOrNew: "update" })
        } else {
            setReviewByUser({
                comment: "",
                rating: "",
                reviewer: user._id,
                updateOrNew: "new"
            })
        }
    }

    const rightToCreateReview = () => {
        user.history.map((eachHistory) => {
            eachHistory.products.map((eachProductPurchased) => {
                if (eachProductPurchased.product._id === product._id) {
                    setRight(true)
                }
            })
        })
    }

    // submit review to serevr
    const handleSubmit = (doWhat) => (e) => {
        if (doWhat === "create") {
            console.log("craete fucntion")
            createReview(reviewByUser, product._id)
        }
        if (doWhat === "delete") {
            deleteReview(product._id, user._id)
        }
        if (doWhat === "update") {
            updateReview(product._id, user._id, reviewByUser)
        }
    }

    const handleChange = (target) => (e) => {
        setReviewByUser({ ...reviewByUser, [target]: e.target.value })
    }

    const showAlertMessage = (doWhat) => {
        if (doWhat === 'update') {
            return (
                <div className="review-alert-message">
                    <div>You have already left comment on this product!</div>
                </div>
            )
        }
        if (doWhat === 'create') {
            return (
                <div className="review-alert-message">
                    <div>You have purchased this product. you can leave comment! </div>
                </div>
            )
        }


    }

    const showReviewForm = () => {
        // var returnArr = []
        if (right && reviewByUser.updateOrNew === "update") {
            return (
                <form className="form-control"  >
                    {showAlertMessage("update")}
                    {showRatingScore()}
                    <div className="row align-items-end">
                        <div className="col-8">
                            <label>Comment:</label>
                            <textarea rows="2" className="form-control" value={reviewByUser.comment} cols="45" name="description" placeholder="Comment..." onChange={handleChange('comment')} >
                            </textarea>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-primary px-2 py-1" onClick={handleSubmit("update")}>update</button>
                            <button className="btn btn-danger px-2 py-1" onClick={handleSubmit("delete")}>delete</button>
                        </div>
                    </div>
                </form>
            )
        }
        if (right && reviewByUser.updateOrNew === "new") {
            return (
                <form className="form-control" onSubmit={handleSubmit('create')} disabled >
                    {showAlertMessage("create")}
                    {showRatingScore()}
                    <div className="row align-items-end">
                        <div className="col-8">
                            <label>Comment:</label>
                            <textarea rows="2" className="form-control" value={reviewByUser.comment} cols="45" name="description" placeholder="Comment..." onChange={handleChange('comment')} >
                            </textarea>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-primary">submit</button>

                        </div>
                    </div>
                </form>
            )
        } else {
            return (
                <form className="form-control" onSubmit={handleSubmit} disabled >
                    {/* <div>{showRatingScore()}</div> */}
                    {showRatingScore()}
                    <div className="row align-items-end">
                        <div className="col-8">
                            <label>Comment:</label>
                            <textarea rows="2" cols="45" className="form-control" name="description" placeholder="Purchase before leaving comment..." disabled>
                            </textarea>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-primary" disabled>submit</button>
                        </div>
                    </div>
                </form>
            )
        }
    }

    const isChecked = (value) => {

        if (parseFloat(reviewByUser.rating) === value) {
            return "checked"
        }
        else {
            return ""
        }
    }

    const showRatingScore = () => {
        return (
            <div className="row align-items-center">
                <div className="col-12 ">
                    {/* <span>Rating:</span> */}
                    <fieldset class="rating" onChange={handleChange('rating')}>
                        <input type="radio" id="star5" name="rating" value="5" checked={isChecked(5)} /><label class="full" for="star5" title="Awesome - 5 stars"></label>
                        <input type="radio" id="star4half" name="rating" value="4.5" checked={isChecked(4.5)} /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                        <input type="radio" id="star4" name="rating" value="4" checked={isChecked(4)} /><label class="full" for="star4" title="Pretty good - 4 stars"></label>
                        <input type="radio" id="star3half" name="rating" value="3.5" checked={isChecked(3.5)} /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
                        <input type="radio" id="star3" name="rating" value="3" checked={isChecked(3)} /><label class="full" for="star3" title="Meh - 3 stars"></label>
                        <input type="radio" id="star2half" name="rating" value="2.5" checked={isChecked(2.5)} /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                        <input type="radio" id="star2" name="rating" value="2" checked={isChecked(2)} /><label class="full" for="star2" title="Kinda bad - 2 stars"></label>
                        <input type="radio" id="star1half" name="rating" value="1.5" checked={isChecked(1.5)} /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
                        <input type="radio" id="star1" name="rating" value="1" checked={isChecked(1)} /><label class="full" for="star1" title="Sucks big time - 1 star"></label>
                        <input type="radio" id="starhalf" name="rating" value="0.5" checked={isChecked(0.5)} /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                    </fieldset>
                </div>
            </div>
        )
    }

    const handleClick = (e) => {
        var limit = values.limit
        var pageNumberClicked = parseInt(e.target.title)
        console.log("pageNumberClicked : ", pageNumberClicked)

        var howManySkip = (pageNumberClicked - 1) * limit
        console.log("howManySkip : ", howManySkip)
        setValues({ ...values, skip: howManySkip })
    }

    const showPageButtonTest = () => {

        var length = reviews.length
        var limit = values.limit
        var skip = values.skip

        let pageNumberNeeded = Math.ceil(length / limit)
        var currentPage = (skip / limit) + 1

        var returnArr = []

        // case0 : when pageNeeded is less than 6
        if (pageNumberNeeded <= 6) {
            for (var i = 1; i <= pageNumberNeeded; i++) {
                returnArr.push(
                    <div className={`review-page-button review-page-button-${i}`} onClick={handleClick} title={i}>
                        {i}
                    </div>
                )
            }
        }

        // case1 : when current page is NOT last 2 pages
        if (currentPage < pageNumberNeeded - 2 && pageNumberNeeded > 6) {
            for (var i = currentPage - 1; i <= currentPage + 1; i++) {
                if (i > 0 && i <= pageNumberNeeded) {
                    returnArr.push(
                        <div className={`review-page-button review-page-button-${i}`} onClick={handleClick} title={i}>
                            {i}
                        </div>
                    )
                }
            }

            if (currentPage === 1) {
                returnArr.push(
                    <div className={`review-page-button review-page-button-3`} onClick={handleClick} title={3}>
                        {i}
                    </div>
                )
            }

            returnArr.push(
                <div className="page-dots-button">
                    ...
                </div>
            )

            for (var i = pageNumberNeeded - 1; i <= pageNumberNeeded; i++) {
                if (i > 0 && i <= pageNumberNeeded) {
                    returnArr.push(
                        <div className={`review-page-button review-page-button-${i}`} onClick={handleClick} title={i}>
                            {i}
                        </div>
                    )
                }

            }

        }
        // Case2:  when current page IS last 2 pages
        if (currentPage >= pageNumberNeeded - 2 && pageNumberNeeded > 6) {
            for (var i = 1; i <= 2; i++) {
                if (i > 0 && i <= pageNumberNeeded) {
                    returnArr.push(
                        <div className={`review-page-button review-page-button-${i}`} onClick={handleClick} title={i}>
                            {i}
                        </div>
                    )
                }
            }

            returnArr.push(
                <div className="page-dots-button" >
                    ...
                </div>
            )

            if (currentPage === pageNumberNeeded) {
                returnArr.push(
                    <div className={`review-page-button review-page-button-${pageNumberNeeded - 2}`} onClick={handleClick} title={pageNumberNeeded - 2}>
                        {pageNumberNeeded - 2}
                    </div>
                )
            }

            for (var i = currentPage - 1; i <= currentPage + 1; i++) {
                if (i > 0 && i <= pageNumberNeeded) {
                    returnArr.push(
                        <div className={`review-page-button review-page-button-${i}`} onClick={handleClick} title={i}>
                            {i}
                        </div>
                    )
                }
            }
        }
        return returnArr
    }

    const showAvatar = (name, reviewerId) => {
        var res = reviewerId.slice(2, 8)
        var matches = name.match(/\b(\w)/g); // ['J','S','O','N']
        var acronym = matches.join('').toUpperCase(); // JSON

        var bgColor = `#${res}`
        return (
            <div className="review-avatar" style={{ backgroundColor: bgColor }}>
                {acronym}
            </div>
        )
    }

    const showReview = () => {
        var length = reviews.length
        var limit = values.limit
        var skip = values.skip

        // let pageNumberNeeded = Math.ceil(reviews.length / limit)
        // var currentPage = (myFilters.skip / myFilters.limit) + 1
        var returnArr = []

        if (reviews.length !== 0) {
            var arr = reviews.map((c, index) => {
                if (c.reviewer && skip <= index && index < skip + limit) {
                    var star = Math.floor(c.rating)
                    var remaining = c.rating % 1 >= 0.5 ? 1 : 0
                    var starArr = []
                    for (var i = 0; i < star; i++) {
                        starArr.push(<i class="fas fa-star" style={{ color: '#f4c150' }}></i>)
                    }
                    if (remaining === 1) {
                        starArr.push(<i class="fas fa-star-half-alt" style={{ color: '#f4c150' }}></i>)
                    }
                    return (
                        <div className="review-box row align-items-center">
                            <div className="">
                                {showAvatar(c.reviewer.name, c.reviewer._id)}
                            </div>
                            <div className="col-10">
                                <div className="mb-2 row">
                                    <div className="mx-2">{c.reviewer.name}</div>
                                    <div className="mx-2">{starArr}</div>
                                    <div className="mx-2">({c.rating})</div>
                                </div>
                                <div>
                                    "{c.comment}"
                        </div>
                            </div>
                        </div>
                    )
                }
            })
            return arr
        } else {
            return (
                <div>No review yet </div>
            )
        }


    }

    return (
        <div>
            <div className="review-form-box" onMouseEnter={(e) => {
                var alertMessage = document.querySelector('.review-alert-message');
                alertMessage && (alertMessage.style.display = 'none')
            }} >
                {showReviewForm()}
                {console.log("Reviews : ", reviews)}
            </div>
            <div className="review-show-box">
                <div className="row justify-content-between align-items-center review-show-box-title">
                    <h4>Reviews</h4>
                    <div className="row">
                        {showPageButtonTest()}
                    </div>
                </div>
                {showReview()}
            </div>
        </div >
    )
}

export default Review
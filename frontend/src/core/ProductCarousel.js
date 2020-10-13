import React, { useState, useEffect } from "react";
import Card2 from "./Card2";
import Slider from "react-slick";

const ProductCarousel = ({ products = [], addToCartcallback }) => {

    const setting = {
        // infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4
    }

    const test = () => {
        var limit = 6
        return (
            <Slider {...setting}>
                {products.map((c, index) => {
                    if (index < limit) {
                        return (
                                <Card2 product={products[index]} index={index} addToCartcallback={addToCartcallback} />
                        )
                    }
                })}
            </Slider>
        )
    }

    return products.length !== 0 && (
        <div className="mx-5 py-5 clearfix">
            <h3>Featured Products</h3>
            {test()}
        </div>
    )
}

export default ProductCarousel
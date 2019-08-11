import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const ProductDetail = (props) => {
    const [product, setProduct] = useState();
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);


    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };
    return (
        <Layout>
            <div className="row">
                <div className="col-7">
                    <Card product={product} />
                </div>
                <div className="col-5"></div>
            </div>
            <div className="row">
            {relatedProduct.map((c)=> <div className="col-2"><Card product={c}/></div>)}
            </div>

        </Layout>
    )
}
export default ProductDetail
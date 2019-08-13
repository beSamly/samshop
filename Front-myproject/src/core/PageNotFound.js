import React, { useState, useEffect } from "react";
import Layout from "./Layout";

const mystyle = {
    height:600,
  };

const PageNotFound = ({ location, history }) => {
    return (
        <Layout>
            <div className="row justify-content-center">
                 <img src="/img/pageNotFound.jpg" style={mystyle}/>
            </div>
        </Layout>
    )
}

export default PageNotFound
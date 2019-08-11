import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const Loader = ({loading}) => {
    return (
        <div style={{ display: loading ? "" : "none" }} class="loading row justify-content-center align-items-center mx-0" >
            <div class="spinner-border text-info" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
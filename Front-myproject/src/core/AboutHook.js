import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import Layout from "./Layout";
import Card from "./Card";
import prices from "./fixedPrice.js"
import PageButton from "./PageButton";
import queryString from 'query-string';
import { getFilteredProducts } from './apiCore'

import Filter from "./Filter2";
import AboutHookSub from "./AboutHookSub";

const AboutHook = ({ location }) => {

    const [test, setTest] = useState({
        number:0,
        category:[]
    });
   
    const [size, setSize] = useState(1);
    const [received, setReceived] = useState();
    // alert("this rerender?")

    useEffect(() => {
        console.log("use Effect")
        alert("useEffect in abouthook")
    })
  

    const loadMore=()=>{
        console.log("in load more: ", size, test)
    }

    const loadFilteredResults = () => {
        getFilteredProducts().then(data => {
            if (data.error) {
            } else {
                setReceived("yes received!")
            }
        });
    };

    const testClick=()=>{
        
        // setStatus(status) => updating value with its own value does not work!!!!

        // COPY STATE => this case works
        var testCopy={}
        for(let key in test){
            testCopy[key]=test[key]
        }
        console.log("what is test before: ", test)
        console.log("what is testCopy before : ", testCopy)

        testCopy['number']=testCopy['number']+1
        testCopy['category'].push(10)

        console.log("what is test after: ", test)
        console.log("what is testCopy after : ", testCopy)

        // console.log("what is testCopy : ", testCopy)
        // this case does not work : a is test itself and updating test with itself does not work
        // var a = test
        // a['number']=10
        // console.log("whatis test : ", test)
        // console.log("whatis a : ", a)

        setSize(size+1)
        setTest(testCopy)
        loadFilteredResults()

        loadMore()
    }

    const testClick2=()=>{
        var a = size+1
        setSize(a)
    }


    return(
        <div>
            {console.log("rerender")}
            <div onClick={testClick}>testClick1</div>
            <div onClick={testClick2}>testClick2</div>
            <AboutHookSub size={10}/>
        </div>
    )
}

export default AboutHook

// setState trigger always at the end of function and 
// if there are multiple setState in one function it only rerender once, not multiple times

// useState is like constructor. it happens very beginning
// useEffect with empty [] => just like componentDidAmount
// useEffect with scope => both componentDidMount and Update : when state in scope is updated 
// useEffect trigger

// Redirect do not mount component again bur rerender
// useEffect happen

// render fisrt(component mount)=> useEffect => init & setState => render
// render fisrt(component mount)=> useEffect => init & setState => render // this should be lifecycle design

//history push also rerender

// child componenet also rerender when parent component rerender
// when useEffect is empty => it works everytime it render <= this is so wrong
// useEffect is empty => useEffect is triggered when there is any change on anything
// actually this is not so wrong but so true. 
// because useEffect trigger means that some value is updated. if to u

// always render => useEffect(componentDidMount) => (buttonClick)setState => re-render => useEffect(becuz setState)
// empty useEffect trigger everytime render everytime render mean everytime setState happen too

// setState does not happen and does not rerender when it gets same value so when it does not update

// rerender and useEffect(componentDidMount) is totally different
// becuz it rerender does not mean it is mounted again
// mount => render =>(can be rerender by setState) this process can be componentUpdate => rerender=>useEffect
// when useEffect's update array is empty, it only happens when it is mounted, not when it is rerender
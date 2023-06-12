/**
 * Database page
 * CSS by Boostrap 5.0
 * provides search and fitler functionalities
 * Author: Ruize Li
 */
import React, { useState, useEffect, Component } from "react";
import Highlighter from "react-highlight-words";
import './style.css'



// display search results
function DisplaySearchRes(props) {
    console.log("reached?")
    let items = props.data;
    let query = props.query;
    const [displayRes, setDisplayRes] = useState([]);
    const [resCount, setResCount] = useState(0);
    
    

    // when data changes, re-render the lists
    useEffect(() => {
        // get the ids, keywords, fNames
        let ids = Object.keys(items).map((val) => items[val]['issue_time']);
        let keywords = Object.keys(items).map((val) => items[val]['content']);
        let fNames = Object.keys(items).map((val) => items[val]['issue_name']);
        let temp = [];

        console.log(query);
        
        // generate items for display
        for (let i = 0; i < keywords.length; i++) {
            temp.push(
            <div key = {ids[i]} className = "d-flex justify-content-between" style = {{paddingBottom: 1.5 + 'em'}}>
                <div className = "d-flex justify-content-start">
                    <h5>{fNames[i]}</h5>
                </div>
                <div style = {{paddingRight: 2+ 'em'}}></div>
                    <div className="d-flex  align-items-around">{<Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={ query.split(' ') }
                        autoEscape={true}
                        textToHighlight= { keywords[i].slice(0-20) }
                        //keywords[i].indexOf(query[0]) < 25 ? keywords[i].indexOf(query[0]) : 0, keywords[i].length < 25+ keywords[i].indexOf(query[0]) ? keywords[i].length:25+ keywords[i].indexOf(query[0])
                    />}</div>
            </div>);
        }
            
    
        // update search result counts
        setResCount(temp.length);
        // update the searched content for display
        setDisplayRes(temp);
     }, [items])

    return (
        <div className="container">
        <h2> {resCount} Results found..</h2>
            
                { displayRes.length > 0 ? displayRes : null }
        
        </div>
    );
}



const Search = () => {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');

    // on click: query the data
    //  store them in state
    let getData = (e) => {
        // prevent button from refreshing the page
        e.preventDefault();
        // if empty query keywords, do not query db
        if (query === '') {
            alert('empty keywords!');
            setResult(null);
        }
        // query database with the key words input
        fetch('http://localhost:5000/search?keywords=' + query.replaceAll(' ', '-'))
            .then(response => {
                if (response.ok) {
                    console.log('response ok');
                    console.log(response.json())
                    return response.json();
                  } else {
                    //   console.log(response.status);
                    throw new Error('fetch failed');
                  }
            })
            .then(data => {
                if (data === 'error') throw new Error('invalid keywords');
                // console.log(data);
                setResult(data);
            })
            .catch(err => console.log(err))
    };

    // handle input change
    let handleInputChange = (e) => { setQuery(e.target.value)}


    return (
        <form>
            <h4>Input keywords, separated by ' ', and press <code>Enter</code></h4>
            <div className = "d-flex justify-content-between">
            
                <input className="form-control" type = 'text' placeholder="Search for..." onChange={ handleInputChange }/>  
                <button className="btn btn-primary" onClick = { getData } > Search </button>

            </div>
            { result && <DisplaySearchRes data = { result } query = {query}  />}
        </form> 
    );
}


function Database() {
    return (
        <div className="container">
            <Search />
        </div>
    );
}


export default Database;
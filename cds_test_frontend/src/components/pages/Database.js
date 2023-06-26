/**
 * Database page
 * CSS by Boostrap 5.0
 * provides search and fitler functionalities
 * Author: Ruize Li
 */
import React, { useState, useEffect, Component } from "react";
import Highlighter from "react-highlight-words";
import { Link } from 'react-router-dom';
import './style.css' 



// display search results

function DisplaySearchRes(props) {
    const items = props.data;
    const query = props.query;
    const keywords = query.split(' ');
    let displayRes = [];
    let start = -1
    let end = -1
    
    // Iterate over items object
    for (let key in items) {
        const item = items[key];

        //boundaries for highlighted text
        for (let i in keywords){
            const keywordIndex = item.content.indexOf(keywords[i]);
            
            if (keywordIndex !== -1){
                
                start = Math.max(0, keywordIndex - 25);
                end = Math.min(item.content.length, keywordIndex + keywords[i].length + 25);
                break;
            }   
        }
    

        //const urlPath = item.file_path.replace('test_data', '').replace(/\\\\/, '/').replace("txt","jpg");
        displayRes.push(
            <tr key={item.id}>
                <a href={`http://localhost:3000/book/${item.issue_name}/page/${item.page_num}`}>
                    <div style={{ width: '108px', height: '72px' }}>
                        <img
                            src={`http://localhost:5000/fetch_file/${item.file_path}`}
                            alt="Image"
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                    </div>
                </a>
                <td>
                    <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={ query.split(' ') }
                        autoEscape={true}
                        textToHighlight={item.content.slice(start, end)}  // Adjust this as needed
                    />
                </td>
            </tr>
        );
    }
    
    return (
        <div className="container">
            <h2> {displayRes.length} Results found</h2>
            {/*doesn't render table header when there's no results*/} 
            {displayRes.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Issue Name</th>
                        <th>Content</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayRes}
                    </tbody>
                </table>
            )}
        </div>
    );
}



const Search = () => {
    const [query, setQuery] = useState('');
    //middleware for query to prevent re-rendering
    const [submittedQuery, setSubmittedQuery] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState(''); 
    



    const getData = async (e) => {
        e.preventDefault();
        setSubmittedQuery(query);
        


        const trimmedQuery = query.trim(); 
        if (trimmedQuery === '') {
            alert('empty keywords!');
            return; 
        }
        try {
            const response = await fetch(`http://localhost:5000/database/search?keywords=${trimmedQuery.replaceAll(' ', '-')}`);
            if (!response.ok) {
                throw new Error('fetch failed');
            }

            const data = await response.json();
            if (data === 'error') {
                throw new Error('invalid keywords');
            }
            sessionStorage.setItem('leftSearchPage', 'true');
            sessionStorage.setItem('searchResults', JSON.stringify(data));
            sessionStorage.setItem('searchQuery', JSON.stringify(query));

            setResult(data);
            setError('');  
        } catch (err) {
            console.error(err);
            setError(err.message); 
            setResult(null); 
        }
    };
    
    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    return (
        <form onSubmit={getData}>
            <h4>Search through all of our collections</h4>
            <div className = "d-flex justify-content-between">
                <input className="form-control" type='text' placeholder="Search for..." onChange={handleInputChange}/>  
                <button className="btn btn-primary" type="submit"> Search </button>
            </div>
            {error && <p>Error: {error}</p>}
            {!result && JSON.parse(sessionStorage.getItem('searchResults')) &&
            <DisplaySearchRes data={JSON.parse(sessionStorage.getItem('searchResults'))} 
            query={JSON.parse(sessionStorage.getItem('searchQuery'))} />}
            {result && <DisplaySearchRes data={result} query={submittedQuery} />}
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
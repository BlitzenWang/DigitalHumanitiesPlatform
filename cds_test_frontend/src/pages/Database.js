/**
 * Database page
 * CSS by Boostrap 5.0
 * provides search and fitler functionalities
 * Author: Ruize Li
 */
import React, { useState, useEffect, Component } from "react";
import Highlighter from "react-highlight-words";
import { Link } from 'react-router-dom';
import './style.css';
import SideBar from "../components/SideBar";
import PaginationBar from '../components/PaginationBar';


// display search results

function DisplaySearchRes(props) {

    const items = props.data;
    const query = props.query;
    const totalResults = props.totalResults;  // This prop needs to be passed to DisplaySearchRes
    const keywords = query.split(' ');
    let displayRes = [];
    let start = -1;
    let end = -1;
    
    
    
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
            <ResultItem
                key={item.id}
                file_path={item.file_path}
                page_name={item.page_name}
                keywords={keywords}
                highlighted_text={item.content.slice(start, end)}
            />
        );
    }
    
    


    return (
        <div style={{ flex: 3 }} className="search-result-container">
            {/*doesn't render table header when there's no results*/} 
            {displayRes.length > 0 && (displayRes)}
        </div>
    );
}

const ResultItem = ({ file_path, page_name, keywords, highlighted_text }) => {
    const magazineNameMap = {
        "RMHB": "人民画报",
        "JFJHB": "解放军画报",
        "MZHB": "民族画报"
    }
    const info = page_name.split("_");
    const issue_name = magazineNameMap[info[0]];
    const year = info[1];
    const issue_number = parseInt(info[2]);
    const page_num = info[3];


    return (
        <div className="search-result-item">
            <div className="search-result-image-frame">
                <a href={`/book/${info[0]}/page/${page_num}`}>
                <img className="search-result-image"
                src={`http://localhost:5000/fetch_file/${file_path}`}
                alt="Image"/>
            </a>
            </div>
            
            <div className="search-result-text-frame">
                <div className="search-result-header-frame">
                    <a href={`/Gallery/${info[0]}`}>
                        <div className="search-result-magazine-name">{issue_name}</div>
                    </a>
                    <div className="search-result-magazine-info"> {year} · issue {issue_number} · Page {page_num}</div>
                </div>
                <div className="search-result-highlighted-text">
                    <Highlighter
                        highlightClassName="search-result-highlight-class"
                        searchWords={keywords}
                        autoEscape={true}
                        textToHighlight={highlighted_text}
                    />
                </div>
            </div>
        </div>
    );
}


const Search = () => {
    const [query, setQuery] = useState('');
    //middleware for query to prevent re-rendering
    const [submittedQuery, setSubmittedQuery] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState(''); 
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMagazine, setSelectedMagazine] = useState("default");
    const [startTime, setStartTime] = useState('1950');
    const [endTime, setEndTime] = useState('1970');
    const [totalResults, setTotalResults] = useState(0);
    const [selectMode, setSelectMode] = useState(false);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const years = Array.from({ length: 21 }, (_, index) => 1950 + index);

    const pageSize = 20;
    
    useEffect(() => {
        if (submittedQuery !== '') {
            getData(currentPage, selectedMagazine, startTime, endTime);
        }
    }, [currentPage, submittedQuery]);


    const getData = async (page) => {
        const trimmedQuery = submittedQuery.trim();
        const params = new URLSearchParams({
            keywords: trimmedQuery.replaceAll(' ', '-'),
            page: page,
            pageSize: pageSize,
            selectedMagazine: selectedMagazine,
            startTime: startTime,
            endTime: endTime
        }).toString();
        
        if (trimmedQuery === '') {
            alert('empty keywords!');
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/database/search?${params}`);
            if (!response.ok) {
                throw new Error('fetch failed');
            }

            const data = await response.json();
            if (data === 'error') {
                throw new Error('invalid keywords');
            }
            sessionStorage.setItem('leftSearchPage', 'true');
            sessionStorage.setItem('searchResults', JSON.stringify(data.results));
            sessionStorage.setItem('searchQuery', JSON.stringify(submittedQuery));
            setTotalResults(data.total);
            setResult(data.results);
            setTotalPages(Math.ceil(data.total / pageSize));

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedQuery(query);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }


    useEffect(()=>{
        result && getData(1);
    },[selectedMagazine, startTime, endTime] )


    return (
        <div style={{flexDirection: "column", display: 'flex', alignItems: "center"}}>
            <form onSubmit={handleSubmit}>
                <h4>Search through all of our collections</h4>
                <div className = "d-flex justify-content-between">
                    <input className="form-control" type='text' placeholder="Search for..." onChange={handleInputChange}/>  
                    <button className="btn btn-primary" type="submit"> Search </button>
                </div>
                {error && <p>Error: {error}</p>}
            </form>
            {!result && JSON.parse(sessionStorage.getItem('searchResults')) &&
                <DisplaySearchRes data={JSON.parse(sessionStorage.getItem('searchResults'))} 
                query={JSON.parse(sessionStorage.getItem('searchQuery'))} />}
            {result && 
            <div className="search-result-page-wrapper">
                <h2> {totalResults} Results found</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <DisplaySearchRes data={result} totalResults={totalPages * pageSize} query={submittedQuery} />
                    <div style={{ flex: 1, paddingTop: "50px", paddingLeft: "20px"}}>
                    <SideBar years={years} 
                    filterSelectedMagazine={setSelectedMagazine}
                    filterStartTime={setStartTime}
                    filterEndTime={setEndTime}/>
                    </div>
                </div>
            </div>
            
            }
            {result && <PaginationBar totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />}
        </div>
        

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

import React, { useState, useEffect, Component } from "react";
import Highlighter from "react-highlight-words";
import { Link, useParams, useHistory, useLocation  } from 'react-router-dom';
import './style.css';
import SideBar from "../components/SideBar";
import PaginationBar from '../components/PaginationBar';
import { useContext } from "react";
import SelectedFilesSidebar from '../components/SelectedFilesSidebar';
import { ListContext } from "../components/ListProvider";


// display search results

function DisplaySearchRes(props) {

    const items = props.data;
    const query = props.query;
    const totalResults = props.totalResults;  
    const keywords = query.split(' ');
    const selectMode = props.selectMode;
    const setSelectMode = props.setSelectMode;
    let displayRes = [];
    let start = -1;
    let end = -1;
    
    
    
    for (let key in items) {
        const item = items[key];
        for (let i in keywords){
            const keywordIndex = item.content.indexOf(keywords[i]);
            
            if (keywordIndex !== -1){
                
                start = Math.max(0, keywordIndex - 25);
                end = Math.min(item.content.length, keywordIndex + keywords[i].length + 25);
                break;
            }   
        }
    

        displayRes.push(
            <ResultItem
                key={item.page_name}
                file_path={item.file_path}
                page_name={item.page_name}
                keywords={keywords}
                selectMode={selectMode}
                setSelectMode={setSelectMode}
                highlighted_text={item.content.slice(start, end)}
            />
        );
    }

    


    return (
        <div className="search-result-container">
            {/*doesn't render table header when there's no results*/} 
            {displayRes.length > 0 && (displayRes)}
        </div>
    );
}

const ResultItem = (props) => {
    const magazineNameMap = {
        "RMHB": "人民画报",
        "JFJHB": "解放军画报",
        "MZHB": "民族画报"
    }
    const info = props.page_name.split("_");
    const issue_name = magazineNameMap[info[0]];
    const file_path = props.file_path;
    const year = info[1];
    const issue_number = info[2];
    const page_num = info[3];
    const keywords = props.keywords;
    const highlighted_text = props.highlighted_text;
    const selectMode = props.selectMode;
    const setSelectMode = props.setSelectMode;
    const { list, setList }  = useContext(ListContext);   
    const [selected, setSelected] = useState(list.some(item => item.page_name === props.page_name));

    
   

    const selectFile = () => {
        if (selectMode){
            if (selected){
                let updatedList = list.filter(item => !(item.page_name === props.page_name));
                setList(updatedList);
            }
            else{
                const page_info = {
                    name: info[0],
                    page_name: props.page_name,
                    year: year,
                    issue: issue_number,
                    page: page_num
                }
                setList([...list, page_info]);

            }
            setSelected(!selected);
        }
    }

    useEffect(() => {setSelected(list.some(item => item.page_name === props.page_name))}, [list]);

    return (
        <div className={`search-result-item`}  onClick={selectFile}>
            {selectMode && <button className={`search-result-item-mask ${selected? "selected":""}`}/>}
            <div className="search-result-image-frame">
                <a href={`/book/${info[0]}_${year}_${issue_number}/page/${page_num}`}>
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
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const searchKeyword = queryParams.get("query");
    const [query, setQuery] = useState('');
    //middleware for query to prevent re-rendering
    const [submittedQuery, setSubmittedQuery] = useState(searchKeyword);
    const [result, setResult] = useState('');
    const [error, setError] = useState(''); 
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(sessionStorage.getItem('currentPage') ?? 1);
    const [selectedMagazine, setSelectedMagazine] = useState(sessionStorage.getItem('filterMagazineName') ?? "default");
    const [startTime, setStartTime] = useState(sessionStorage.getItem('filterStartTime') ?? '1950');
    const [endTime, setEndTime] = useState(sessionStorage.getItem('filterEndTime') ??'1970');
    const [totalResults, setTotalResults] = useState(0);
    const [selectMode, setSelectMode] = useState(false);
    const years = Array.from({ length: 21 }, (_, index) => 1950 + index);
    const pageSize = 20;
	

    



    useEffect(() => {
        if (submittedQuery !== '') {
            getData(currentPage);
        }
		sessionStorage.setItem('currentPage', currentPage);
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
            sessionStorage.setItem('searchQuery', JSON.stringify(submittedQuery));
            sessionStorage.setItem('currentPage', page);
            
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
		sessionStorage.setItem('currentPage', 1);
        setSelectedMagazine("default");
        setStartTime("1950");
        setEndTime("1970");
        setSubmittedQuery(query);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }


    useEffect(()=>{
        result && getData(1);
    },[selectedMagazine, startTime, endTime] )


    return (
        <div style={{flexDirection: "column", display: 'flex', alignItems: "center", width: "100%"}}>
            <form onSubmit={handleSubmit}style={{display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px", marginBottom: "10px"}}>
                <h4>Search through all of our collections</h4>
                <div style={{flexDirection: "row", display: 'flex',  marginLeft: "80px"}}>
                    <input className="form-control" type='text' placeholder={submittedQuery} onChange={handleInputChange}/>  
                    <button className="btn btn-primary" type="submit"> Search </button>
                </div>
                {error && <p>Error: {error}</p>}
            </form>
            
            {result && 
            <div className="search-result-page-wrapper">
                <h2> {totalResults} Results found</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: "20px"}}>
                    {totalPages>0 && <SelectedFilesSidebar select={selectMode} setSelect={setSelectMode}/>}
                    <DisplaySearchRes data={result} totalResults={totalPages * pageSize} query={submittedQuery} selectMode={selectMode} setSelectMode={setSelectMode}/>
                    <div style={{ flex: 1, paddingTop: "20px"}}>
                    {totalPages>0 && <SideBar years={years} 
					currentMagazine={selectedMagazine}
                    filterSelectedMagazine={setSelectedMagazine}
					currentStart={startTime}
                    filterStartTime={setStartTime}
                    currentEnd={endTime}
                    filterEndTime={setEndTime}/>}
                    </div>
                </div>
            </div>
            
            }
            {totalPages>0 && <PaginationBar totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />}
        </div>
        

    );
}


function SearchResult() {
    return (
        <div>
            <Search />
        </div>
    );
}


export default SearchResult;
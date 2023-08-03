
import React, { useState} from "react";
import {useHistory} from 'react-router-dom';
import './style.css';




const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const history = useHistory(); 


    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const resetStorage = () =>{
        sessionStorage.removeItem('filterMagazineName');
        sessionStorage.removeItem('filterStartTime');
        sessionStorage.removeItem('filterEndTime');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        resetStorage();
        
        history.push(`/results?query=${encodeURIComponent(query)}`);
    }
    return (
        <div style={{flexDirection: "column", display: 'flex', alignItems: "center", width: "100%"}}>
            <form onSubmit={handleSubmit}style={{display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px", marginBottom: "10px"}}>
                <h4>Search through all of our collections</h4>
                <div style={{flexDirection: "row", display: 'flex',  marginLeft: "80px"}}>
                    <input className="form-control" type='text' placeholder="Search for..." onChange={handleInputChange}/>  
                    <button className="btn btn-primary" type="submit"> Search </button>
                </div>
                {error && <p>Error: {error}</p>}
            </form>
        </div>
        

    );
}


function Search() {
    return (
        <div>
            <SearchBar />
        </div>
    );
}


export default Search;
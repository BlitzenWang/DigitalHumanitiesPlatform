/**
 * Admin page for managing database
 */
import { useState, useEffect } from "react";

const Item = (props) => {
    const entry = props.data;
    const curItem = props.curItem;
    const setCurItem = props.setCurItem;
    
    const [itemName, setItemName] = useState(entry.file_name);
    const [itemKeyword, setItemKeyword] = useState(entry.keyword);
    const [itemImgPath, setItemImagePath] = useState(entry.image_path);

    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
    } 

    const handleItemKeywordChange = (e) => {
        setItemKeyword(e.target.value);
    }
    const handleItemImgpathChange = (e) => {
        setItemImagePath(e.target.value);
    }

    // save changes, check valid input,
    // send POST request to the server
    const handleSaveChange = (e) => {

        console.log({
            file_name : itemName,
            keyword : itemKeyword,
            image_path : itemImgPath
        })
        let data = {
            file_name : itemName,
            keyword : itemKeyword,
            image_path : itemImgPath
        };
        e.preventDefault();
        fetch('http://localhost:5000/securedAdminAccess', {
            method : 'POST',
            body : JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) {
                console.log(res);
            }
        })

    }

    const handleNext = (e) => {
        e.preventDefault();
        setCurItem({idx : curItem.idx + 1});
    }

    const handlePrev = (e) => {
        e.preventDefault();
        if (curItem.idx === 0) {
            alert('already the first item');
        } else {
            setCurItem({idx : curItem.idx - 1});
        }
        
    }

    return (
        <div className="container">
            <h5>Current Item</h5>
            <h6>Name : { entry.file_name}</h6>
        <br />
            <h6>Description : { entry.keyword }</h6>

            <br />
            <h6>Image path: { entry.image_path}</h6>

            <div className="col">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Entry Name</span>
                    </div>
                    
                        <input type="text" className="form-control" placeholder={itemName} aria-label="itemName" aria-describedby="basic-addon1" onChange={handleItemNameChange} />
                    
                </div>
                <br />
                <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Entry Keyword</span>
                </div>
                
                    {/* <input type="text" className="form-control" placeholder={itemKeyword} aria-label="itemKeyword" aria-describedby="basic-addon1" onChange={handleItemNameChange} /> */}
                    <textarea className="form-control" aria-label="With textarea" placeholder = {itemKeyword}
                    onChange = {handleItemKeywordChange}></textarea>
                </div>

                <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Entry Image Path</span>
                </div>
                
                    <input type="text" className="form-control" placeholder={itemImgPath} aria-label="itemImgpath" aria-describedby="basic-addon1" onChange={handleItemImgpathChange} />
                    {/* <textarea class="form-control" aria-label="With textarea" placeholder = {itemKeyword}></textarea> */}
                </div>
            </div>

            <button type="button" class="btn btn-outline-primary" onClick = {handleNext}>Next</button>
            <button type="button" class="btn btn-outline-primary" onClick = {handlePrev}>Previous</button>
            <button type="button" class="btn btn-primary btn-lg" onClick = {handleSaveChange}>Save Changes</button>
        </div>
     
    )

}




const Nav = () => {
    const [db, setDb] = useState(null);
    const [curItem, setCurItem] = useState({idx : 0});

    // on click, save the settings for current panel
    let handleFetchData = (e) => {
        // console.log()
        e.preventDefault();

        fetch('http://localhost:5000/get-data')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                console.log(Object.keys(data));
                // database = data;
                setDb(data);
                // setCurItem(1);
            }).catch(err => console.log(err))

    }

    return (
        <div className="container">
            <nav className="navbar navbar-light">
            <form >
                <button className="btn btn-outline-success" type="button" onClick = { handleFetchData }>Fetch Database</button>

            </form>
        </nav>

        {db && <Item data = {db[Object.keys(db)[curItem.idx]]}
                    curItem = {curItem}
                    setCurItem = {setCurItem}
                    />}
        </div>
        

        
    );
}


const Backend = () => {
    return (
        <div className = "d-flex justify-content-center">
            <div className="w-100">
            <h4>
                Successfully logged In! Welcome to Backend Portal.
            </h4>

            <Nav/>

            </div>
        </div>
        
    )
}


const LoginPage = (props) => {
    const [tokens, setTokens] = useState('');
    const setIsLoggedIn = props.setIsLoggedIn;

    // on input change, set token
    let onChange = (e) => {
        setTokens(e.target.value);
    }

    // on button click
    // check credentials, if yes
    let handleClick = (e) => {
        e.preventDefault();
        // let loginStatus = false;
        // fetch password from backend
        fetch('http://localhost:5000/adminlogin?userInput=' + tokens)
        .then( res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then (data => {
            if (data) {
                if (data.verification) {
                    setIsLoggedIn(true);
                }
                else {
                    alert('invalid credentials :(');
                    setTokens('');
                }
            }
        })
        .catch(err => console.log(err));


        // if (tokens === password) {
        //     setIsLoggedIn(true);
        // } else {
        //     alert('Invalid password');
        // }

    }
    return(
        <div className="d-flex justify-content-center">
            <div className="w-25">
            <form className="form-signin">
                {/* <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/> */}
                    <h1 className="h3 mb-3 font-weight-normal">Admin Login</h1>
                    {/* <label className="sr-only">Email address</label> */}
                    {/* <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" /> */}
                    <label className="sr-only">Token</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Credentials.." required="" onChange = {onChange} />
                    <p>Please do not share tokens</p>
                    {/* <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div> */}
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick = {handleClick}>Sign in</button>
                    {/* <p className="mt-5 mb-3 text-muted">© 2017-2018</p> */}
    </form>
    </div>
        </div>
        
    )
}


 const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // console.log(isLoggedIn);

    return (
        <div className="container">
        {!isLoggedIn && <LoginPage setIsLoggedIn = {setIsLoggedIn}/>}
        {isLoggedIn && <Backend/>}
        </div>
    );
}

export default Admin;
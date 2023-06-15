/**
 * Navbar
 * CSS by Boostrap 5.0
 * Author: Ruize Li
 */


const Navbar = () => {
    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                {/* <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg> */}
                <span className="fs-4">Colby Digital Studies</span>
            </a>
            <ul className="nav nav-pills">
                <li className="nav-item"><a  className="nav-link" aria-current="page" href = '/'>Home</a></li>
                <li className="nav-item"><a  className="nav-link" href = '/teachingresearch'>Teaching &amp; Research</a></li>
                <li className="nav-item"><a  className="nav-link" href = '/database'>Database</a></li>
                <li className="nav-item"><a  className="nav-link" href = '/resources'>Resources</a></li>
                <li className="nav-item"><a  className="nav-link" href = '/about'>About</a></li>
                    <li className="nav-item">
                        <a className="nav-link" href="/admin">Admin</a>
                    </li>
                    
                <li className="nav-item"><div id="google_translate_element" /></li>
            </ul>
            </header>
        </div>
        );
}



export default Navbar;

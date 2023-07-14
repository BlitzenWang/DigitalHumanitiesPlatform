
import './style.css';


const Navbar = () => {

 return (

  <div className="NavBarContainer">
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
      <div className="NavBarItemTitle">Colby Digital Studies</div>
    </a>
    <div className="NavBarItemFrame">
      <li className="NavBarLi">
        <a href="/" className="NavBarItem">Home</a>
      </li>
      <li className="NavBarLi">
        <a href="/teachingresearch" className="NavBarItem">Teaching &amp; Research</a>
      </li>
      <li className="NavBarLi">
        <a href="/database" className="NavBarItem">Database</a>
      </li>
      <li className="NavBarLi">
        <a href="/resources" className="NavBarItem">Resources</a>
      </li>
      <li className="NavBarLi">
        <a href="/about" className="NavBarItem">About</a>
      </li>
      <li className="NavBarLi">
        <a href="/Chat" className="NavBarItem">Chatbot</a>
      </li>
      <li className="NavBarLi">
        <div id="google_translate_element" />
      </li>
    </div>
  </div>
);
}



export default Navbar;


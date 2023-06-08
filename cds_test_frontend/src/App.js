
import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import MainView from './components/MainView';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Admin from './components/Admin';
//tyuy

const App = () => {
	return (
		<div className="App">
			<Navbar />
			<MainView />
		</div>
	);
}

export default App;


import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import MainView from './components/MainView';
import { ListProvider } from './components/ListProvider';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Admin from './components/Admin';


const App = () => {
	return (
		<ListProvider>
			<div className="App">
				<Navbar />
				<MainView />
			</div>
		</ListProvider>
	);
}

export default App;

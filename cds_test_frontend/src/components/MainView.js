/**
 * Main view, updates constantly to display different sections of pages
 * CSS by Boostrap 5.0
 * Author: Ruize Li
 */
 import React from "react";
 import Homepage from "./pages/Homepage";
 import Resources from "./pages/Resources";
 import Database from "./pages/Database";
 import About from "./pages/About";
 import Admin from "./Admin";
 import { TeachingResearch } from "./pages/TeachingResearch";
 import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class MainView extends React.Component {


    render() {
        // determine the current page
        
        return(
            <Router>
                <div className="container">

                <Switch>
                    <Route exact path = '/'>                    <Homepage/>             </Route>
                    <Route exact path = '/resources'>           <Resources/>            </Route>
                    <Route exact path = '/teachingresearch'>    <TeachingResearch/>     </Route>
                    <Route exact path = '/database'>            <Database/>             </Route>
                    <Route exact path = '/about'>               <About/>                </Route>
                    <Route exact path = '/admin'>               <Admin/>                </Route>
                </Switch>
                
                </div>
            </Router>
            
        );
    }
}



export default MainView;
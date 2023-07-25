/**
 * Main view, updates constantly to display different sections of pages
 * CSS by Boostrap 5.0
 * Author: Ruize Li
 */
import React from "react";
import Homepage from "../pages/Homepage";
import Resources from "../pages/Resources";
import Search from "../pages/Search";
import SearchResult from "../pages/SearchResult"
import About from "../pages/About";
import Admin from "./Admin";
import BookView from "../pages/BookView"
import GalleryYear from "../pages/GalleryLayerYear"
import GalleryIssue from "../pages/GalleryLayerIssues"
import GalleryPage from "../pages/GalleryLayerPage"
import { TeachingResearch } from "../pages/TeachingResearch";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ChatBot from "../pages/ChatBot";


class MainView extends React.Component {
   

     render() {
        // determine the current page
        
        return(
            <Router>
                <div>

                <Switch>
                    <Route exact path = '/'>                    <Homepage/>             </Route>
                    <Route exact path = '/resources'>           <Resources/>            </Route>
                    <Route exact path = '/teachingresearch'>    <TeachingResearch/>     </Route>
                    <Route exact path = '/search'>              <Search/>               </Route>
                    <Route exact path = '/results'>             <SearchResult/>         </Route>
                    <Route exact path = '/about'>               <About/>                </Route>
                    <Route exact path = '/admin'>               <Admin/>                </Route>
                    <Route path="/book/:bookName/page/:startPage"> <BookView/>          </Route>
                    <Route path="/Gallery/:magazineName/:year/:issue"> <GalleryPage/>   </Route>
                    <Route path="/Gallery/:magazineName/:year"> <GalleryIssue/>         </Route>
                    <Route path="/Gallery/:magazineName">       <GalleryYear/>          </Route>
                    <Route path="/Chat">                        <ChatBot/>              </Route>
                    
                    
                </Switch>
                
                </div>
            </Router>
            
        );
    }
}

export default MainView;
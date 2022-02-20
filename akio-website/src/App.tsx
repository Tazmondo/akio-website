import React from 'react';
import logo from './logo.svg';
import SocialMedia from './SocialMedia'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import HomePage from './Components/home-page/HomePage';



function App(): JSX.Element {
  return (
    <Router>
          <div className="App">
            <Route>
              <HomePage />
            </Route>
          </div>
    </Router>
  );
}

export default App;

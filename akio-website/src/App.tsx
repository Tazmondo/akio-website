import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from "react-router-dom";


import HomePage from './Components/home-page/HomePage';



function App(): JSX.Element {
  return (
    <BrowserRouter>
        <div className="App">
            <Routes>
              <Route path = "/" element = {<HomePage />} />
            </Routes>
        </div>
    </ BrowserRouter>
  );
}

export default App;

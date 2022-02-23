import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import HomePage from './Components/home-page/HomePage';
import ShopPage from "./Components/shop-page/ShopPage";
import AboutPage from "./Components/about-page/AboutPage";
import SocialMedia from "./Components/social-media/SocialMedia";
import SizeGuide from './Components/size-guide/SizeGuide';



function App(): JSX.Element {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path = "/" element = {<HomePage />} />
                    <Route path= "/shopping-page" element = {<ShopPage/>}/>
                    <Route path="/about-us" element = {<AboutPage/>}/>
                    <Route path = '/sizes' element = {<SizeGuide />} />
                </Routes>
            </div>
            <SocialMedia/>
        </ BrowserRouter>
    );
}

export default App;

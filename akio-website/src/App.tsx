import {
    BrowserRouter,
    Route,
    Routes,
    Outlet
} from "react-router-dom";
import HomePage from './Components/home-page/HomePage';
import ShopPage from "./Components/shop-page/ShopPage";
import AboutPage from "./Components/about-page/AboutPage";
import SizeGuide from './Components/size-guide/SizeGuide';
import AdminPage from './Components/admin-page/AdminPage';
import ItemContext from "./Components/item-context/ItemContext";
import ItemPage from "./Components/item-page/ItemPage";



function App(): JSX.Element {
    return (
            <BrowserRouter>
                <div className="App">
                    <ItemContext>
                        <Routes>
                            <Route path = "/" element = {<HomePage />}/>
                            <Route path = "/shopping-page" element = {<ShopPage/>}/>
                            <Route path = "/about-us" element = {<AboutPage/>}/>
                            <Route path = '/sizes' element = {<SizeGuide />}/>
                            <Route path = '/admin' element = {<AdminPage />}/>
                            <Route path = "/items" element={<Outlet/>}>
                                <Route path = ":name" element={<ItemPage/>}/>
                            </Route>
                            <Route path = "*" element = {<h1>Uh oh, this page doesn't exist!</h1>}/>
                        </Routes>
                    </ItemContext>
                </div>
            </ BrowserRouter>

    );
}

export default App;

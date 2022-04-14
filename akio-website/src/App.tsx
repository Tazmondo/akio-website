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
import Cart from './Components/cart-page/Cart';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


function App(): JSX.Element {
    return (
            <PayPalScriptProvider options = {{ 'client-id': 'AYGVTLkd4hYA0sJMe8KqGvFhUgGzKg01cp6L79fUVIN1Mz4fd6E3Y6QaH9uTQAFIp2yiVPqT7qafzZRi' }}>
                    <div className="App">
                        <BrowserRouter>
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
                                        <Route path = '/cart' element = {<Cart />} />
                                        <Route path = "*" element = {<h1>Uh oh, this page doesn't exist!</h1>}/>
                                    </Routes>
                            </ItemContext>
                        </ BrowserRouter>
                    </div>
            </PayPalScriptProvider>
    );
}

export default App;

// import { Outlet } from "react-router-dom";
// import ErrorPage from "./pages/ErrorPage.jsx";

import Header from "./components/Header";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductView from "./pages/ProductView";

function App() {
	return (
		<BrowserRouter>
			<main className="container mx-auto px-6">
				<Header />
				<Routes>
					<Route path="" element={<Home />} />
					<Route path="/products">
						<Route path=":id" element={<ProductView />}></Route>
					</Route>

					<Route path="/cart" element={<Cart />} />

					<Route path="/account" element={<Account />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}
export default App;

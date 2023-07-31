// import { Outlet } from "react-router-dom";
// import ErrorPage from "./pages/ErrorPage.jsx";

import Header from "./components/Header";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import ProductView from "./pages/ProductView";
import ProductsList from "./components/ProductsList";
import Footer from "./components/Footer";

const Layout = () => {
	return (
		<main className="container mx-auto px-6">
			<Header />
			<Outlet />
			<Footer />
		</main>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/products/:id",
				element: <ProductsList />,
			},
			{
				path: "/product/:id",
				element: <ProductView />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}
export default App;

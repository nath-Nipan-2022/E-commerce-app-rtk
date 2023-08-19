import { useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home.jsx";
import Account from "./pages/Account";
import ErrorPage from "./pages/ErrorPage.jsx";
import { RouterProvider, Outlet, createBrowserRouter ,useLocation} from "react-router-dom";
import ProductView from "./pages/ProductView";
import Footer from "./components/Footer";
import CategoriesPage from "./pages/CategoriesPage";

const Layout = () => {
	return (
		<div className="font-poppins">
			<Header />
			<main className="max-w-7xl mx-auto px-6">
				<ScrollToTop />
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

const ScrollToTop = () => {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	// Automatically scrolls to top whenever pathname changes
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/account",
				element: <Account />,
			},
			{
				path: "/categories/:id",
				element: <CategoriesPage />,
			},
			{
				path: "/categories/:id/products/:id",
				element: <ProductView />,
			},
			{
				path: "/products/:id",
				element: <ProductView />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}
export default App;

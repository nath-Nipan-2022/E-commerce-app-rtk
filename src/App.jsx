import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import { Home, Account, ErrorPage, ProductView, CategoriesPage } from "./pages";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "./helper";

const Layout = () => {
  return (
    <div className="font-poppins">
      <Header />
      <main className="max-w-7xl mx-auto px-6">
        <ScrollToTop />
        <Outlet />
        <Toaster position="bottom-center" />
      </main>
      <Footer />
    </div>
  );
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

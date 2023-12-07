import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import { Home, Account, ErrorPage, ProductView, CategoriesPage,OrdersPage } from "./pages";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "./helper";

const Layout = () => {
  return (
    <div className="font-plus-jakarta-sans bg-background-primary text-foreground">
      <Header />
      <main className="px-6 mx-auto max-w-7xl">
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
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "categories/:type",
        element: <CategoriesPage />,
      },
      {
        path: "products/:id",
        element: <ProductView />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
export default App;

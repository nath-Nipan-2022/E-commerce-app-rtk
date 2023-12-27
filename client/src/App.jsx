import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/root-layout";

// pages
import {
  Home,
  ErrorPage,
  Account,
  CategoriesPage,
  OrdersPage,
  ProductView,
  WishlistPage,
} from "./pages";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "sign-in", element: <Account /> },
      { path: "categories/:type", element: <CategoriesPage /> },
      { path: "products/:id", element: <ProductView /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "wishlist", element: <WishlistPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;

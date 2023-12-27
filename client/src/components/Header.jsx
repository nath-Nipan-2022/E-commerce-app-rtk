import { useState } from "react";
import { FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import logo from "../assets/shopping logo.png";
import { Link } from "react-router-dom";

// components
import Button from "./Button";
import CartList from "./Cart/CartList";
import Chip from "./Chip";
import Navbar from "./Nav/Navbar";
import SearchResults from "./Search/SearchResults";

// hooks
import { useCartList } from "../hooks/useCartList";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const { cartList, isOpen, dispatch, toggleCart } = useCartList();
  const cartQuantity = cartList.length;

  const openCartList = () => {
    dispatch(toggleCart());
  };

  return (
    <header className="sticky top-0 z-10 mb-6 border-b bg-background-primary">
      <div className="flex items-center justify-between p-2 px-5 mx-auto max-w-7xl">
        <Link to="/" className="flex items-center text-lg font-semibold">
          <img
            src={logo}
            alt="shopcart"
            width={32}
            className="invert"
            title="Shopcart"
          />
          <span>ShopCart</span>
        </Link>

        <Navbar openMenu={openMenu} onClose={() => setOpenMenu(false)} />

        <SearchResults />

        <div className="flex text-gray-600">
          <Button
            onClick={openCartList}
            className="relative hover:text-slate-900 lg:mr-4"
          >
            <FiShoppingCart className="text-base" />
            <Chip
              text={cartQuantity}
              className="absolute top-0 right-0 w-4 h-4 text-xs text-white rounded-full bg-accent-blue"
            />
          </Button>
          <Button
            onClick={() => setOpenMenu(true)}
            className="block lg:hidden hover:text-slate-900 focus:ring"
          >
            <FiMenu className="text-base" />
            <span className="sr-only">menu icon</span>
          </Button>
          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in" className="p-2 hover:text-slate-900">
              <FiUser className="text-base" />
            </Link>
          </SignedOut>
        </div>

        <CartList />
      </div>
    </header>
  );
}
export default Header;

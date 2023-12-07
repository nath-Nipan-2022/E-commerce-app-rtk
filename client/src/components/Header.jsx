import { useState } from "react";
import { FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/shopping logo.png";
import CartList from "./Cart/CartList";
import Navbar from "./Nav/Navbar";
import SearchResults from "./Search/SearchResults";
import Chip from "./Chip";
import Button from "./Button";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCartList, setOpenCartList] = useState(false);
  const cartQuantity = useSelector((state) => state.carts.list.length);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 mb-6 border-b bg-background-primary">
      <div className="flex items-center justify-between p-2 px-5 mx-auto max-w-7xl">
        <Link to={"/"} className="flex items-center ">
          <img
            src={logo}
            alt="company logo"
            width={32}
            className="invert"
            title="Company logo"
          />
          <span className="text-lg">ShopCart</span>
        </Link>

        <Navbar openMenu={openMenu} onClose={toggleMenu} />

        <SearchResults />

        <div className="flex text-gray-600 [&>*]:px-2.5">
          <Button
            onClick={() => navigate("/account")}
            className="hover:text-slate-900"
          >
            <FiUser className="text-base" />
          </Button>
          <Button
            className="relative hover:text-slate-900"
            onClick={() => setOpenCartList(true)}
            title="cart list"
          >
            <FiShoppingCart className="text-base" />
            <Chip
              text={cartQuantity}
              className="absolute top-0 right-0 w-4 h-4 text-xs text-white rounded-full bg-accent-blue"
            />
          </Button>
          <Button
            onClick={toggleMenu}
            className="block p-2 lg:hidden hover:text-slate-900"
          >
            {!openMenu ? <FiMenu className="text-base" /> : <FiX />}
            <span className="sr-only">menu icon</span>
          </Button>
        </div>
        {<CartList isOpen={openCartList} setIsOpen={setOpenCartList} />}
      </div>
    </header>
  );
}
export default Header;

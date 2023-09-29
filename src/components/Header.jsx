import { useState } from "react";
import { FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../assets/shopping logo.png";
import CartList from "./Cart/CartList";
import Navbar from "./Nav/Navbar";
import SearchResults from "./Search/SearchResults";
import Chip from "./Chip";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCartList, setOpenCartList] = useState(false);
  const cartQuantity = useSelector((state) => state.carts.list.length);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-10 bg-background-primary">
      <div className="flex items-center justify-between p-2 px-5 mx-auto max-w-7xl">
        <Link to={"/"} className="flex items-center ">
          <img src={logo} alt="company logo" width={44} title="Company logo" />
          <span className="text-xl ">ShopCart</span>
        </Link>

        <Navbar openMenu={openMenu} onClose={toggleMenu} />

        <SearchResults />

        <div className="flex items-center gap-1">
          <Link
            to={"/account"}
            className="flex items-center gap-2 p-1 px-1.5 rounded text-gray-600 hover:text-slate-900"
          >
            <FiUser />
          </Link>
          <div
            className="flex items-center gap-2 p-1 px-1.5 rounded  cursor-pointer text-gray-600 hover:text-slate-900"
            onClick={() => setOpenCartList(true)}
          >
            <div className="relative" title="cart list">
              <FiShoppingCart />
              <Chip
                className={`absolute w-4 h-4 -top-1/2 -right-1/2 text-xs rounded-full bg-accent-blue text-white`}
                text={cartQuantity}
              />
            </div>
          </div>
          <div
            onClick={toggleMenu}
            className="block py-1 pl-1.5 text-gray-600 cursor-pointer lg:hidden hover:text-slate-900"
          >
            {!openMenu ? <FiMenu /> : <FiX />}
            <span className="sr-only">menu icon</span>
          </div>
        </div>
        {openCartList && <CartList onClose={() => setOpenCartList(false)} />}
      </div>
    </header>
  );
}
export default Header;

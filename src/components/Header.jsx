import { GoPerson } from "react-icons/go";
import { BsMenuApp, BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import logo from "../assets/shopping logo.png";
import { useState } from "react";
import Navbar from "./Navbar";

function Header() {
	const [openMenu, setOpenMenu] = useState(false);

	const onMenuClose = () => {
		setOpenMenu((prev) => !prev);
	};

	return (
		<header className="flex justify-between items-center p-2">
			<div>
				<Link to={"/"} className="flex items-center font-medium">
					<img src={logo} alt="company logo" width={56} />
					<span className="text-xl font-medium">ShopCart</span>
				</Link>
			</div>

			<Navbar openMenu={openMenu} onClose={onMenuClose} />

			<SearchForm />

			<div className="flex items-center gap-4 font-medium">
				<Link to={"/account"} className="flex items-center gap-2">
					<GoPerson />
					<span>Account</span>
				</Link>
				<Link to={"/cart"} className="flex items-center gap-2">
					<BsCart2 />
					<span>Cart</span>
				</Link>
				<BsMenuApp
					className="block cursor-pointer md:hidden"
					onClick={onMenuClose}
				/>
			</div>
		</header>
	);
}
export default Header;

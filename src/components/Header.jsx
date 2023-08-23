import { GoPerson } from "react-icons/go";
import { BsCart2 } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import logo from "../assets/shopping logo.png";
import { useState } from "react";
import Navbar from "./Navbar";
import CartList from "./CartList";
import { useSelector } from "react-redux";

function Header() {
	const [openMenu, setOpenMenu] = useState(false);
	const [openCartList, setOpenCartList] = useState(false);
	const cartQuantity = useSelector((state) => state.carts.list.length);

	const onMenuClose = () => {
		setOpenMenu((prev) => !prev);
	};

	return (
		<header className="sticky top-0 z-10 bg-white">
			<div className="max-w-7xl mx-auto px-6 flex justify-between items-center p-2">
				<Link to={"/"} className="flex items-center ">
					<img src={logo} alt="company logo" width={44} title="Company logo" />
					<span className="text-xl ">ShopCart</span>
				</Link>

				<Navbar openMenu={openMenu} onClose={onMenuClose} />

				<SearchForm className={"sm:w-60 ml-auto sm:ml-0 lg:w-auto"} />

				<div className="flex items-center gap-1 md:gap-4 ">
					<Link
						to={"/account"}
						className="flex items-center gap-2 p-1 px-1.5 rounded text-gray-600 hover:text-slate-900"
					>
						<GoPerson />
						<span className="hidden lg:inline-block leading-8">Account</span>
					</Link>
					<div
						className="flex items-center gap-2 p-1 px-1.5 rounded  cursor-pointer text-gray-600 hover:text-slate-900"
						onClick={() => setOpenCartList(true)}
					>
						<div className="relative">
							<BsCart2 />
							<span className="absolute -top-1/2 -right-1/2 w-4 h-4 text-[10px] grid place-items-center rounded-full bg-blue-600 text-white font-medium">
								{cartQuantity}
							</span>
						</div>
						<span className="hidden lg:inline-block leading-8">Cart</span>
					</div>
					<FiMenu
						className="block cursor-pointer lg:hidden ml-1 text-gray-600 hover:text-slate-900"
						onClick={onMenuClose}
					/>
				</div>
				{openCartList && <CartList onClose={() => setOpenCartList(false)} />}
			</div>
		</header>
	);
}
export default Header;

import { GoPerson } from "react-icons/go";
import { BsCart2 } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import logo from "../assets/shopping logo.png";
import { useState } from "react";
import Navbar from "./Navbar";

function Header() {
	const [openMenu, setOpenMenu] = useState(false);
	const [cartQuantity, setCartQuantity] = useState(2);

	const linksWithIcon = [
		{
			path: "/account",
			label: "Account",
			icon: <GoPerson />,
		},
		{
			path: "/cart",
			label: "Cart",
			icon: (
				<div className="relative">
					<BsCart2 />{" "}
					<span className="absolute -top-1/2 -right-1/2 w-4 h-4 font-bold text-[10px] grid place-items-center rounded-full bg-blue-600 text-white">
						{cartQuantity}
					</span>
				</div>
			),
		},
	];

	const onMenuClose = () => {
		setOpenMenu((prev) => !prev);
	};

	return (
		<header className="flex justify-between md:justify-evenly lg:justify-between items-center p-2">
			<div>
				<Link to={"/"} className="flex items-center font-medium">
					<img src={logo} alt="company logo" width={56} />
					<span className="text-xl font-medium">ShopCart</span>
				</Link>
			</div>

			<Navbar openMenu={openMenu} onClose={onMenuClose} />

			<SearchForm className={"sm:w-60 ml-auto sm:ml-0 lg:w-auto"} />

			<div className="flex items-center gap-4 font-medium">
				{linksWithIcon.map((link) => (
					<Link
						to={link.path}
						key={link.label}
						className="flex items-center gap-2 p-1 px-1.5 rounded"
					>
						{link.icon}
						<span className="hidden lg:inline-block">{link.label}</span>
					</Link>
				))}
				<FiMenu
					className="block cursor-pointer lg:hidden ml-1"
					onClick={onMenuClose}
				/>
			</div>
		</header>
	);
}
export default Header;

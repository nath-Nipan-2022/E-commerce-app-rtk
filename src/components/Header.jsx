import { GoPerson } from "react-icons/go";
import { BsMenuApp } from "react-icons/bs";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import logo from "../assets/shopping logo.png";
import { useState } from "react";

function Header() {
	const navLinks = [
		{
			id: 1,
			label: "Categories",
			path: "/category",
		},
		{
			id: 2,
			label: "Deals",
			path: "/deals",
		},
		{
			id: 3,
			label: "What's New",
			path: "/whats-new",
		},
		{
			id: 4,
			label: "Delivery",
			path: "/delivery",
		},
	];

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="flex justify-between items-center">
			<div>
				<Link to={"/"} className="flex items-center font-medium">
					<img src={logo} alt="company logo" width={56} />
					<span className="text-xl font-medium">ShopCart</span>
				</Link>
			</div>

			<nav
				className={`fixed w-full h-screen left-0 top-0 pt-[76px] px-10 lg:p-0 lg:relative lg:left-auto lg:top-auto lg:mx-0 lg:h-[56px] lg:w-auto transition-colors duration-500 ${
					isMenuOpen ? "bg-black/30 visible" : "invisible"
				} lg:visible lg:flex lg:items-center`}
				onClick={() => setIsMenuOpen(false)}
			>
				<ul
					className={`mx-auto max-w-2xl lg:max-w-7xl flex flex-col lg:flex-row lg:items-center  md:gap-4 rounded-lg p-3 bg-gray-100 lg:p-0 lg:rounded-none lg:bg-transparent transition duration-500 ${
						isMenuOpen
							? "translate-y-0 opacity-100"
							: "-translate-y-4 opacity-0"
					} 
					lg:opacity-100 lg:translate-y-0 `}
				>
					{navLinks.map((link) => {
						return (
							<li key={link.id} className="font-medium">
								<Link
									to={link.path}
									className="flex items-center p-1 px-1 lg:py-0 rounded hover:bg-blue-500 hover:text-white"
								>
									{link.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

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
					className="block lg:hidden"
					onClick={() => setIsMenuOpen((prev) => !prev)}
				/>
			</div>
		</header>
	);
}
export default Header;

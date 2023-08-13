import { Link } from "react-router-dom";
import Submenus from "./SubmenuLink";
import { GoChevronDown } from "react-icons/go";
import { useState } from "react";

import {
	headphone,
	book,
	nike_shoe,
	furniture,
	handbag,
	laptop,
} from "../assets/categories";

function Navbar({ openMenu, onClose }) {
	const navLinks = [
		{
			id: 1,
			label: "Categories",
			icon: <GoChevronDown />,
			children: [
				{
					label: "Furniture",
					itemsAvailable: 212,
					imageSrc: furniture,
					altText: "Furniture",
				},
				{
					label: "Shoe",
					itemsAvailable: 212,
					imageSrc: nike_shoe,
					altText: "Shoe",
				},
				{
					label: "Headphone",
					itemsAvailable: 212,
					imageSrc: headphone,
					altText: "Headphone",
				},
				{
					label: "Laptop",
					itemsAvailable: 212,
					imageSrc: laptop,
					altText: "Laptop",
				},
				{
					label: "Book",
					itemsAvailable: 212,
					imageSrc: book,
					altText: "Book",
				},
				{
					label: "Handbag",
					itemsAvailable: 212,
					imageSrc: handbag,
					altText: "Handbag",
				},
			],
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

	const [openSubmenuOnClick, setOpenSubmenuOnClick] = useState(false);

	return (
		<nav className={`absolute lg:relative h-[56px] flex items-center`}>
			{/* Overlay */}
			{openMenu && (
				<div
					className={"fixed z-20 inset-0 bg-black/10 lg:hidden"}
					onClick={onClose}
				></div>
			)}
			{/* The menu appear on mobile */}
			<div
				className={`fixed z-20 left-1/2 -translate-x-1/2 w-11/12 lg:w-auto lg:h-auto lg:static lg:left-auto lg:top-auto bg-gray-100 lg:bg-transparent transition duration-300 ${
					openMenu
						? "top-10 opacity-100 translate-y-0"
						: "top-0 opacity-0 -translate-y-full"
				} lg:opacity-100 lg:translate-y-0 lg:translate-x-0 rounded-lg border lg:border-none shadow-lg lg:shadow-none p-3 lg:p-0`}
			>
				<ul
					className={`lg:max-w-7xl flex flex-col lg:flex-row lg:items-center lg:gap-4 p-3 lg:p-0 lg:rounded-none `}
				>
					{navLinks.map((link) => {
						return (
							<li
								key={link.id}
								className="font-medium relative group"
								onClick={() => setOpenSubmenuOnClick((prev) => !prev)}
							>
								{link.path ? (
									<Link
										to={link.path}
										className="flex items-center gap-2 p-1 px-2 hover:bg-black/5 rounded lg:hover:bg-transparent lg:hover:text-slate-800"
									>
										<span>{link.label}</span>
									</Link>
								) : (
									<div className="flex items-center justify-between cursor-pointer rounded">
										<span className="p-1 px-2">{link.label}</span>
										<span className="group-hover:text-blue-600 lg:group-hover:translate-y-1">
											{link.icon}
										</span>
									</div>
								)}
								{/* dropdown  */}
								{link.children?.length > 0 && (
									<div
										className={`lg:absolute z-20 top-full left-0 pt-1 lg:pt-4 ${
											openSubmenuOnClick ? "block" : "hidden"
										} lg:hidden lg:group-hover:block`}
									>
										<Submenus
											menu={link}
											className={`border-t w-full p-1 lg:p-2 grid gap-x-2 grid-cols-2 lg:grid-cols-dropdown grid-flow-row lg:rounded-lg lg:bg-white lg:border lg:shadow-lg transition duration-300 opacity-0 -translate-y-2 lg:translate-y-0 lg:-translate-x-2 animate-popUp`}
											childrenClassName={
												"lg:bg-gray-500/5 lg:flex lg:flex-row lg:items-center gap-2 hover:bg-blue-200 rounded"
											}
										/>
									</div>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}
export default Navbar;

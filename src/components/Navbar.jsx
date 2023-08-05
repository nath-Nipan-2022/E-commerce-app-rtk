import { Link } from "react-router-dom";
import Submenus from "./SubmenuLink";
import { GoChevronDown } from "react-icons/go";
import { useState } from "react";

import demoImg from "../assets/slider/photo-1593359863503-f598684c806f-removebg-preview.png";
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
					imageSrc: demoImg,
					altText: "Furniture",
				},
				{
					label: "Shoe",
					itemsAvailable: 212,
					imageSrc: demoImg,
					altText: "Shoe",
				},
				{
					label: "Headphone",
					itemsAvailable: 212,
					imageSrc: demoImg,
					altText: "Headphone",
				},
				{
					label: "Laptop",
					itemsAvailable: 212,
					imageSrc: demoImg,
					altText: "Laptop",
				},
				{
					label: "Book",
					itemsAvailable: 212,
					imageSrc: demoImg,
					altText: "Book",
				},
				{
					label: "Handbag",
					itemsAvailable: 212,
					imageSrc: demoImg,
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
		<nav className={`h-[56px] flex items-center`}>
			{/* Overlay */}
			{openMenu && (
				<div
					className={"fixed z-10 inset-0 bg-black/10 md:hidden"}
					onClick={onClose}
				></div>
			)}
			<div
				className={`fixed z-20 left-1/2 -translate-x-1/2 w-11/12 lg:w-auto lg:h-auto lg:static lg:left-auto lg:top-auto bg-gray-100 lg:bg-transparent ${
					openMenu ? "translate-y-0 top-10" : "top-0 -translate-y-full"
				} lg:translate-y-0 lg:translate-x-0 transition duration-300 rounded-lg border lg:border-none shadow-lg lg:shadow-none p-3 lg:p-0`}
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
									<div className="flex items-center justify-between hover:bg-black/5 lg:hover:bg-transparent cursor-pointer rounded">
										<span className="p-1 px-2">{link.label}</span>
										<span className="lg:group-hover:translate-y-1">
											{link.icon}
										</span>
									</div>
								)}

								{link.children?.length > 0 && (
									<div
										className={`lg:absolute z-20 top-full left-0 -translate-x-1/4 ${
											openSubmenuOnClick ? "block" : "hidden"
										} lg:hidden lg:group-hover:block `}
									>
										<Submenus
											menu={link}
											className={`w-full p-2 grid gap-4 grid-cols-2 lg:grid-cols-[200px_minmax(200px,_1fr)_200px] grid-flow-row lg:rounded-lg lg:bg-white lg:border lg:shadow-lg transition duration-300 opacity-0 -translate-x-2 animate-popUp`}
											childrenClassName={"hover:bg-blue-600/10 rounded"}
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

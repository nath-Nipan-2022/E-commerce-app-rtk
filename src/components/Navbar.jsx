import { Link } from "react-router-dom";
import Submenus from "./SubmenuLink";
import { GoChevronDown } from "react-icons/go";
import { useState } from "react";

function Navbar({ openMenu, onClose }) {
	const navLinks = [
		{
			id: 1,
			label: "Categories",
			icon: <GoChevronDown />,
			children: ["Men", "Women", "Kids"],
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

	const [openSubmenu, setOpenSubmenu] = useState(false);

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
				className={`fixed z-20 left-0 top-0 w-52 md:w-auto h-screen md:h-auto md:static md:left-auto md:top-auto bg-gray-100 md:bg-transparent ${
					openMenu ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 transition duration-300 rounded-lg border md:border-none shadow-lg md:shadow-none p-3 md:p-0`}
			>
				<ul
					className={`lg:max-w-7xl flex flex-col lg:flex-row lg:items-center lg:gap-4 p-3 lg:p-0 lg:rounded-none lg:bg-transparent`}
				>
					{navLinks.map((link) => {
						return (
							<li
								key={link.id}
								className="font-medium relative group"
								onClick={() => setOpenSubmenu((prev) => !prev)}
							>
								{!link.path ? (
									<span className="block hover:bg-black/10 cursor-pointer p-1 px-2 rounded">
										{link.label}
									</span>
								) : (
									<Link
										to={link.path}
										className="flex items-center gap-2 p-1 px-2 hover:bg-black/10 rounded lg:hover:bg-transparent lg:hover:text-slate-800"
									>
										<span>{link.label}</span>
										<span className="inline-block transition lg:group-hover:translate-y-1">
											{link.icon}
										</span>
									</Link>
								)}

								{link.children?.length > 0 && (
									<div
										className={`lg:absolute z-20 top-full left-0 h-0 lg:h-auto transition ${
											openSubmenu ? "visible h-32" : "invisible"
										} hover:visible lg:group-hover:visible lg:group-hover:h-32`}
									>
										<Submenus
											menu={link}
											className={"hover:bg-black/10 rounded"}
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

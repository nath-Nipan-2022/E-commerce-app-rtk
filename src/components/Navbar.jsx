import { Link } from "react-router-dom";
import Submenus from "./SubmenuLink";
import { GoChevronDown } from "react-icons/go";
import { useState } from "react";
import { navLinks } from "../constants";

function Navbar({ openMenu, onClose }) {
	const [openSubmenuOnClick, setOpenSubmenuOnClick] = useState(false);

	return (
		<nav className={`absolute lg:relative h-[56px] flex items-center`}>
			{/* Overlay */}
			{openMenu && (
				<div
					className={
						"fixed z-20 inset-0 bg-black/50 lg:hidden opacity-0 animate-fadeIn"
					}
					onClick={onClose}
				></div>
			)}
			{/* The menu appear on mobile */}
			<div
				className={`fixed z-20 left-1/2 -translate-x-1/2 lg:translate-x-0 w-11/12 lg:w-auto lg:h-auto lg:static lg:left-auto lg:top-auto bg-gray-100 lg:bg-transparent transition duration-300 ${
					openMenu
						? "top-10 opacity-100 translate-y-0"
						: "top-0 opacity-0 -translate-y-full"
				} lg:opacity-100 lg:translate-y-0 rounded-lg border lg:border-none shadow-lg lg:shadow-none p-3 lg:p-0`}
			>
				<ul
					className={`lg:max-w-7xl flex flex-col lg:flex-row lg:items-center lg:gap-4 p-3 lg:p-0 lg:rounded-none `}
				>
					{navLinks.map((link) => {
						return (
							<li
								key={link.id}
								className="relative group"
								onClick={() => setOpenSubmenuOnClick((prev) => !prev)}
							>
								{!link.hasDropdown ? (
									<Link
										to={link.path}
										className="flex items-center gap-1 lg:gap-2 hover:bg-[#eaeaea] rounded lg:hover:bg-transparent"
									>
										<span className="p-1 px-2 text-gray-600 lg:hover:text-slate-900">
											{link.label}
										</span>
									</Link>
								) : (
									<div className="flex items-center justify-between cursor-pointer rounded">
										<span className="p-1 px-2 text-gray-600 lg:hover:text-slate-900">
											{link.label}
										</span>
										<span className="text-gray-600 group-hover:text-slate-900 transition duration-500 lg:group-hover:translate-y-1">
											<GoChevronDown />
										</span>
									</div>
								)}
								{/* dropdown  */}
								{link.hasDropdown && (
									<div
										className={`lg:absolute z-20 top-full left-0 lg:pt-4 ${
											openSubmenuOnClick ? "block" : "hidden"
										} lg:hidden lg:group-hover:block`}
									>
										<div className="lg:bg-white lg:border lg:shadow-lg lg:rounded-lg -translate-y-2 lg:-translate-x-2 lg:translate-y-0 opacity-0 animate-popUp transition duration-300">
											<h4 className="text-gray-600 p-2 lg:p-3 border-b">
												Top Categories
											</h4>
											<Submenus
												menu={link}
												className={`w-full p-2 lg:p-4 grid gap-2 grid-cols-2 lg:grid-cols-dropdown`}
												childrenClassName={
													"lg:bg-gray-500/5 lg:flex lg:flex-row lg:items-center hover:bg-[#eaeaea] rounded border-[#eaeaea]"
												}
											/>
										</div>
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

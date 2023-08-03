import { GoPerson } from "react-icons/go";
import { BsMenuApp, BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import logo from "../assets/shopping logo.png";
import { useState } from "react";
import Navbar from "./Navbar";

function Header() {
	const [openMenu, setOpenMenu] = useState(false);
	
	const linksWithIcon = [{
		path: '/account', label: 'Account', icon: <GoPerson />,
	},
	{
		path: '/cart', label: 'Cart', icon: <BsCart2 />,
	},
	];

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
				{
					linksWithIcon.map(link => <Link to={link.path} key={link.label} className="flex items-center gap-2">
						{link.icon}
						<span>{link.label}</span>
					</Link>)
				}
				<BsMenuApp
					className="block cursor-pointer md:hidden"
					onClick={onMenuClose}
				/>
			</div>
		</header>
	);
}
export default Header;

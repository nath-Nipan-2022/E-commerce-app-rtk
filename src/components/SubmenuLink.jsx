import { Link } from "react-router-dom";

function Submenus({ menu, className }) {
	return (
		<ul className="w-full lg:w-56 p-2 transition duration-400 rounded-lg lg:bg-blue-50 lg:shadow font-medium">
			{menu.children?.map((item, i) => {
				return (
					<li key={i}>
						<Link
							to={menu.label + "/" + item}
							className={`block p-1 lg:py-2 px-3 ${className}`}
						>
							{item}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
export default Submenus;

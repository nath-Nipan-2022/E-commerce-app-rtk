import { Link } from "react-router-dom";

function Submenus({ menu }) {
	return (
		<ul className="w-56 p-2 mt-10 transition duration-400 rounded-lg bg-blue-50 text-slate-600 shadow font-medium">
			{menu.children?.map((item, i) => {
				return (
					<li key={i}>
						<Link
							to={menu.label + "/" + item}
							className="block py-2 px-3 rounded-md hover:bg-slate-700 hover:text-white"
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

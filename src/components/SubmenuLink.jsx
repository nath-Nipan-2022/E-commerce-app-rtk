import { Link } from "react-router-dom";

function Submenus({ menu, className,childrenClassName  }) {
	return (
		<ul className={className}>
			{menu.children?.map((item, i) => {
				return (
					<li key={i}>
						<Link
							to={menu.label.toLowerCase() + "/" + item.toLowerCase()}
							className={`block p-1 lg:py-2 px-3 ${childrenClassName}`}
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

import { Link } from "react-router-dom";

function Submenus({ menu, className, childrenClassName }) {
	return (
		<ul className={className}>
			{menu.children?.map((item, i) => {
				return (
					<li key={i} className="mb-2">
						<Link
							to={menu.label.toLowerCase() + "/" + item.label.toLowerCase()}
							className={`block p-1 ${childrenClassName} bg-black/5 flex flex-col lg:flex-row items-center gap-2`}
						>
							<figure className="p-2 w-14 aspect-square hidden lg:block">
								<img src={item.imageSrc} alt={item.altText} />
							</figure>
							<div className="p-2 lg:w-44">
								<h3>{item.label}</h3>
								<p className="text-sm text-gray-600">
									{item.itemsAvailable} Items Available
								</p>
							</div>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
export default Submenus;

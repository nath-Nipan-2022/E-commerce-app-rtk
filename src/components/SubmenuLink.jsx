import { Link } from "react-router-dom";

function Submenus({ menu, className, childrenClassName }) {
	return (
		<ul className={className}>
			{menu.children?.map((item, i) => {
				return (
					<li key={i} className="mb-2">
						<Link
							to={menu.label.toLowerCase() + "/" + item.label.toLowerCase()}
							className={`block p-2 ${childrenClassName}`}
						>
							<figure className="p-2 w-2/6 aspect-square hidden lg:block">
								<img
									src={item.imageSrc}
									alt={item.altText}
									className="scale-150 h-full object-cover"
								/>
							</figure>
							<div className="lg:p-2 lg:w-44">
								<h3 className="text-sm lg:text-base">{item.label}</h3>
								<p className="text-xs lg:text-sm text-gray-700">
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

import { Link } from "react-router-dom";

function Submenus({ menu, className, childrenClassName }) {
	return (
		<ul className={className}>
			{menu.children?.map((item, i) => {
				return (
					<li key={i}>
						<Link
							to={menu.label.toLowerCase() + "/" + item.label}
							className={`block p-2 ${childrenClassName}`}
						>
							<figure className="p-2 w-20 aspect-square hidden lg:block"> 
								<img
									src={item.imageSrc}
									alt={item.altText}
									className="h-full w-full object-cover"
								/>
							</figure>
							<div className="flex flex-col justify-between sm:flex-row sm:pr-8 lg:flex-col lg:p-2 lg:w-44">
								<h6 className="text-sm lg:text-base">{item.label}</h6>
								<p className="text-xs lg:text-sm text-slate-500">
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

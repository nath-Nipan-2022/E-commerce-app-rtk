// import { useState } from "react";
import { Link } from "react-router-dom";

function ShowSearchedProducts({ products, onSelect }) {
	const renderNames = products.map((product) => (
		<Link
			key={product.id}
			to={"/products/" + product.id}
			onClick={onSelect}
			className="p-1.5 px-5 font-medium block hover:bg-black/10"
		>
			{product.attributes.name}
		</Link>
	));

	return (
		<div className="relative">
			<ul className="absolute left-0 top-full mt-4 py-2 w-full lg:w-96 max-w-md animate-fadeIn bg-white border rounded-md shadow-lg">
				{renderNames}
			</ul>
		</div>
	);
}

export default ShowSearchedProducts;

import { useState } from "react";
import { Link } from "react-router-dom";

function ProductsListItem({ product }) {
	return (
		<div>
			<Link to={`products/${product.id}`} className="group">
				<div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
					<img
						src={product.imageSrc}
						alt={product.imageAlt}
						className="h-full w-full object-cover object-center transition group-hover:scale-105"
					></img>
				</div>
				<h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
				<p className="mt-1 text-lg font-medium text-gray-900">
					{product.price}
				</p>
			</Link>
		</div>
	);
}
export default ProductsListItem;

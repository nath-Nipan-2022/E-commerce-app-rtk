import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function ProductsListItem({ product }) {
	return (
		<div>
			<Link to={`product/${product.name.toLowerCase()}`} className="group">
				<div className="aspect-square overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
					<img
						src={product.imageSrc}
						alt={product.imageAlt}
						className="h-full w-full object-cover object-center transition group-hover:scale-105"
					></img>
				</div>
				<div className="font-medium">
					<div className="flex justify-between items-center ">
						<h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
						<p className="mt-1 text-2xl text-slate-800">{product.price}</p>
					</div>
					<div className="mt-3">
						<Button
							rounded
							className="bg-transparent text-slate-600 border border-slate-400 hover:bg-slate-900 hover:border-slate-900 hover:text-white h-auto py-1.5 px-4 text-base"
						>
							Add to Cart
						</Button>
					</div>
				</div>
			</Link>
		</div>
	);
}
export default ProductsListItem;

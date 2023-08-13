import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Wishlist from "./Wishlist";
import { useDispatch } from "react-redux";
import { addCart } from "../store";

function ProductsListItem({ product }) {
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();

	const addToCart = () => {
		setQuantity((prev) => prev + 1);

		dispatch(
			addCart({
				...product,
				quantity: quantity,
			})
		);
	};

	return (
		<div className="relative group">
			<Link to={`products/${product.id}`}>
				<figure className="aspect-square overflow-hidden rounded-lg bg-gray-200">
					<img
						src={product.images[0]}
						alt={product.altText}
						className="h-full w-full object-cover object-center transition group-hover:scale-105"
					></img>
				</figure>
				<article className="font-medium">
					<h3 className="text-lg mt-1 text-gray-700">{product.name}</h3>
					<p className="text-lg mt-2 lg:mt-4 pb-1 sm:text-xl text-slate-700">
						${product.price}
					</p>
				</article>
			</Link>
			<Button
				className="absolute right-0 bottom-0 hover:bg-slate-900 hover:border-slate-900 hover:text-white py-1.5 px-3 md:px-4 text-xs lg:text-base rounded-lg border border-gray-300"
				onClick={addToCart}
			>
				Add to Cart
			</Button>
			<Wishlist productCard={product} />
		</div>
	);
}
export default ProductsListItem;

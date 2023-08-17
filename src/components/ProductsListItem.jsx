import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Wishlist from "./Wishlist";
import { useDispatch } from "react-redux";
import { addCart } from "../store";
import ProductImage from "./ProductImage";

function ProductsListItem({ product }) {
	const { name, price, images } = product.attributes;

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
				<ProductImage product={product} url={images.data[0].attributes.url} />
				<article className="font-medium">
					<h3 className="text-lg my-2 text-gray-700">{name}</h3>
					<p className="text-lg mb-2 md:text-xl text-slate-700">
						${price}
					</p>
				</article>
			</Link>
			<Button
				className="mt-2 hover:bg-slate-900 hover:border-slate-900 hover:text-white py-1.5 px-3 sm:px-4 text-xs lg:text-base rounded-lg border border-gray-300"
				onClick={addToCart}
			>
				Add to Cart
			</Button>
			<Wishlist productCard={product} />
		</div>
	);
}

export default ProductsListItem;

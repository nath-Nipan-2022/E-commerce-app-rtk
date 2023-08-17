import { Link } from "react-router-dom";
import Button from "./Button";
import Panel from "./Panel";
import { GoStar, GoStarFill } from "react-icons/go";
import { useState } from "react";
import Wishlist from "./Wishlist";
import { useDispatch } from "react-redux";
import { addCart } from "../store/slices/cartsSlice";
import Counter from "./Counter";
import ProductImage from "./ProductImage";

function ProductDetails({ product }) {
	const [imageIndex, setImageIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const { name, price, images, desc } = product.attributes;
	const [review, setReview] = useState(4);

	const dispatch = useDispatch();
	const addToCart = () => {
		dispatch(
			addCart({
				...product,
				quantity: quantity,
			})
		);
	};

	const increment = () => {
		setQuantity((prev) => prev + 1);
	};
	const decrement = () => {
		setQuantity((prev) => prev - 1);
	};
	const renderImgBoxes = images.data.map((image, i) => (
		<ProductImage
			key={i}
			url={image.attributes.url}
			alt={desc}
			className="cursor-pointer group w-1/4 lg:w-full lg:h-1/4"
			onMouseEnter={() => setImageIndex(i)}
		/>
	));

	const renderReviews = Array(5)
		.fill(0)
		.map((_, i) => {
			return (
				<GoStarFill
					key={i}
					className={`${i < review ? "text-yellow-500" : "text-gray-300"}`}
				/>
			);
		});

	const renderColorBoxes = Array(4)
		.fill(0)
		.map((_, i) => {
			return (
				// These are like Accordions,
				<Button
					key={i}
					className={
						"w-8 h-8 rounded-full outline outline-gray-300 outline-offset-2 bg-gray-300 hover:outline-rose-400 hover:bg-rose-300 border-0"
					}
				/>
			);
		});

	return (
		<section className="flex flex-col gap-6 lg:gap-12 md:flex-row">
			{/* Left Section special classNames */}
			<section className={`md:w-1/2 flex items-start flex-col lg:flex-row-reverse lg:gap-4`}>
				<div className="relative pb-4 flex-1">
					<ProductImage
						url={images.data[imageIndex].attributes.url}
						product={product.attributes}
					/>
					<Wishlist productCard={product} />
				</div>
				{/* Images column special classNames*/}
				<div className="flex gap-2 justify-between lg:flex-col lg:w-20">{renderImgBoxes}</div>
			</section>
			{/* Right Section */}
			<section>
				<Panel className={"pb-4"}>
					<h2 className="text-2xl font-medium">{name}</h2>
					<p className="text-gray-600 py-2">{desc}</p>
					<div className="flex gap-2">
						<span className="flex gap-1 items-center py-1">
							{renderReviews}
						</span>
						<span className="p-1">(122 reviews)</span>
					</div>
				</Panel>

				<Panel className={"border-t py-2"}>
					<h3 className="text-lg">${price}</h3>
					<p className="text-gray-600 py-1">
						Suggested payments with 6 months special financing.
					</p>
				</Panel>

				<Panel className="border-t py-2">
					<h3 className="font-medium">Choose a color</h3>
					<div className="py-4 flex gap-3">{renderColorBoxes}</div>
				</Panel>

				<Panel className="border-t py-4">
					<Panel className="flex items-center gap-6">
						<Counter
							count={quantity}
							onIncrement={increment}
							onDecrement={decrement}
							className={"rounded-md bg-rose-100"}
						/>
						<div className="text-gray-600 text-sm">
							Only <span className="text-orange-600 font-medium">{212}</span>{" "}
							items left.
						</div>
					</Panel>
					<Panel className="mt-6 flex items-center gap-6">
						<Link
							to={"/"}
							className="py-2 px-4 lg:px-6 text-xs lg:text-base rounded-lg border bg-slate-900 text-white border-slate-900 transition hover:bg-slate-700 hover:border-slate-700"
						>
							Buy Now
						</Link>
						<Button
							className="hover:bg-slate-900 hover:border-slate-900 hover:text-white py-1.5 px-3 md:px-4 text-xs lg:text-base rounded-lg transition border border-gray-300"
							onClick={addToCart}
						>
							Add to Cart
						</Button>
					</Panel>
				</Panel>
			</section>
		</section>
	);
}
export default ProductDetails;

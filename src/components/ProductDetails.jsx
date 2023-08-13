import { Link } from "react-router-dom";
import Button from "./Button";
import Panel from "./Panel";
import { GoStar, GoStarFill } from "react-icons/go";
import { useState } from "react";
import Wishlist from "./Wishlist";
import { useDispatch } from "react-redux";
import { addCart } from "../store/slices/cartsSlice";
import Counter from "./Counter";

function ProductDetails({ product }) {
	const [imageIndex, setImageIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);

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

	const renderImgBoxes = product.images.map((imageUrl, i) => (
		<figure
			key={i}
			onClick={() => setImageIndex(i)}
			className="cursor-pointer border aspect-square w-28 bg-gray-200 rounded-md group"
		>
			<img
				src={imageUrl}
				alt={product.altText}
				className="group-hover:scale-95 transition w-full aspect-square object-cover"
			/>
		</figure>
	));

	const renderReviews = Array(5)
		.fill(0)
		.map((_, i) => {
			if (i < 4) {
				return <GoStarFill key={i} />;
			} else {
				return <GoStar key={i} />;
			}
		});

	const renderColorBoxes = Array(5)
		.fill(0)
		.map((_, i) => {
			return (
				// These are like Accordions,
				<Button
					key={i}
					className={
						"w-8 h-8 rounded-full outline outline-gray-300 outline-offset-2 bg-gray-300 hover:outline-slate-700 hover:bg-rose-500 border-0"
					}
				/>
			);
		});

	return (
		<section className="md:px-6 flex flex-col gap-6 sm:gap-12 md:flex-row">
			{/* Left Section */}
			<section className="pt-2 md:w-1/2">
				<div className="relative rounded-md grid place-items-center bg-gray-200 border">
					<figure className="w-full aspect-square min-h-[290px]">
						<img
							src={product.images[imageIndex]}
							alt={product.altText}
							width={300}
							height={300}
							className="object-cover w-full h-full rounded"
						/>
					</figure>
					<Wishlist productCard={product} />
				</div>
				<div className="mt-6 flex gap-2 lg:gap-10 justify-between ">
					{renderImgBoxes}
				</div>
			</section>
			{/* Right Section */}
			<section className="md:w-2/5">
				<Panel className={"pb-4"}>
					<h2 className="text-2xl font-medium">{product.name}</h2>
					<p className="text-gray-600 py-2">
						A perfect balance of exhilarating high-fidelity audio and the
						effortless magic of {product.name}
					</p>
					<div className="flex gap-2">
						<span className="flex gap-1 items-center py-1">
							{renderReviews}
						</span>
						<span className="p-1">(122 reviews)</span>
					</div>
				</Panel>

				<Panel className={"border-t py-4"}>
					<h3 className="text-lg font-semibold">${product.price}</h3>
					<p className="text-gray-600 py-1">
						Suggested payments with 6 months special financing.
					</p>
				</Panel>

				<Panel className="border-t py-4">
					<h3 className="font-semibold">Choose a color</h3>
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

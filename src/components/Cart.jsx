import { GoX } from "react-icons/go";
import { useDispatch } from "react-redux";
import {
	incrementQuantity,
	decrementQuantity,
	removeCart,
} from "../store/slices/cartsSlice";
import Counter from "./Counter";

function Cart({ className, cartItem }) {
	const { name, price, quantity, images, altText } = cartItem;

	const dispatch = useDispatch();

	const increment = () => {
		dispatch(incrementQuantity(cartItem)); // <- action object is different
	};

	const decrement = () => {
		dispatch(decrementQuantity(cartItem)); // <- action object is different
	};

	const handleRemove = () => {
		dispatch(removeCart(cartItem));
	};

	return (
		<div className={`flex items-center gap-4 ${className}`}>
			<figure className="w-14 h-16 rounded overflow-hidden">
				<img
					src={images[0]}
					alt={altText}
					className="w-full h-full object-cover"
				/>
			</figure>
			<article className="flex-1">
				<h3 className="mb-2 text-gray-700 flex gap-1 justify-between">
					{name}
					<div
						onClick={handleRemove}
						className="w-6 h-6 grid place-items-center cursor-pointer group"
					>
						<GoX className="text-gray-500 group-hover:text-gray-900" />
					</div>
				</h3>
				<div className="mt-2 flex gap-2 justify-between items-center">
					{/* counter*/}
					<Counter
						className={"border rounded-md"}
						count={quantity}
						onIncrement={increment}
						onDecrement={decrement}
					/>
					<p>${price}</p>
				</div>
			</article>
		</div>
	);
}
export default Cart;

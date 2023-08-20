import { GoX } from "react-icons/go";
import { useDispatch } from "react-redux";
import {
	incrementQuantity,
	decrementQuantity,
	removeCart,
} from "../store/slices/cartsSlice";
import Counter from "./Counter";
import ProductImage from "./ProductImage";
import { toast } from "react-hot-toast";

function Cart({ className, cartItem }) {
	const { name, price, images, desc } = cartItem.attributes;

	const dispatch = useDispatch();

	const increment = () => {
		dispatch(incrementQuantity(cartItem)); // <- action object is different
	};

	const decrement = () => {
		dispatch(decrementQuantity(cartItem)); // <- action object is different
	};

	const handleRemove = () => {
		dispatch(removeCart(cartItem));
		toast(`Item removed from Cart!`, {
			icon:'❗',
			style: {
				border: "1px solid #9a9aaa",
				background: '#1b1b1b',
				color: '#f5f5f5',
			},
		});
	};

	return (
		<div className={`flex items-center gap-4 ${className}`}>
			<ProductImage className="w-14 h-14 rounded" url={images.data[0].attributes.url} alt={desc} />
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
						count={cartItem.quantity}
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

import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../store/slices/cartsSlice";
import { GoX } from "react-icons/go";

import Cart from "./Cart";
import { toast } from "react-hot-toast";
function CartList({ className, onClose }) {
	const carts = useSelector((state) => state.carts.list);
	const dispatch = useDispatch();

	const total = carts.reduce((total, { attributes, quantity }) => {
		return total + +attributes.price * quantity;
	}, 0);

	const renderCarts = carts.map((cart, i) => {
		return <Cart key={i} className={"py-4 border-b"} cartItem={cart} />;
	});

	const removeAllCarts = () => {
		dispatch(resetCart());
		toast(`Your Cart Is Empty Now!`, {
			icon: "😪",
			style: {
				border: "1px solid #9a9aaa",
				background: "#1b1b1b",
				color: "#f5f5f5",
			},
		});
	};

	return (
		<div
			className={`fixed z-20 h-full w-80 bg-white shadow-2xl top-0 right-0 translate-x-full animate-popUp overflow-y-auto`}
		>
			<article className="p-4 pb-0">
				<div
					onClick={onClose}
					className="bg-white border cursor-pointer hover:bg-gray-200 w-8 h-8 grid place-items-center rounded-full"
				>
					<GoX className="text-gray-600" />
				</div>
				<h2 className="mt-4 pb-2 font-medium border-b flex justify-between">
					<span>Order Summery</span>
					<span
						onClick={removeAllCarts}
						className="text-[10px] text-gray-600 bg-gray-100 cursor-pointer hover:bg-gray-200/80 p-1 px-2.5 rounded-2xl">remove all</span>
				</h2>
				<div>{renderCarts}</div>
			</article>
			<article className="sticky bottom-0 bg-white p-4 font-medium text-lg flex items-center justify-between">
				<span>Total</span>
				<span>${total.toFixed(2)}</span>
			</article>
		</div>
	);
}

export default CartList;

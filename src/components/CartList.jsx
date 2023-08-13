import { useSelector } from "react-redux";
import { GoX } from "react-icons/go";

import Cart from "./Cart";
function CartList({ className, onClose }) {
	const carts = useSelector((state) => state.carts.list);

	const total = carts.reduce((total, { price, quantity }) => {
		return total + +price * quantity;
	}, 0);

	const renderCarts = carts.map((cart, i) => {
		return <Cart key={i} className={"py-4"} cartItem={cart} />;
	});

	return (
		<div
			className={`fixed z-20 h-full w-80 bg-white shadow top-0 right-0 translate-x-full animate-popUp overflow-y-auto`}
		>
			<article className="p-4">
				<div
					onClick={onClose}
					className="bg-white border cursor-pointer hover:bg-gray-200 w-8 h-8 grid place-items-center rounded-full"
				>
					<GoX className="text-gray-600" />
				</div>
				<h2 className="my-2 font-medium">Order Summery</h2>
				<div>{renderCarts}</div>
			</article>
			<article className="sticky bottom-0 bg-white border-t p-4 font-medium text-lg flex items-center justify-between">
				<span>Total</span>
				<span>${total.toFixed(2)}</span>
			</article>
		</div>
	);
}

export default CartList;

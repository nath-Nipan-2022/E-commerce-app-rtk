import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../store";

import Cart from "./Cart";
function CartList({ className }) {
	const carts = useSelector((state) => state.carts.list);
	const dispatch = useDispatch();

	const deleteCart = (cart) => dispatch(removeCart(cart));

	const total = carts.reduce((total, { price }) => {
		return total + +price;
	}, 0);

	// console.log(JSON.stringify(carts));

	const renderCarts = carts.map((cart, i) => {
		return (
			<Cart
				key={i}
				className={"p-2 rounded cursor-pointer bg-white"}
				item={cart}
				onRemove={deleteCart}
			/>
		);
	});

	return (
		<div
			className={`fixed z-20 h-full w-72 pt-8 p-3 bg-white top-0 right-0 translate-x-full animate-popUp`}
		>
			<h2 className="mb-4 text-slate-700 font-semibold">
				Your Carts are waiting! 🚀
			</h2>
			<div className="flex flex-col divide-y gap-2">{renderCarts}</div>

			<div className="mt-4">
				Total : <span className="font-bold text-blue-800">${total}</span>
			</div>
		</div>
	);
}

export default CartList;

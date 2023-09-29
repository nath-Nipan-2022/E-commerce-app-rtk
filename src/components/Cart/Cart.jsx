import { GoX } from "react-icons/go";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeCart,
} from "../../store/slices/cartsSlice";

import Counter from "../Counter";
import { ProductImage } from "../Product";
import { toast } from "react-hot-toast";
import { toastStyles } from "../../constants/toastStyles";

function Cart({ className, cartItem }) {
  const { name, price, images, desc } = cartItem.attributes;

  const dispatch = useDispatch();

  const increment = () => {
    dispatch(incrementQuantity(cartItem));
  };

  const decrement = () => {
    dispatch(decrementQuantity(cartItem));
  };

  const handleRemove = () => {
    dispatch(removeCart(cartItem));
    toast(`Item removed from Cart!`, {
      icon: "❗",
      style: toastStyles,
    });
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <figure className="overflow-hidden rounded-md w-14 h-14 shrink-0">
        <ProductImage url={images.data[0].attributes.url} alt={desc} />
      </figure>
      <article className="flex-1">
        <h3 className="flex justify-between gap-1 mb-2">
          <span className="overflow-hidden max-h-11">{name}</span>
          <div
            onClick={handleRemove}
            className="grid w-6 h-6 cursor-pointer place-items-center group"
          >
            <GoX className="text-gray-500 group-hover:text-gray-900" />
          </div>
        </h3>
        <div className="flex items-center justify-between gap-2 mt-2">
          <Counter
            className={"border h-7 font-semibold"}
            count={cartItem.quantity}
            onIncrement={increment}
            onDecrement={decrement}
          />
          <p className="text-sm">${price}</p>
        </div>
      </article>
    </div>
  );
}
export default Cart;

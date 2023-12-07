import { GoX, GoAlertFill } from "react-icons/go";
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

function Cart({ cartItem }) {
  const { name, price, desc } = cartItem.attributes;

  const dispatch = useDispatch();

  const increment = () => {
    dispatch(incrementQuantity(cartItem));
  };

  const decrement = () => {
    dispatch(decrementQuantity(cartItem));
  };

  const handleRemove = () => {
    dispatch(removeCart(cartItem));
    toast(`Item removed from cart!`, {
      icon: <GoAlertFill />,
      style: toastStyles,
    });
  };

  return (
    <div className={`flex gap-4 p-3 pl-0 border-b border-neutral-300`}>
      <figure className="w-20 overflow-hidden rounded-md shrink-0">
        <ProductImage url={cartItem.image.attributes.url} alt={desc} />
      </figure>
      <article className="flex-1">
        <div className="flex justify-between gap-1 mb-2 ">
          <h3 className="overflow-hidden text-sm leading-tight max-h-11">
            {name}
          </h3>
          <span
            onClick={handleRemove}
            className="grid w-6 h-4 cursor-pointer place-items-center group"
          >
            <GoX className="text-gray-600 group-hover:text-gray-900" />
          </span>
        </div>

        <h3 className="text-sm">
          <span className="mr-1 text-gray-500">Color:</span>
          {cartItem.color}
        </h3>

        <div className="flex items-center justify-between gap-2 mt-2">
          <Counter
            className={"border border-neutral-300"}
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

import { memo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { resetCart } from "../../store/slices/cartsSlice";
import { useMakeOrdersMutation } from "../../store/apis/ordersApi";

import { GoX, GoAlert } from "react-icons/go";
import { BsChevronCompactRight } from "react-icons/bs";
import EmptyCartIcon from "../../assets/add_to_cart.svg";
import { toastStyles } from "../../constants/toastStyles";
import Button from "../Button";
import Cart from "./Cart";

const CartList = memo(function CartList({ isOpen, setIsOpen }) {
  const carts = useSelector((state) => state.carts.list);
  const dispatch = useDispatch();

  const total = carts.reduce((total, { attributes, quantity }) => {
    return total + +attributes.price * quantity;
  }, 0);

  const renderCarts = carts.map((cart, i) => {
    return <Cart key={i} cartItem={cart} />;
  });

  const removeAllCarts = () => {
    dispatch(resetCart());
    toast(`Your cart is empty now!`, {
      icon: <GoAlert />,
      style: toastStyles,
    });
  };

  const stripePromise = loadStripe(
    "pk_test_51Nw7pkSFuhcEPmVYHUItYLjBzKaORTDkWckhYaaMoZn4mwEI0INOwnnxmoj7caTsI62xHa4qEXKBfASiiJ2DQaaG005wkjn8Si"
  );
  const [makeOrder, { isLoading }] = useMakeOrdersMutation();

  const handlePayment = async () => {
    try {
      if (carts.length > 0) {
        const stripe = await stripePromise;
        const res = await makeOrder({ products: carts }).unwrap();

        await stripe.redirectToCheckout({
          sessionId: res.stripeSession.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed z-20 h-full w-full sm:w-80 bg-background-secondary top-0 right-0 border-l transition duration-300 ${
        isOpen
          ? "translate-x-0 shadow-2xl border-neutral-300"
          : "translate-x-full"
      }`}
    >
      <article className="px-5 py-4 pb-0 sm:px-3">
        <div
          onClick={() => setIsOpen(false)}
          className="grid w-8 h-8 border rounded-full cursor-pointer hover:bg-gray-200 place-items-center"
        >
          <GoX className="text-gray-600" />
        </div>
        <h2 className="flex justify-between pb-2 mt-4 font-medium border-b border-neutral-300">
          <span>Order Summery</span>
          <span
            onClick={removeAllCarts}
            className="text-[0.625rem] text-gray-900 font-medium cursor-pointer bg-[#e3e6ec] hover:bg-[#d3d6dc] p-1 px-2.5 rounded-full"
          >
            Remove all
          </span>
        </h2>
        <div>{renderCarts}</div>
        {carts.length === 0 && (
          <div>
            <figure className="h-[300px] md:h-[250px] ">
              <img
                src={EmptyCartIcon}
                alt="empty cart"
                width={100}
                height={150}
                className="w-full h-full"
              />
            </figure>
            <h3 className="py-2 font-semibold text-center">
              Add items to your cart
            </h3>
          </div>
        )}
      </article>
      <article className="sticky bottom-0 p-4 bg-background-secondary">
        <div className="flex items-center justify-between mb-4 text-lg font-medium">
          <span>Total</span>
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>
        <Button
          primary
          size={"small"}
          className="w-full rounded-lg"
          onClick={handlePayment}
          loadingWithChildren={isLoading}
        >
          Checkout
        </Button>
      </article>

      <div
        className={`absolute top-0 items-center hidden w-8 h-full transition -left-9 sm:flex ${
          !isOpen ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`grid h-12 rounded-full cursor-pointer w-14 place-items-center group bg-background-secondary`}
        >
          <BsChevronCompactRight className="text-3xl transition duration-300 text-gray-500 group-hover:text-blue-600 group-hover:translate-x-[2px] opacity-100" />
        </div>
      </div>
    </div>
  );
});
export default CartList;

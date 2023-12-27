import { loadStripe } from "@stripe/stripe-js";
import { memo, useMemo } from "react";
import { toast } from "react-hot-toast";
import { BsArrowRight, BsChevronCompactRight } from "react-icons/bs";
import { GoX } from "react-icons/go";
import EmptyCartIcon from "../../assets/empty_cart.webp";

// apis
import { useMakeOrdersMutation } from "../../store/apis/ordersApi";

// components
import Button from "../Button";
import Cart from "./Cart";

// hooks
import { useCartList } from "../../hooks/useCartList";
import { SignedOut, SignedIn, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const CartList = memo(function CartList() {
  const { cartList: carts, isOpen, dispatch, toggleCart } = useCartList();

  const total = carts.reduce((total, { attributes, quantity }) => {
    return total + +attributes.price * quantity;
  }, 0);

  const closeCart = () => {
    dispatch(toggleCart());
  };

  const removeAllCarts = () => {
    dispatch(resetCart());
    toast.success(`Your cart is empty now!`, {
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
    });
  };

  const stripePromise = useMemo(() => {
    return loadStripe(
      "pk_test_51Nw7pkSFuhcEPmVYHUItYLjBzKaORTDkWckhYaaMoZn4mwEI0INOwnnxmoj7caTsI62xHa4qEXKBfASiiJ2DQaaG005wkjn8Si"
    );
  }, []);

  const [makeOrder, { isLoading }] = useMakeOrdersMutation();

  const handlePayment = async () => {
    try {
      if (carts.length > 0) {
        const stripe = await stripePromise;
        const res = await makeOrder({ products: carts, user }).unwrap();

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
      className={`fixed z-20 h-full w-full sm:w-80 bg-background-secondary top-0 right-0 border-l transition-transform md:duration-300 ${
        isOpen
          ? "translate-x-0 shadow-2xl border-neutral-300"
          : "translate-x-full"
      }`}
    >
      <div className="absolute inset-0 overflow-x-hidden">
        <article className="sticky top-0 p-4 pb-0 bg-background-secondary">
          <button
            onClick={closeCart}
            className="grid w-8 h-8 rounded-full shadow cursor-pointer hover:bg-gray-200 place-items-center"
          >
            <GoX className="text-gray-600" />
          </button>
          <h2 className="flex justify-between py-4 font-semibold">
            <span className="text-gray-700">Order Summary</span>
            <span
              onClick={removeAllCarts}
              className="text-[0.625rem] text-gray-900 font-semibold cursor-pointer bg-neutral-200 hover:bg-neutral-300 p-1 px-2.5 rounded-full"
            >
              Remove all
            </span>
          </h2>
        </article>
        <article className="px-5 pb-0 sm:px-3">
          <div>
            {carts.map((cart, i) => (
              <Cart key={i} cartItem={cart} />
            ))}
          </div>
          {/* show empty state */}
          {carts.length === 0 && (
            <div className="py-4">
              <figure className="h-[280px] md:h-[250px]">
                <img
                  src={EmptyCartIcon}
                  alt="empty cart"
                  width={100}
                  height={150}
                  className="w-full h-full"
                />
              </figure>
              <h3 className="text-lg font-semibold text-center">
                Add items to your cart!
              </h3>
            </div>
          )}
        </article>
        <article className="sticky bottom-0 p-4 border-t bg-background-secondary border-neutral-300">
          <div className="flex items-center justify-between mb-3 font-semibold">
            <span className="text-gray-700">Total</span>
            <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>

          <SignedOut>
            <Link
              to="/sign-in"
              className="block px-4 py-2 text-xs text-center text-white rounded-lg btn-primary"
              onClick={() => dispatch(toggleCart())}
            >
              Login to Checkout
            </Link>
          </SignedOut>
          <SignedIn>
            <Button
              primary
              size={"small"}
              className="flex items-center justify-center w-full rounded-lg group"
              onClick={handlePayment}
              loadingWithChildren={isLoading}
            >
              Checkout
              <BsArrowRight className="ml-3 transition duration-300 group-hover:translate-x-2" />
            </Button>
          </SignedIn>
        </article>
      </div>

      <div
        className={`absolute top-0 items-center hidden w-8 h-full transition -left-9 sm:flex ${
          !isOpen ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        <div
          onClick={closeCart}
          className={`grid h-12 rounded-full cursor-pointer w-14 place-items-center group bg-background-secondary`}
        >
          <BsChevronCompactRight className="text-3xl transition duration-300 text-gray-500 group-hover:text-blue-600 group-hover:translate-x-[2px] opacity-100" />
        </div>
      </div>
    </div>
  );
});
export default CartList;

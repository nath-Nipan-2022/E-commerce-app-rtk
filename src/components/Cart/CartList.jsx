import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../store/slices/cartsSlice";
import Cart from "./Cart";
import { GoX } from "react-icons/go";
import EmptyCartIcon from "../../assets/add_to_cart.svg";
import { toastStyles } from "../../constants/toastStyles";
import Button from "../Button";
import { loadStripe } from "@stripe/stripe-js";
import { useMakeOrdersMutation } from "../../store/apis/ordersApi";

function CartList({ onClose }) {
  const carts = useSelector((state) => state.carts.list);
  const dispatch = useDispatch();

  const total = carts.reduce((total, { attributes, quantity }) => {
    return total + +attributes.price * quantity;
  }, 0);

  const renderCarts = carts.map((cart, i) => {
    return <Cart key={i} className={"p-3 border-b"} cartItem={cart} />;
  });

  const removeAllCarts = () => {
    dispatch(resetCart());
    toast(`Your Cart Is Empty Now!`, {
      icon: "😪",
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
      className={`fixed z-20 h-full w-full sm:w-80 bg-background-secondary shadow-2xl top-0 right-0 translate-x-full animate-slideIn overflow-y-auto`}
    >
      <article className="px-5 py-4 pb-0 sm:px-3">
        <div
          onClick={onClose}
          className="grid w-8 h-8 border rounded-full cursor-pointer hover:bg-gray-200 place-items-center"
        >
          <GoX className="text-gray-600" />
        </div>
        <h2 className="flex justify-between pb-2 mt-4 font-medium border-b">
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
          <div className="h-[250px]">
            <figure>
              <img
                src={EmptyCartIcon}
                alt="empty cart"
                width={100}
                height={150}
                className="w-full h-full"
              />
            </figure>
            <h6 className="py-2 text-sm text-center">Add items to your cart</h6>
          </div>
        )}
      </article>
      <article className="sticky bottom-0 p-4 bg-background-secondary">
        <div className="flex items-center justify-between mb-4 text-lg font-medium">
          <span>Total</span>
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>
        <Button
          className="py-1.5 text-sm rounded-lg justify-center border bg-slate-900 text-white border-slate-900 transition w-full hover:bg-slate-700 hover:border-slate-700"
          onClick={handlePayment}
          loadingWithChildren={isLoading}
        >
          Checkout
        </Button>
      </article>
    </div>
  );
}

export default CartList;

import { toast } from "react-hot-toast";
import { BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store";

function Wishlist({ productCard }) {
  const wishlist = useSelector(({ wishlist }) => wishlist.list);

  const isInWishlist = wishlist?.find((w) => w.id === productCard.id) ?? null;

  const dispatch = useDispatch();

  const toggleWishlist = () => {
    isInWishlist
      ? dispatch(removeFromWishlist(productCard))
      : dispatch(addToWishlist(productCard));

    toast.success(`${isInWishlist ? "Removed from" : "Added to"} Wishlist!`, {
      iconTheme: {
        primary: "#712721",
        secondary: "#FFFAEE",
      },
    });
  };

  return (
    <div
      className="p-1.5 absolute right-1 top-1 w-8 h-8 cursor-pointer"
      onClick={toggleWishlist}
    >
      <BsHeartFill
        className={`absolute w-5 h-5 left-1/2 -translate-x-1/2 transition text-[#db505b] ${
          isInWishlist ? "opacity-100 scale-100" : "opacity-0 scale-150"
        }`}
      />
      <BsHeartFill
        className={`absolute w-5 h-5 left-1/2 -translate-x-1/2 transition text-[#00000059] ${
          !isInWishlist ? "opacity-100 scale-100" : "opacity-0 scale-150"
        }`}
      />
    </div>
  );
}
export default Wishlist;

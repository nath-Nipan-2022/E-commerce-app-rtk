import { useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { toastStyles } from "../constants/toastStyles";

function Wishlist({ productCard }) {
  const [isWishlist, setIsWishlist] = useState(null);

  useEffect(() => {
    if (isWishlist) {
      toast("Added to Wishlist!", {
        icon: "❤",
        style: toastStyles,
      });
    } else if (isWishlist === false) {
      toast("Removed from Wishlist!", {
        icon: "❕",
        style: toastStyles,
      });
    }
  }, [isWishlist]);

  return (
    <div
      className="p-1.5 absolute right-1 top-1 w-8 h-8 cursor-pointer"
      onClick={() => setIsWishlist((prev) => !prev)}
    >
      <BsHeartFill
        className={`absolute w-5 h-5 left-1/2 -translate-x-1/2 transition text-[#db505b] ${
          isWishlist ? "opacity-100 scale-100" : "opacity-0 scale-150"
        }`}
      />
      <BsHeartFill
        className={`absolute w-5 h-5 left-1/2 -translate-x-1/2 transition text-[#00000059] ${
          !isWishlist ? "opacity-100 scale-100" : "opacity-0 scale-150"
        }`}
      />
    </div>
  );
}
export default Wishlist;

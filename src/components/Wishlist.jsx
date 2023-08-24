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
      className="p-1.5 absolute right-2 top-1.5 w-8 h-8 cursor-pointer drop-shadow"
      onClick={() => setIsWishlist((prev) => !prev)}
    >
      <BsHeartFill
        className={`absolute w-6 h-6 left-1/2 -translate-x-1/2 transition ${
          isWishlist ? "opacity-100 scale-100" : "opacity-0 scale-150"
        }`}
        style={{ color: "#db505b" }}
      />
      <BsHeartFill
        className={`absolute w-6 h-6 left-1/2 -translate-x-1/2 transition ${
          !isWishlist ? "opacity-100 scale-100" : "opacity-0 scale-150"
        }`}
        style={{ color: "#fff" }}
      />
    </div>
  );
}
export default Wishlist;

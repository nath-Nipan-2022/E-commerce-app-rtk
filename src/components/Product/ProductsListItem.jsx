import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../../store";
import Button from "../Button";
import Wishlist from "../Wishlist";
import ProductImage from "./ProductImage";
import ReviewsStars from "../Rating/ReviewsStars";
import { toast } from "react-hot-toast";
import { toastStyles } from "../../constants/toastStyles";

function ProductsListItem({ product }) {
  const { name, price, reviews, ratings, images } = product.attributes;

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      addCart({
        ...product,
      })
    );
    toast(`Item Added To Your Cart!`, {
      icon: "🔥",
      style: toastStyles,
    });
  };

  return (
    <div className="relative group cursor-pointer lg:hover:ring lg:hover:ring-slate-100 lg:p-2 lg:pb-3 rounded-md">
      <Link to={`products/${product.id}`}>
        <ProductImage product={product} url={images.data[0].attributes.url} />
        <article className="font-medium lg:px-2 text-gray-800">
          <h3 className="leading-snug lg:text-lg mt-2">{name}</h3>
          <ReviewsStars reviews={reviews} ratings={ratings} />
          <p className="text-lg mb-2 text-slate-700">${price}</p>
        </article>
      </Link>
      <Button
        className="lg:m-2 hover:bg-slate-900 hover:border-slate-900 hover:text-white py-1.5 px-3 sm:px-4 text-xs lg:text-base rounded-lg border border-gray-300 active:scale-95 transition"
        onClick={addToCart}
      >
        Add to Cart
      </Button>
      <Wishlist productCard={product} />
    </div>
  );
}

export default ProductsListItem;

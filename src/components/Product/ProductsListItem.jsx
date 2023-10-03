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
    <div className="relative rounded-md cursor-pointer group">
      <Link to={`/products/${product.id}`}>
        <figure className="overflow-hidden rounded-md aspect-square">
          <ProductImage
            url={images.data[0].attributes.url}
            alt={product.desc}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </figure>
        <article className="mt-2 text-sm font-medium text-gray-800">
          <h3 className="leading-tight lg:text-lg">{name}</h3>
          <ReviewsStars reviews={reviews} ratings={ratings} />
          <p className="my-2 lg:text-lg text-slate-700">${price}</p>
        </article>
      </Link>
      <Button
        secondary
        size={"small"}
        className="rounded-lg active:scale-95"
        onClick={addToCart}
      >
        Add to Cart
      </Button>
      <Wishlist productCard={product} />
    </div>
  );
}

export default ProductsListItem;

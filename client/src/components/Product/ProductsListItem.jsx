import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { GoAlertFill, GoCheckCircleFill } from "react-icons/go";

// components
import Button from "../Button";
import Wishlist from "../Wishlist";
import ProductImage from "./ProductImage";
import ReviewsStars from "../Rating/ReviewsStars";

import { useCartList } from "../../hooks/useCartList";

function ProductsListItem({ product }) {
  const { name, price, reviews, ratings, images, color_variants } =
    product.attributes;

  const { dispatch, addCart, cartList } = useCartList();
  const isAdded = cartList.find((cart) => cart?.id === product.id);

  const handleAddingCart = () => {
    dispatch(
      addCart({
        ...product,
        quantity: 1,
        color: color_variants.data[0].color_name,
        image: images.data[0],
      })
    );

    toast.success(`${isAdded ? "Already" : "Item"} added to your cart!`, {
      icon: isAdded ? <GoAlertFill /> : <GoCheckCircleFill />,
      iconTheme: {
        primary: "#1b1b1b",
        secondary: "#FFFAEE",
      },
    });
  };

  return (
    <div className="relative rounded-md lg:cursor-pointer group">
      <Link to={`/products/${product.id}`} className="inline-block w-full pb-8">
        <figure className="overflow-hidden rounded-md aspect-square">
          <ProductImage
            url={images.data[0].attributes.url}
            alt={product.desc}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </figure>
        <article className="mt-2 text-sm lg:text-base text-slate-700">
          <h3 className="font-semibold leading-tight">
            {name.length > 50 ? name.slice(0, 50) + "..." : name}
          </h3>
          <ReviewsStars reviews={reviews} ratings={ratings} />
          <p className="mt-1 mb-2 font-semibold">${price}</p>
        </article>
      </Link>
      <Button
        secondary
        size={"small"}
        className={`absolute bottom-0 left-0 rounded-lg ${
          isAdded ? "flex items-center gap-2 pl-2 font-semibold" : ""
        }`}
        onClick={handleAddingCart}
      >
        {isAdded && <GoCheckCircleFill />}
        {isAdded ? "Added to Cart" : "Add to Cart"}
      </Button>
      <Wishlist productCard={product} />
    </div>
  );
}

export default ProductsListItem;

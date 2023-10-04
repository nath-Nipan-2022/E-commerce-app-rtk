import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { toastStyles } from "../../constants/toastStyles";
import { addCart } from "../../store/slices/cartsSlice";

// components
import Button from "../Button";
import Counter from "../Counter";
import ReviewsStars from "../Rating/ReviewsStars";
import Wishlist from "../Wishlist";
import ProductImage from "./ProductImage";
import Chip from "../Chip";

function ProductDetails({ product }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const imageIndex = Number(searchParams.get("imageIndex")) ?? 0;
  const colorName = searchParams.get("color") ?? "";
  const [isAvailable, setIsAvailable] = useState(true);

  const onImageIndexChange = (i) => {
    searchParams.set("imageIndex", i);
    setSearchParams(searchParams, { replace: true });
  };

  const onColorChange = (color, i) => {
    searchParams.set("color", color.color_name);
    onImageIndexChange(i);
  };

  const [quantity, setQuantity] = useState(1);
  const [tempQty, setTempQty] = useState(0);
  const { name, desc, price, reviews, ratings, images } = product.attributes;

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      addCart({
        ...product,
        quantity: quantity,
      })
    );
    // for toasting
    if (quantity && quantity !== tempQty) {
      toast(`Item Added To Your Carts!`, {
        icon: "🔥",
        style: toastStyles,
      });
      setTempQty(quantity);
    }
  };

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    quantity > 1 && setQuantity((prev) => prev - 1);
  };

  const renderImgBoxes = images.data.map((image, i) => {
    let activeClass = i === imageIndex ? "shadow-xl p-1" : "";
    return (
      <figure
        key={i}
        onMouseEnter={() => onImageIndexChange(i)}
        className={`w-1/4 rounded-xl cursor-pointer group lg:w-full lg:h-1/4 ${activeClass}`}
      >
        <ProductImage
          url={image.attributes.url}
          alt={desc}
          className="rounded-lg select-none aspect-square"
        />
      </figure>
    );
  });

  const renderColorBoxes = product.attributes?.color_variants?.data.map(
    (color, i) => {
      const { color_name, color_code } = color;

      let activeClass =
        color.isAvailable && color_name === colorName
          ? "outline-accent-blue"
          : "hover:outline-accent-blue outline-neutral-300";

      return (
        <div key={i} title={color_name}>
          <Chip
            className={`outline outline-offset-2 cursor-pointer rounded-full w-7 h-7 ${activeClass}`}
            style={{ backgroundColor: `${color_code}` }}
            onClick={() => {
              setIsAvailable(color.isAvailable);
              if (!color.isAvailable) return;
              onColorChange(color, i);
            }}
          />
        </div>
      );
    }
  );

  return (
    <div className="flex flex-col gap-5 lg:gap-12 md:flex-row">
      {/* Left Section special classNames */}
      <section
        className={`md:w-[450px] lg:w-1/2 flex flex-col lg:flex-row-reverse lg:items-start lg:gap-4 relative`}
      >
        <figure className="relative mb-2 rounded-md lg:flex-1 h-[480px] md:h-[450px] overflow-hidden">
          <ProductImage
            url={images.data[imageIndex].attributes.url}
            alt={product.attributes.desc}
          />
          <Wishlist productCard={product} />
        </figure>
        {/* Images column special classNames*/}
        <div className="flex justify-between gap-2 lg:flex-col lg:w-20">
          {renderImgBoxes}
        </div>
      </section>
      {/* Right Section */}
      <section className="pt-2 mt-5 border-t md:border-0 md:mt-0 md:pt-0">
        <div className={"pb-4"}>
          <h2 className="text-2xl font-medium">{name}</h2>
          <p className="py-2 text-gray-600">{desc}</p>
          <ReviewsStars ratings={ratings} reviews={reviews} />
        </div>

        <div className={"border-t py-2"}>
          <h3 className="text-lg font-bold">${price}</h3>
          <p className="py-1 text-gray-600">
            Suggested payments with 6 months special financing.
          </p>
        </div>

        {product.attributes?.colors.data?.length > 0 && (
          <div className="py-2 border-t">
            <h3 className="flex flex-wrap items-center gap-2">
              <span className="font-bold">Color:</span>
              <span className="font-semibold text-accent-blue">
                {colorName}
              </span>
            </h3>
            <div className="flex gap-3 py-2">{renderColorBoxes}</div>
            {!isAvailable && (
              <div className="text-sm font-semibold text-red-500">
                Out of Stock!
              </div>
            )}
          </div>
        )}

        <div className="pt-2 border-t">
          <h3 className="font-bold ">Quantity</h3>
          <div className="flex items-center gap-4 mt-2">
            <Counter
              count={quantity}
              onIncrement={increment}
              onDecrement={decrement}
              className={"rounded-md bg-rose-100 h-8"}
            />
          </div>
          <div className="flex flex-col gap-3 mt-6 md:items-stretch">
            <Link
              to={"/"}
              className="px-3 py-2 text-xs text-center rounded-lg sm:py-2 sm:text-sm btn-primary"
            >
              Buy Now
            </Link>
            <Button
              secondary
              size={"small"}
              className="rounded-lg sm:py-2 sm:text-sm active:scale-95"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ProductDetails;

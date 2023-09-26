import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { toastStyles } from "../../constants/toastStyles";
import { addCart } from "../../store/slices/cartsSlice";

// components
import Button from "../Button";
import Counter from "../Counter";
import Panel from "../Panel";
import ReviewsStars from "../Rating/ReviewsStars";
import Wishlist from "../Wishlist";
import ProductImage from "./ProductImage";
import Chip from "../Chip";

function ProductDetails({ product }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const imageIndex = Number(searchParams.get("imageIndex")) || 0;
  const [isAvailable, setIsAvailable] = useState(true);

  const onImageIndexChange = (i) => {
    const params = { ...searchParams, imageIndex: i };
    setSearchParams(params, { replace: true });
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
          className="select-none rounded-xl aspect-square"
        />
      </figure>
    );
  });

  const renderColorBoxes = product.attributes?.color_variants?.data.map(
    (color, i) => {
      let activeClass =
        imageIndex === i
          ? "outline-accent-blue"
          : "hover:outline-accent-blue outline-transparent";
      const { color_name, color_code } = color;

      return (
        <div key={i}>
          <Chip
            className={`mx-auto outline cursor-pointer rounded-full w-10 h-10 ${activeClass}`}
            style={{ backgroundColor: `${color_code}` }}
            onClick={() => {
              onImageIndexChange(i);
              setIsAvailable(color.isAvailable);
            }}
          />
          <span className="block mt-1">{color_name}</span>
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
        {!isAvailable && (
          <duv className="absolute bottom-0 text-lg font-semibold text-red-500 left-1/2">
            Out of Stock!
          </duv>
        )}
      </section>
      {/* Right Section */}
      <section className="pt-2 mt-5 border-t md:border-0 md:mt-0 md:pt-0">
        <Panel className={"pb-4"}>
          <h2 className="text-2xl font-medium">{name}</h2>
          <p className="py-2 text-gray-600">{desc}</p>
          <ReviewsStars ratings={ratings} reviews={reviews} />
        </Panel>

        <Panel className={"border-t py-2"}>
          <h3 className="text-lg">${price}</h3>
          <p className="py-1 text-gray-600">
            Suggested payments with 6 months special financing.
          </p>
        </Panel>

        {product.attributes?.colors.data?.length > 0 && (
          <Panel className="py-2 border-t">
            <h3 className="font-bold">Choose a color</h3>
            <div className="flex gap-3 py-2">{renderColorBoxes}</div>
          </Panel>
        )}

        <Panel className="pt-2 border-t">
          <h3 className="font-bold ">Quantity</h3>
          <Panel className="flex items-center gap-4 mt-2">
            <Counter
              count={quantity}
              onIncrement={increment}
              onDecrement={decrement}
              className={"rounded-md bg-rose-100 h-8"}
            />
            <div className="text-sm text-gray-600">
              Only <span className="font-medium text-orange-600">{212}</span>{" "}
              items left.
            </div>
          </Panel>
          <Panel className="flex flex-col gap-2 mt-6 md:items-stretch">
            <Link
              to={"/"}
              className="py-1.5 md:py-2 px-4 sm:px-6 text-sm sm:text-base rounded-lg text-center border bg-slate-900 text-white border-slate-900 transition hover:bg-slate-700 hover:border-slate-700"
            >
              Buy Now
            </Link>
            <Button
              className="hover:bg-slate-900 hover:border-slate-900 hover:text-white py-1.5 px-2 md:px-4 md:py-2 text-sm sm:text-base rounded-lg transition border border-gray-300 justify-center active:scale-95"
              onClick={addToCart}
            >
              <span>Add to Cart</span>
            </Button>
          </Panel>
        </Panel>
      </section>
    </div>
  );
}
export default ProductDetails;

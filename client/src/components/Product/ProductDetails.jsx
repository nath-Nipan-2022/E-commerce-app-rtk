import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";

// components
import Button from "../Button";
import Chip from "../Chip";
import Counter from "../Counter";
import ReviewsStars from "../Rating/ReviewsStars";
import Wishlist from "../Wishlist";
import ProductImage from "./ProductImage";

//hooks
import { useCartList } from "../../hooks/useCartList";

function ProductDetails({ product }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const imageIndex = Number(searchParams.get("imageIndex")) ?? 0;
  const colorName = searchParams.get("color") ?? "";
  const selectedSize = searchParams.get("size") ?? "";

  const [quantity, setQuantity] = useState(1);
  const [tempQty, setTempQty] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);

  const { name, desc, price, reviews, ratings, images, color_variants } =
    product.attributes;

  const onFilter = (i, color) => {
    searchParams.set("imageIndex", i);

    let hasColor = color_variants.data[i];
    if (hasColor) {
      searchParams.set("color", hasColor.color_name);
      setIsAvailable(hasColor.isAvailable);
    } else if (color) {
      searchParams.set("color", color);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const { dispatch, addCart } = useCartList();

  const handleAddingCart = () => {
    if (quantity > tempQty) {
      dispatch(
        addCart({
          ...product,
          quantity,
          color: colorName || color_variants.data[0].color_name,
          image: images.data[imageIndex],
          size: selectedSize,
        })
      );
      toast.success("Item added successfully!");
      setTempQty(quantity);
    }
  };

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const renderImgBoxes = images.data.map((image, i) => {
    let activeClass = i === imageIndex ? "shadow-xl p-1" : "";
    return (
      <figure
        key={i}
        onMouseEnter={() => onFilter(i)}
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

  const renderColorBoxes = color_variants?.data.map((color, i) => {
    const { color_name, color_code } = color;

    const activeClass =
      color_name === colorName
        ? "outline-accent-blue"
        : "hover:outline-accent-blue outline-neutral-300";

    return (
      <div key={color.color_code} title={color_name}>
        <Chip
          className={`outline outline-offset-2 cursor-pointer rounded-full w-5 h-5 ${activeClass}`}
          style={{ backgroundColor: `${color_code}` }}
          onClick={() => onFilter(i, color_name)}
        />
      </div>
    );
  });

  const renderSizes = product.attributes?.sizes?.data.map((item) => (
    <Chip
      key={item.id}
      text={item.size}
      className={`py-2 text-xs px-4 border whitespace-nowrap rounded-lg ${
        item.size === selectedSize
          ? "border-accent-slate-blue bg-accent-slate-blue text-white"
          : "hover:border-accent-slate-blue hover:bg-accent-slate-blue hover:text-white"
      }`}
      onClick={() => {
        if (!item.enabled) return;
        searchParams.set("size", item.size);
        setSearchParams(searchParams, { replace: true });
      }}
      style={{ opacity: item.enabled ? 1 : 0.65 }}
    >
      {item.size}
    </Chip>
  ));

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
      <section className="[&>*:not(:first-child)]:py-2 mt-7 md:border-0 md:mt-0">
        <article className="pb-4">
          <h2 className="text-2xl font-medium">{name}</h2>
          <p className="py-2 text-sm text-gray-600">{desc}</p>
          <ReviewsStars ratings={ratings} reviews={reviews} />
        </article>

        <article>
          <h3 className="text-lg font-medium">${price}</h3>
          <p className="py-2 text-sm text-gray-600">
            Suggested payments with 6 months special financing.
          </p>
        </article>

        {color_variants?.data?.length > 0 && (
          <article>
            <h3 className="flex flex-wrap items-center gap-2 font-medium">
              <span>Color : </span>
              <span className="text-accent-blue">{colorName}</span>
            </h3>
            <div className="flex items-center gap-4 pl-1 mt-3 mb-2">
              {renderColorBoxes}
            </div>
            {!isAvailable && (
              <div className="text-sm font-medium text-red-500">
                Out of Stock!
              </div>
            )}
          </article>
        )}

        {product.attributes?.sizes && (
          <article>
            <h3 className="font-medium">Size</h3>
            <div className="flex flex-wrap max-w-md gap-2 mt-2 text-gray-500">
              {renderSizes}
            </div>
          </article>
        )}

        <article>
          <div className="flex gap-4 mt-2">
            <h3 className="font-medium">Quantity : </h3>
            <Counter
              count={quantity}
              onIncrement={increment}
              onDecrement={decrement}
              className={"rounded border h-8"}
            />
          </div>
          <div className="flex gap-3 mt-5">
            <Link
              to={"/"}
              className="flex-1 py-3 text-xs text-center rounded-lg btn-primary"
            >
              Buy Now
            </Link>
            <Button
              secondary
              size={"small"}
              className="flex-1 py-3 text-sm rounded-lg active:scale-95"
              onClick={handleAddingCart}
            >
              Add to Cart
            </Button>
          </div>
        </article>
      </section>
    </div>
  );
}
export default ProductDetails;

import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import RatingStarsInputs from "./Rating/RatingStarsInputs";
import { useSearchParams } from "react-router-dom";

function FilterPanel({
  products,
  subCats,
  onSubCatsChange,
  setPriceRange,
  setPriceOrder,
  setRatings,
  className,
}) {
  let maxAmount = getMaxPrice(products);
  const [maxPrice, setMaxPrice] = useState(maxAmount);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setMaxPrice(getMaxPrice(products));
  }, [products]);

  const handlePriceChange = (e) => {
    setMaxPrice(e.target.value);
    setPriceRange(e.target.value); // directly pass the value to the parent
  };

  const handlePriceOrderChange = (order) => {
    setPriceOrder(order);
  };

  const selectedSubCats = searchParams.get("sub-cats")?.split(",") ?? [];
  const selectedPriceOrder = searchParams.get("price-order");

  const renderSubCatsInputs = subCats?.data.map((input) => {
    const { name } = input.attributes;
    return (
      <div key={name} className={`flex gap-2 items-center my-2`}>
        <input
          type="checkbox"
          onChange={() => onSubCatsChange(name)}
          id={name}
          name={name}
          checked={selectedSubCats.some((value) => value === name)}
        />
        <label
          htmlFor={name}
          className={`text-gray-600 hover:text-gray-800 cursor-pointer w-full`}
        >
          {name}
        </label>
      </div>
    );
  });

  return (
    <section className={className}>
      <article className="p-4 border border-b-0 rounded-t-lg">
        <h3 className="font-medium">Categories</h3>
        {subCats?.data ? (
          <div>{renderSubCatsInputs}</div>
        ) : (
          <div className="my-2">
            <Skeleton className={"h-2 my-2"} />
            <Skeleton className={"w-1/2 h-2 my-2"} />
            <Skeleton className={"w-1/2 h-2 my-2"} />
            <Skeleton className={"w-1/2 h-2"} />
          </div>
        )}
      </article>

      <article className="p-4 border border-b-0">
        <h3 className="font-medium">Price range</h3>
        <p className="flex items-center justify-between my-2 text-gray-600">
          <label>Min</label>
          <label>Max</label>
        </p>
        <div className="flex items-center justify-between gap-3 mb-2">
          <output className="px-3 py-1 border rounded-lg">
            <span className="mr-0.5">$</span>
            {0}
          </output>
          <output className="px-3 py-1 border rounded-lg">
            <span className="mr-0.5">$</span>
            {maxPrice || maxAmount}
          </output>
        </div>
        <input
          type="range"
          min={0}
          max={maxAmount}
          onChange={handlePriceChange}
          className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
        />
      </article>

      <RatingStarsInputs onChange={setRatings} />

      <article className="p-4 border rounded-b-lg">
        <h3 className="font-medium">Sort by</h3>
        <div className="flex items-center gap-2 my-2">
          <input
            type="radio"
            name="sort-price"
            id="lowest-first"
            onChange={() => handlePriceOrderChange("asc")}
            checked={selectedPriceOrder === "asc"}
          />
          <label
            className="w-full text-gray-600 cursor-pointer hover:text-gray-800"
            htmlFor="lowest-first"
          >
            Price ( Lowest First )
          </label>
        </div>
        <div className="flex items-center gap-2 my-2">
          <input
            type="radio"
            name="sort-price"
            id="highest-first"
            onChange={() => handlePriceOrderChange("desc")}
            checked={selectedPriceOrder === "desc"}
          />
          <label
            className="w-full text-gray-600 cursor-pointer hover:text-gray-800"
            htmlFor="highest-first"
          >
            Price ( Highest First )
          </label>
        </div>
      </article>
    </section>
  );
}

function getMaxPrice(products) {
  const max = products?.data.reduce((acc, curr) => {
    return Math.max(acc, Math.round(curr.attributes.price));
  }, 0);
  return max || 0;
}

export default FilterPanel;

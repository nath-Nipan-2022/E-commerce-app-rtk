import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import RatingStarsInputs from "./Rating/RatingStarsInputs";

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

  const renderSubCatsInputs = subCats?.data.map((input) => {
    const { name } = input.attributes;
    return (
      <div key={name} className={`flex gap-2 items-center my-2`}>
        <input
          type="checkbox"
          onChange={() => onSubCatsChange(name)}
          id={name}
          name={name}
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
      {/* <h3 className="p-4 border border-b-0 font-medium rounded-t-lg">Filter</h3> */}

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
        <p className="text-gray-600 flex items-center justify-between my-2">
          <label>Min</label>
          <label>Max</label>
        </p>
        <div className="flex gap-3 items-center justify-between mb-2">
          <output className="rounded-lg border py-1 px-3">
            <span className="mr-0.5">$</span>
            {0}
          </output>
          <output className="rounded-lg border py-1 px-3">
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
        <div className="flex gap-2 items-center my-2">
          <input
            type="radio"
            name="sort-price"
            id="lowest-first"
            onChange={() => handlePriceOrderChange("asc")}
          />
          <label
            className=" text-gray-600 hover:text-gray-800 cursor-pointer w-full"
            htmlFor="lowest-first"
          >
            Price ( Lowest First )
          </label>
        </div>
        <div className="flex gap-2 items-center my-2">
          <input
            type="radio"
            name="sort-price"
            id="highest-first"
            onChange={() => handlePriceOrderChange("desc")}
          />
          <label
            className=" text-gray-600 hover:text-gray-800 cursor-pointer w-full"
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

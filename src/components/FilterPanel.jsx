import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import RatingStarsInputs from "./Rating/RatingStarsInputs";
import { useSearchParams } from "react-router-dom";
import Chip from "./Chip";
import Panel from "./Panel";

function FilterPanel({
  products,
  subCats,
  onSubCatsChange,
  setPriceRange,
  setPriceOrder,
  setRatings,
  colors,
  onColorChange,
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
  const selectedColor = searchParams.get("color");

  const renderSubCatsInputs = subCats?.data.map((sub_cat) => {
    const { name } = sub_cat.attributes;
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

  const renderColors = colors?.data?.map((color) => {
    const { name, code } = color.attributes;
    const activeClass =
      name === selectedColor
        ? "border-accent-blue"
        : "group-hover:border-accent-blue";

    return (
      <li
        key={color.id}
        className={`group ${
          code === "#000000" ? "text-neutral-100" : "text-slate-900"
        }`}
      >
        <Chip
          text={name}
          onClick={() => onColorChange(name)}
          className={`w-14 h-6 rounded-md capitalize border-2 ${activeClass}`}
          style={{ backgroundColor: `${code}` }}
        />
      </li>
    );
  });

  return (
    <section className={className}>
      <Panel
        title={`${subCats?.data.length > 0 ? "Categories" : "Filter"} `}
        className="p-4 border border-b-0 lg:rounded-t-lg"
      >
        {subCats?.data ? (
          renderSubCatsInputs
        ) : (
          <div className="my-2">
            <Skeleton className={"h-2 my-2"} />
            <Skeleton className={"w-1/2 h-2 my-2"} />
            <Skeleton className={"w-1/2 h-2 my-2"} />
            <Skeleton className={"w-1/2 h-2"} />
          </div>
        )}
      </Panel>
      <Panel title={"Price range"} className="p-4 border border-b-0">
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
      </Panel>
      <RatingStarsInputs onChange={setRatings} />
      {colors?.data?.length > 0 && (
        <Panel title={"Colors"} className="p-4 border border-b-0">
          <ul className={`flex gap-2 flex-wrap`}>{renderColors}</ul>
        </Panel>
      )}
      <Panel title={"Sort by"} className="p-4 border border-b lg:rounded-b-lg">
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
      </Panel>
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

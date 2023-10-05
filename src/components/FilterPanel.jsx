import Skeleton from "./Skeleton";
import RatingStarsInputs from "./Rating/RatingStarsInputs";
import Chip from "./Chip";
import Panel from "./Panel";
import useFilter from "../hooks/useFilter";

export default function FilterPanel({ products, subCats, colors, className }) {
  const {
    handleFiltersChange,
    filterValues: {
      subCats: selectedSubCats,
      color: selectedColor,
      ratingsAbove: selectedRatings,
      priceOrder: selectedPriceOrder,
      priceRange: selectedPriceRange,
    },
  } = useFilter();

  let maxAmount = getMaxPrice(products);
  let maxPrice = selectedPriceRange ?? maxAmount;

  const renderSubCatsInputs = subCats?.data.map((sub_cat) => {
    const { name } = sub_cat.attributes;
    return (
      <div key={name} className={`flex gap-2 items-center my-2`}>
        <input
          type="checkbox"
          onChange={() => handleFiltersChange("sub-cats", name)}
          id={name}
          name={name}
          checked={selectedSubCats?.some((value) => value === name)}
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
          onClick={() => handleFiltersChange("color", name)}
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
          onChange={(e) => handleFiltersChange("price-range", e.target.value)}
          className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
        />
      </Panel>
      <RatingStarsInputs
        value={selectedRatings}
        onChange={(v) => handleFiltersChange("ratings-above", v)}
      />
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
            onChange={() => handleFiltersChange("price-order", "asc")}
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
            onChange={() => handleFiltersChange("price-order", "desc")}
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

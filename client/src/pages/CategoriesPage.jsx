import { useState } from "react";
import { useParams } from "react-router-dom";

// components
import Button from "../components/Button";
import FilterPanel from "../components/FilterPanel";
import { ProductsListItem } from "../components/Product";
import Skeleton from "../components/Skeleton";
import Slider from "../components/Slider";
import { GoFilter } from "react-icons/go";
import { ProductsListItemSkeleton } from "../components/Product/ProductsListItemSkeleton";
import NotFoundIcon from "../assets/not_found.webp";

// hooks
import useFilter from "../hooks/useFilter";
import {
  useGetACategoryQuery,
  useGetColorsQuery,
  useGetSubcategoriesQuery,
} from "../store/apis/categoriesApi";

function CategoriesPage() {
  const { type } = useParams();
  const category = `filters[categories]?filters[name][$eq]=${type}`;

  // get the products matching the category
  const {
    data: products,
    isFetching,
    error,
  } = useGetACategoryQuery("?populate=*&" + category);

  // get the sub categories associated with the category
  const { data: subCats } = useGetSubcategoriesQuery("?" + category);

  // get the colors associated with the category
  const { data: colors } = useGetColorsQuery("?" + category);

  const { filteredProducts } = useFilter(products);

  // use the filteredProducts
  let renderCategoryProducts = filteredProducts?.map((product) => (
    <ProductsListItem key={product.id} product={product} />
  ));

  const [showFilterPanel, setShowFilterPanel] = useState(false);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside
        className={`flex-shrink-0 filter-panel-wrapper ${
          showFilterPanel
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <FilterPanel products={products} subCats={subCats} colors={colors} />
      </aside>
      {/* Crucial styles ⭐⭐ */}
      <section className="lg:w-[calc(100%-208px-24px)]">
        <div className="w-full overflow-hidden rounded-lg bg-fuchsia-300 dark:bg-fuchsia-400">
          {isFetching ? (
            <Skeleton className={"w-full h-52 border"} />
          ) : !error ? (
            <Slider
              images={products.data[0].attributes.images.data}
              className={"lg:max-h-72"}
            />
          ) : (
            <div className="p-8 text-xl font-semibold text-red-600 bg-red-100 rounded-md">
              Something went wrong. Try to refresh!
            </div>
          )}
        </div>
        <article className="w-full mx-auto">
          <h2 className="flex justify-between gap-2 mt-4 leading-tight text-h2">
            <span className="capitalize">Trending {type}</span>
            {/* FilterPanel Toggler */}
            <Button
              secondary
              size={"small"}
              className="flex items-center gap-1 pl-2 pr-3 rounded-md h-7 lg:hidden"
              onClick={() => setShowFilterPanel(true)}
            >
              <GoFilter />
              <span>Filter</span>
            </Button>
          </h2>
          {/* render the filtered data here */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {isFetching ? (
              <ProductsListItemSkeleton times={4} />
            ) : (
              renderCategoryProducts
            )}
          </div>
          {/* If No data found */}
          {filteredProducts?.length === 0 && (
            <div className="h-[344px] w-60 mx-auto">
              <figure>
                <img
                  src={NotFoundIcon}
                  alt="not found"
                  width={200}
                  height={300}
                  className="w-full h-full"
                />
              </figure>
              <h6 className="py-2 text-center">No data found.</h6>
            </div>
          )}
        </article>

        {/* modal background */}
        {showFilterPanel && (
          <div
            className="fixed inset-0 z-10 opacity-0 bg-black/70 animate-fadeIn dark:bg-slate-800/50 lg:hidden"
            onClick={() => setShowFilterPanel(false)}
          ></div>
        )}
      </section>
    </div>
  );
}

export default CategoriesPage;

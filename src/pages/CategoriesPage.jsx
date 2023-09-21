import { useState } from "react";
import { useParams } from "react-router-dom";

// components
import Button from "../components/Button";
import FilterPanel from "../components/FilterPanel";
import { ProductsListItem } from "../components/Product";
import Skeleton from "../components/Skeleton";
import Slider from "../components/Slider";
import { GoFilter } from "react-icons/go";

// hooks
import useFilter from "../hooks/useFilter";
import {
  useGetACategoryQuery,
  useGetSubcategoriesQuery,
} from "../store/apis/categoriesApi";

function CategoriesPage() {
  const { type } = useParams();
  const category = `filters[categories]?filters[name][$eq]=${type}`;

  // get the products matching the category
  const {
    data: products,
    isLoading,
    error,
  } = useGetACategoryQuery("?populate=*&" + category);

  // get the sub categories associated with the category
  const { data: subCats } = useGetSubcategoriesQuery("?" + category);

  const {
    filteredProducts,
    handleSubCatsChange,
    setPriceOrder,
    setPriceRange,
    setRatings,
  } = useFilter(products);

  // use the filtered values
  let renderCategoryProducts = filteredProducts?.map((product) => {
    return <ProductsListItem key={product.id} product={product} />;
  });

  // for mobile devices to toggle filter panel
  const [showPanel, setShowFilterPanel] = useState(false);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside
        className={`flex-shrink-0 filter-panel-wrapper ${
          showPanel ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <FilterPanel
          products={products}
          subCats={subCats}
          onSubCatsChange={handleSubCatsChange}
          setPriceRange={setPriceRange}
          setPriceOrder={setPriceOrder}
          setRatings={setRatings}
          className={`lg:sticky lg:top-[72px] w-52`}
        />
      </aside>
      {/* Crucial styles ⭐⭐ */}
      <section className="lg:w-[calc(100%-208px-24px)]">
        <div className="w-full overflow-hidden rounded-lg bg-fuchsia-300">
          {isLoading ? (
            <Skeleton className={"w-full h-52 border"} />
          ) : (
            <Slider
              images={products.data[0].attributes.images.data}
              className={"lg:max-h-72"}
            />
          )}
        </div>
        <article className="w-full mx-auto">
          <h2 className="flex items-center justify-between my-6">
            <span className="text-2xl font-medium">
              Trending {type} For You
            </span>
            {/* FilterPanel Toggler */}
            <Button
              className="bg-rose-100/50 lg:hidden py-1 px-3.5 rounded-3xl gap-2"
              onClick={() => setShowFilterPanel(true)}
            >
              <GoFilter />
              <span>Filter</span>
            </Button>
          </h2>
          {/* render the filtered data here */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {isLoading ? (
              <Skeleton times={4} className={"h-44 md:h-52 m-2 rounded-md"} />
            ) : (
              renderCategoryProducts
            )}
            {error && "Error loading category products"}
          </div>
        </article>

        {/* modal background */}
        {showPanel && (
          <div
            className="fixed inset-0 z-10 opacity-0 bg-black/70 animate-fadeIn"
            onClick={() => setShowFilterPanel(false)}
          ></div>
        )}
      </section>
    </div>
  );
}

export default CategoriesPage;

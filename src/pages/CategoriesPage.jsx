import { useParams } from "react-router-dom";
import {
  useGetACategoryQuery,
  useGetSubcategoriesQuery,
} from "../store/apis/categoriesApi";
import { useState } from "react";
import Slider from "../components/Slider";
import { ProductsListItem } from "../components/Product";
import Skeleton from "../components/Skeleton";
import FilterPanel from "../components/FilterPanel";
import { GoFilter } from "react-icons/go";
import Button from "../components/Button";
import useFilter from "../hooks/useFilter";

function CategoriesPage() {
  const { id: name } = useParams();
  const category = `filters[categories]?filters[name][$eq]=${name}`;

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
    <div>
      <div className="sticky top-[72px]">
        {showPanel && (
          <div
            className="fixed inset-0 z-20 bg-black/50 opacity-0 animate-fadeIn"
            onClick={() => setShowFilterPanel(false)}
          ></div>
        )}
        <FilterPanel
          products={products}
          subCats={subCats}
          onSubCatsChange={handleSubCatsChange}
          setPriceRange={setPriceRange}
          setPriceOrder={setPriceOrder}
          setRatings={setRatings}
          className={`w-52 fixed z-20 left-0 top-0 h-screen bg-white shadow-xl lg:shadow-sm lg:absolute lg:z-0 lg:left-auto lg:top-auto lg:h-auto lg:translate-x-0 transition duration-300 ${
            showPanel ? "translate-x-0" : "-translate-x-full duration-200"
          }`}
        />
      </div>
      {/* Crucial styles ⭐⭐ */}
      <div className="lg:ml-52 lg:pl-4">
        <section className="w-full bg-fuchsia-300 rounded-lg overflow-hidden">
          {isLoading ? (
            <Skeleton className={"w-full h-52 border"} />
          ) : (
            <Slider
              images={products.data[0].attributes.images.data}
              className={"lg:max-h-52"}
            />
          )}
        </section>
        <section className="mx-auto">
          <h2 className="my-6 flex justify-between items-center">
            <span className="text-2xl font-medium">
              Trending {name} For You
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
        </section>
      </div>
    </div>
  );
}

export default CategoriesPage;

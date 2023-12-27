import { useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useParams } from "react-router-dom";

import {
  ProductDetails,
  ProductViewSkeleton,
  ProductsListItem,
} from "../components/Product";
import { ProductsListItemSkeleton } from "../components/Product/ProductsListItemSkeleton";

import { useGetACategoryQuery } from "../store/apis/categoriesApi";
import { useGetProductByIdQuery } from "../store/apis/productsApi";

function ProductView() {
  const ref = useRef();
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isFetching,
    error,
  } = useGetProductByIdQuery(`/${id}?populate=*`);

  const category = product?.data.attributes.categories?.data[0].attributes.name;

  const {
    data: similarProducts,
    isFetching: isFetchingSimilarPdt,
    error: similarPdtError,
  } = useGetACategoryQuery(
    `?populate=*&filters[categories]?filters[name][$eq]=${category}`
  );

  const handleCarouselScroll = (dir) => {
    const carousel = ref.current;
    const left =
      dir === "left"
        ? carousel.scrollLeft - carousel.offsetWidth + 20
        : carousel.scrollLeft + carousel.offsetWidth + 20;
    carousel.scrollTo({
      left,
      behavior: "smooth",
    });
  };

  let renderCategoryProducts = similarProducts?.data
    .filter((pdt) => pdt.id !== product.data.id)
    .map((pdt) => (
      <div key={pdt.id} className="w-56">
        <ProductsListItem product={pdt} />
      </div>
    ));

  return (
    <>
      {isLoading || isFetching ? (
        <ProductViewSkeleton />
      ) : (
        <ProductDetails product={product.data} />
      )}

      {error && (
        <div className="p-4 mt-4 text-lg text-red-700 rounded-md bg-red-50">
          Error loading similar products!
        </div>
      )}

      {/* similar products */}
      {similarProducts?.length > 0 && (
        <section className="my-20 border-t">
          <h2 className="my-10 text-center text-h2">You may also like</h2>
          <div className="relative m-4 group/container">
            <div
              className="opacity-0 chevron -left-7 group-hover/container:opacity-100"
              onClick={() => handleCarouselScroll("left")}
            >
              <GoChevronLeft />
            </div>
            <div ref={ref} className="md:overflow-x-hidden">
              <div className="flex justify-center gap-5">
                {isFetchingSimilarPdt ? (
                  <ProductsListItemSkeleton times={4} />
                ) : (
                  renderCategoryProducts
                )}
                {similarPdtError && "Error loading category products"}
              </div>
            </div>
            <div
              className="opacity-0 chevron -right-7 group-hover/container:opacity-100"
              onClick={() => handleCarouselScroll("right")}
            >
              <GoChevronRight />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
export default ProductView;

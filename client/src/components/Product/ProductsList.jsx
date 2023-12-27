import { useGetProductsQuery } from "../../store/apis/productsApi";
import ProductsListItem from "./ProductsListItem";
import { ProductsListItemSkeleton } from "./ProductsListItemSkeleton";

function ProductsList({ type }) {
  const { data, isLoading, error } = useGetProductsQuery(
    `?populate=*&filters[type][$eq]=${type}`
  );

  const renderProducts = data?.data.map((product) => {
    return <ProductsListItem key={product.id} product={product} />;
  });

  if (error) {
    return (
      <div className="text-xl font-medium text-center text-red-700 bg-red-100 rounded-md p-14">
        Error Loading Products
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
      {isLoading ? <ProductsListItemSkeleton times={8} /> : renderProducts}
    </div>
  );
}
export default ProductsList;

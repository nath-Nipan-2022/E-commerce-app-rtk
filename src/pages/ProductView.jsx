import { useParams } from "react-router-dom";
import { ProductDetails, ProductViewSkeleton } from "../components/Product";
import { useGetProductByIdQuery } from "../store/apis/productsApi";

function ProductView() {
  const { id } = useParams();
  const { data, isLoading, isFetching, error } = useGetProductByIdQuery(
    `/${id}?populate=*`
  );

  return (
    <div className="mx-auto">
      {isLoading || isFetching ? (
        <ProductViewSkeleton />
      ) : (
        <ProductDetails product={data.data} />
      )}

      {error && (
        <div className="text-lg text-red-700 p-4 rounded-md bg-red-50">
          Error loading product!
        </div>
      )}
    </div>
  );
}
export default ProductView;

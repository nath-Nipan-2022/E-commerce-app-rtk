import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import ProductViewSkeleton from "../components/ProductViewSkeleton";
import { useGetProductByIdQuery } from "../store/apis/productsApi";

function ProductView() {
	const { id } = useParams();
	const { data, isLoading, error } = useGetProductByIdQuery(`/${id}?populate=*`);

	return (
		<div className="mx-auto">
			{/* <section className="border-t p-3 px-10">
				<span className="font-medium text-gray-600 text-xs">{`/Product/${
					data ? data[0].name : id
				}`}</span>
			</section> */}
			{isLoading ? <ProductViewSkeleton /> : <ProductDetails product={data.data} />}

			{error && (
				<div className="text-lg text-red-700 p-4 rounded-md bg-red-50">
					Error loading product!
				</div>
			)}
		</div>
	);
}
export default ProductView;

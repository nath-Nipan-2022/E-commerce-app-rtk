import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import { useGetProductAlbumQuery } from "../apis/productAlbumsApi";
import ProductViewSkeleton from "../components/ProductViewSkeleton";

function ProductView() {
	const { id } = useParams();
	const { data, isLoading, error } = useGetProductAlbumQuery(id);

	return (
		<div className="mx-auto">
			<section className="border-t p-3 px-10">
				<span className="font-medium text-gray-600 text-xs">{`/Product/${
					data ? data[0].name : id
				}`}</span>
			</section>
			{isLoading ? <ProductViewSkeleton /> : <ProductDetails product={data} />}

			{error && (
				<div className="text-lg text-red-700 p-4 rounded-md bg-red-50">
					Error loading product!
				</div>
			)}
		</div>
	);
}
export default ProductView;

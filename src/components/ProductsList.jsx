import { useGetProductsQuery } from "../apis/productsApi";

import ProductsListItem from "./ProductsListItem";
import Skeleton from "./Skeleton";

function ProductsList() {
	const { data, isLoading, error } = useGetProductsQuery();

	const renderProducts = data?.map((product) => {
		return <ProductsListItem key={product.id} product={product} />;
	});

	return (
		<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
			{isLoading ? (
				<Skeleton times={3} className={"h-60 m-3 rounded-md"} />
			) : (
				renderProducts
			)}
			{error && "Error loading products"}
		</div>
	);
}
export default ProductsList;

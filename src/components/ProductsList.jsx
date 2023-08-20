import { useGetProductsQuery } from "../store/apis/productsApi";
import ProductsListItem from "./ProductsListItem";
import Skeleton from "./Skeleton";

function ProductsList ({ type }) {
	const { data, isLoading, error } = useGetProductsQuery(`?populate=*&filters[type][$eq]=${type}`);

	const renderProducts = data?.data.map((product) => {
		return <ProductsListItem key={product.id} product={product} />;
	});

	return (
		<div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
			{isLoading ? (
				<Skeleton times={8} className={"h-44 md:h-52 m-2 rounded-md"} />
			) : (
				renderProducts
			)}
			{error && "Error loading products"}
		</div>
	);
}
export default ProductsList;

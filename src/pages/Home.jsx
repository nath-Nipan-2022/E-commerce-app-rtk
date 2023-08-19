import Category from "../components/Category";
import ProductsList from "../components/ProductsList";
import Skeleton from "../components/Skeleton";
import Slider from "../components/Slider";
import { useGetProductsQuery } from "../store/apis/productsApi";

function Home () {
	const { data, isLoading, error } = useGetProductsQuery(
		`?populate=*&filters[type][$eq]=trending`
	);

	const randomIndex = data?.data.length >= 2 ?
		Math.floor(Math.random() * (data?.data.length - 1)) : 0;

	return (
		<div className="mt-4">
			<section className="max-container bg-rose-300 rounded-lg overflow-hidden">
				{isLoading ? <Skeleton className={'w-full h-72 border'}/>
					: <Slider images={data.data[randomIndex].attributes.images.data} />
				}
			</section>

			<section className="max-container py-4 lg:py-10">
				<h2 className="text-h2">Trending Products For You</h2>
				<ProductsList type="trending" />
			</section>

			<section className="max-container rounded mt-4">
				<h2 className="text-h2">Shop Our Top Categories </h2>
				<Category />
			</section>

			<section className="max-container py-16">
				<h2 className="text-h2">Most Bought Products</h2>
				<ProductsList type="featured" />
			</section>
		</div>
	);
}
export default Home;

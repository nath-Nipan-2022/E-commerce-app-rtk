import Category from "../components/Category";
import ProductsList from "../components/ProductsList";
import Slider from "../components/Slider";
// import { useState } from "react";

function Home() {
	return (
		<div className="mt-4">
			<section className=" bg-rose-100 mx-auto rounded-lg max-w-2xl lg:max-w-7xl overflow-hidden">
				<Slider />
			</section>

			<section className="mx-auto max-w-2xl py-16 lg:max-w-7xl">
				<h2 className="text-2xl font-medium mb-8">Trending Products For You</h2>
				<ProductsList type='trending' />
			</section>

			<section>
				<Category className="mx-auto rounded max-w-2xl lg:max-w-7xl" />
			</section>

			<section className="mx-auto max-w-2xl py-16 lg:max-w-7xl">
				<h2 className="text-2xl font-medium mb-8">Most Bought Products</h2>
				<ProductsList type="popular" />
			</section>
		</div>
	);
}
export default Home;

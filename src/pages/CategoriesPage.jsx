import { useParams } from "react-router-dom";
import { useGetACategoryQuery, useGetSubcategoriesQuery} from "../store/apis/categoriesApi";
import { GoStarFill } from "react-icons/go";
import { useState } from "react";
import Slider from "../components/Slider";
import CategoriesInputs from "../components/CategoriesInputs";
import ProductsListItem from "../components/ProductsListItem";
import Skeleton from "../components/Skeleton";

function CategoriesPage() {
	const { id:name } = useParams();

	const { data, isLoading, error } = useGetACategoryQuery(
		`?populate=*&filters[categories]?filters[name][$eq]=${name}`
	);
	
	const { data: subCats } = useGetSubcategoriesQuery(
		`?filters[categories]?filters[name][$eq]=${name}`
	)
	console.log('subCats', subCats);

	const [filterCategories, setFilterCategories] = useState([]);
	const [maxPrice, setMaxPrice] = useState(1000);
	const [review, setReview] = useState(3);
	const [priceOrder, setPriceOrder] = useState(null);

	//todo: here data will be filtered according to the selected states

	const handleValuesChange = (values) => {
		setFilterCategories(values);
		console.log(values);
	};

	// use the filtered values
	const renderCategoryProducts = data?.data.map((product) => {
		return <ProductsListItem key={product.id} product={product} />;
	});

	const renderReviews = Array(5)
		.fill(0)
		.map((_, i) => {
			return (
				<GoStarFill
					key={i}
					className={`${
						i <= review ? "text-yellow-500" : "text-gray-300"
					} transition-colors`}
					onClick={() => setReview(i)}
				/>
			);
		});

	return (
		<div className="flex gap-4 lg:gap-6 flex-col-reverse lg:flex-row items-start">
			{/* left panel */}
			<section className="w-80">
				<h3 className="p-4 border border-b-0 font-medium rounded-t-lg">
					Filter
				</h3>

				<article className="p-4 border border-b-0">
					<CategoriesInputs
						onChange={handleValuesChange}
						className={"cursor-pointer"}
						inputs={subCats?.data}	
					/>
				</article>

				<article className="p-4 border border-b-0">
					<h3 className="font-medium">Price range</h3>
					<div className="flex items-center justify-between my-2">
						<label className=" text-gray-600 px-2">Min</label>
						<label className=" text-gray-600 px-2">Max</label>
					</div>
					<div className="flex gap-3 items-center justify-between mb-2">
						<output className="rounded-lg border py-1 px-3">
							<span className="mr-1">$</span>
							{0}
						</output>
						<input
							type="range"
							min={0}
							max={500}
							onChange={(e) => setMaxPrice(e.target.value)}
							className="flex-1 h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
						/>
						<output className="rounded-lg border py-1 px-4 w-20">
							<span className="mr-1">$</span>
							{maxPrice}
						</output>
					</div>
				</article>

				<article className="p-4 border border-b-0">
					<h3 className="font-medium">Rating</h3>
					<div className="flex gap-2 items-center my-2 group cursor-pointer">
						<input
							type="checkbox"
							id="checkbox-rating"
							name="checkbox-rating"
						/>
						{renderReviews}
						<label
							className="text-gray-600 group-hover:text-gray-800 flex-1 cursor-pointer"
							htmlFor="checkbox-rating"
						>
							above
						</label>
					</div>
				</article>

				<article className="p-4 border rounded-b-lg">
					<h3 className="font-medium">Sort by</h3>
					<div className="flex gap-2 items-center my-2">
						<input
							type="radio"
							name="sort-price"
							id="lowest-first"
							onChange={() => setPriceOrder("asc")}
						/>
						<label
							className=" text-gray-600 hover:text-gray-800 cursor-pointer w-full"
							htmlFor="lowest-first"
						>
							Price ( Lowest First )
						</label>
					</div>
					<div className="flex gap-2 items-center my-2">
						<input
							type="radio"
							name="sort-price"
							id="highest-first"
							onChange={() => setPriceOrder("desc")}
						/>
						<label
							className=" text-gray-600 hover:text-gray-800 cursor-pointer w-full"
							htmlFor="highest-first"
						>
							Price ( Highest First )
						</label>
					</div>
				</article>
			</section>
			{/* right panel*/}
			<div>
				<section className=" bg-fuchsia-300 mx-auto rounded-lg overflow-hidden">
					<Slider className={"max-h-56"} />
				</section>
				<section className="mx-auto">
					<h2 className="text-2xl font-medium my-6">
						Trending Pickups For You
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

import { useState } from "react";
import CategoriesInputs from "./CategoriesInputs";
import Skeleton from "./Skeleton";
import { GoStarFill } from "react-icons/go";

function FilterPanel({
	subCats,
	onSubCatsChange,
	maximumPrice,
	setPriceRange,
	setPriceOrder,
	setRatings,
	showPanel,
	setShowFilterPanel,
}) {
	const [maxPrice, setMaxPrice] = useState(maximumPrice);

	const [review, setReview] = useState(4);

	const handlePriceChange = (e) => {
		setMaxPrice(e.target.value);
		setPriceRange(e.target.value); // directly pass the value to the parent
	};

	const handlePriceOrderChange = (order) => {
		setPriceOrder(order);
	};

	const handleChange = (i) => {
		setReview(i);
	};

	const renderReviews = Array(5)
		.fill(0)
		.map((_, i) => (
			<GoStarFill
				key={i}
				onClick={() => handleChange(i)}
				className={`transition-colors text-${
					i <= review ? "yellow-500" : "gray-300"
				}`}
			/>
		));

	return (
		<div>
			{showPanel && (
				<div
					className="fixed inset-0 z-20 bg-black/50"
					onClick={() => setShowFilterPanel(false)}
				></div>
			)}
			<section
				className={`w-52 fixed z-20 left-0 top-0 h-screen bg-white shadow-xl lg:shadow-sm lg:static lg:left-auto lg:top-auto lg:h-auto lg:translate-x-0 transition duration-300 ${
					showPanel ? "translate-x-0" : "-translate-x-full duration-200"
				}`}
			>
				<h3 className="p-4 border border-b-0 font-medium rounded-t-lg">
					Filter
				</h3>

				<article className="p-4 border border-b-0">
					{subCats ? (
						<CategoriesInputs
							onChange={onSubCatsChange}
							className={"cursor-pointer"}
							inputs={subCats.data}
						/>
					) : (
						<div className="my-2">
							<Skeleton className={"h-2 my-2"} />
							<Skeleton className={"w-1/2 h-2 my-2"} />
							<Skeleton className={"w-1/2 h-2 my-2"} />
							<Skeleton className={"w-1/2 h-2"} />
						</div>
					)}
				</article>

				<article className="p-4 border border-b-0">
					<h3 className="font-medium">Price range</h3>
					<p className="text-gray-600 flex items-center justify-between my-2">
						<label>Min</label>
						<label>Max</label>
					</p>
					<div className="flex gap-3 items-center justify-between mb-2">
						<output className="rounded-lg border py-1 px-3">
							<span className="mr-0.5">$</span>
							{0}
						</output>
						<output className="rounded-lg border py-1 px-3 w-16">
							<span className="mr-0.5">$</span>
							{maxPrice}
						</output>
					</div>
					<input
						type="range"
						min={0}
						max={maximumPrice}
						onChange={handlePriceChange}
						className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
					/>
				</article>

				<article className="p-4 border border-b-0">
					<h3 className="font-medium">Rating</h3>
					<div className="flex gap-2 items-center my-2 group cursor-pointer">
						<input
							type="checkbox"
							id="checkbox-rating"
							name="checkbox-rating"
							onChange={() => setIsCheckedRatings((prev) => !prev)}
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
							onChange={() => handlePriceOrderChange("asc")}
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
							onChange={() => handlePriceOrderChange("desc")}
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
		</div>
	);
}

export default FilterPanel;

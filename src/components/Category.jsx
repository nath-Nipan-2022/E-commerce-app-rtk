import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../apis/categoriesApi";
import Skeleton from "./Skeleton";

function Category({ className }) {
	const { data, isLoading, error } = useGetCategoriesQuery();

	const renderCards = data?.map((card, i) => {
		return (
			<Link
				to={`categories/${card.caption}`}
				key={i}
				className="group h-60 rounded-xl overflow-hidden"
			>
				<figure className="w-full h-full relative">
					<img
						src={card.imageSrc}
						alt={card.caption}
						className="w-full h-full object-cover scale-110 group-hover:scale-125 transition"
					/>
					<figcaption className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 to-black/5 text-2xl text-white font-medium text-center p-4 pb-6">
						{card.caption}
					</figcaption>
				</figure>
			</Link>
		);
	});

	return (
		<div className={className}>
			<h2 className="text-2xl font-medium mb-8">Shop Our Top Categories </h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:justify-center">
				{isLoading ? (
					<Skeleton times={4} className={"w-52 h-72 rounded-xl"} />
				) : (
					renderCards
				)}
				{error && "Error loading categories"}
			</div>
		</div>
	);
}
export default Category;

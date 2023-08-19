import { BsStarFill, BsStarHalf } from "react-icons/bs";

function ReviewsStars({ ratings, reviews, className }) {
	const renderReviews = Array(5)
		.fill(0)
		.map((_, i) =>
			ratings - i < 0.8 ? (
				<BsStarHalf key={i} className="w-3 h-3 text-yellow-500" />
			) : (
				<BsStarFill
					key={i}
					className={`w-3 h-3 text-${
						i <= Math.round(ratings) ? "yellow-500" : "gray-300"
					}`}
				/>
			)
		);

	return (
		<p className={`flex gap-2 ${className}`}>
			<span className="flex gap-1 items-center py-1">{renderReviews}</span>
			<span className="p-1 text-sm">({reviews || 10})</span>
		</p>
	);
}
export default ReviewsStars;

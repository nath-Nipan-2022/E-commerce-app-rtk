import { useState } from "react";
import { GoStarFill } from "react-icons/go";

function RatingStars({ onChange }) {
	const [review, setReview] = useState(3);
	const [isChecked, setIsChecked] = useState(false);

  const handleRatingsChange = (i) => {
		setReview(i);
		isChecked ? onChange(i + 1) : onChange(1);
		console.log('checked', isChecked);
  };
  
	const renderReviews = Array(5)
		.fill(0)
		.map((_, i) => (
			<GoStarFill
				key={i}
				onClick={() => handleRatingsChange(i)}
				className={`transition-colors ${
					i <= review ? "text-yellow-500" : "text-gray-300"
				}`}
			/>
		));
	return (
		<article className="p-4 border border-b-0">
			<h3 className="font-medium">Rating</h3>
			<div className="flex gap-2 items-center my-2 group cursor-pointer">
				<input
					type="checkbox"
					id="checkbox-rating"
					name="checkbox-rating"
					onChange={(e) => setIsChecked(e.target.checked)}
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
	);
}
export default RatingStars;

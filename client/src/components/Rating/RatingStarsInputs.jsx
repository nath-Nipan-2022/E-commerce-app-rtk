import { useCallback, useRef } from "react";
import { GoStarFill } from "react-icons/go";

function RatingStars({ value, onChange }) {
  const ref = useRef();

  const handleRatingsChange = useCallback(
    (i) => {
      ref.current.checked ? onChange(i + 1) : onChange(null);
    },
    [onChange]
  );

  const renderReviews = Array(5)
    .fill(0)
    .map((_, i) => (
      <GoStarFill
        key={i}
        onClick={() => handleRatingsChange(i)}
        className={`transition-colors ${
          i <= value - 1 ? "text-yellow-500" : "text-gray-300"
        }`}
      />
    ));

  return (
    <article className="p-4 border border-b-0">
      <h3 className="font-medium">Rating</h3>
      <div className="flex items-center gap-2 my-2 cursor-pointer group">
        <input
          type="checkbox"
          id="checkbox-rating"
          name="checkbox-rating"
          ref={ref}
          onChange={() => handleRatingsChange()}
        />
        {renderReviews}
        <label
          className="flex-1 text-gray-600 cursor-pointer group-hover:text-gray-800"
          htmlFor="checkbox-rating"
        >
          above
        </label>
      </div>
    </article>
  );
}
export default RatingStars;

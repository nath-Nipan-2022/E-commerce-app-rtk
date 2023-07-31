import React from "react";
import classNames from "classnames";

function Skeleton({ times, className }) {
	const classes = classNames(
		"bg-gradient-to-r from-0% from-gray-200 via-20% via-gray-100 to-100% to-gray-300 bg-x-dbl-y-full animate-shimmer",
		className
	);

	const totalNodes = Array.from({ length: times }, (_, i) => {
		return <div key={i} className={classes}></div>;
	});

	return <React.Fragment>{totalNodes}</React.Fragment>;
}
export default Skeleton;

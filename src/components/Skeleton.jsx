import React from "react";
import classNames from "classnames";

function Skeleton({ times, className }) {
	const classes = classNames(
		"relative bg-[#f7f7f7] overflow-hidden before:absolute before:content-[''] before:bg-gradient-to-r before:from-transparent before:via-[#ebebeb] before:to-transparent before:-translate-x-full before:animate-shimmer before:w-full before:h-full before:top-0 before:left-0",
		className
	);

	const totalNodes = Array.from({ length: times || 1 }, (_, i) => {
		return <div key={i} className={classes}></div>;
	});

	return <React.Fragment>{totalNodes}</React.Fragment>;
}
export default Skeleton;

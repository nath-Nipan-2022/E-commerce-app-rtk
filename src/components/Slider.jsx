import { useEffect, useState } from "react";
// import Button from "./Button";
import img1 from "../assets/slider/photo-1623682490567-941cdfca10a4-removebg-preview.png";
import img2 from "../assets/slider/photo-1593359863503-f598684c806f-removebg-preview.png";
import img3 from "../assets/slider/photo-1545127398-14699f92334b-removebg-preview.png";
import img4 from "../assets/slider/photo-1625786682948-2168238883d2-removebg-preview.png";
import { Link } from "react-router-dom";

function Slider() {
	const slides = [
		{ id: 0, src: img1, alt: "headphone on head of a women" },
		{ id: 1, src: img2, alt: "headphone on head of a women" },
		{ id: 2, src: img3, alt: "headphone on head of a men" },
		{ id: 3, src: img4, alt: "headphone on floor" },
	];

	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		let timer = setInterval(() => {
			if (currentSlide >= slides.length - 1) {
				setCurrentSlide(0);
			} else {
				setCurrentSlide((prev) => prev + 1);
			}
		}, 5000);

		return () => clearInterval(timer);
	}, [currentSlide, slides.length]);

	const renderSlides = slides.map((slide) => (
		<div
			key={slide.id}
			className="flex justify-evenly items-center"
			style={{ width: 100 / slides.length + "%" }}
		>
			<div className="p-3 md:p-6">
				<h3 className="font-bold text-lg leading-6 sm:text-3xl lg:text-4xl text-slate-700 mb-3 md:mb-6">
					Grab Upto 50% Off On
					<br />
					Selected Products
				</h3>
				<Link
					to={"/"}
					className="inline-block rounded-full py-2 px-4 bg-slate-800 text-white text-xs sm:text-base sm:px-6 font-medium hover:bg-slate-700 transition"
				>
					Buy Now
				</Link>
			</div>

			<figure className="w-1/4 lg:p-4">
				<img className="h-full" src={slide.src} alt={slide.alt} />
			</figure>
		</div>
	));

	return (
		<div
			className="flex transition duration-1000 max-h-64"
			style={{
				width: slides.length * 100 + "%",
				transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
			}}
		>
			{renderSlides}
		</div>
	);
}
export default Slider;

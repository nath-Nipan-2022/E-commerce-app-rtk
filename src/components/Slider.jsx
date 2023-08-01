import { useEffect, useState } from "react";
import Button from "./Button";
import img1 from "../assets/slider/photo-1623682490567-941cdfca10a4-removebg-preview.png";
import img2 from "../assets/slider/photo-1593359863503-f598684c806f-removebg-preview.png";
import img3 from "../assets/slider/photo-1545127398-14699f92334b-removebg-preview.png";
import img4 from "../assets/slider/photo-1625786682948-2168238883d2-removebg-preview.png";

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
			className="flex justify-around items-center h-64"
			style={{ width: 100 / slides.length + "%" }}
		>
			<div className="p-12">
				<h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-slate-700 mb-5">
					Grab Upto 50% Off On
					<br />
					Selected Products
				</h1>
				<Button
					className={
						"px-6 h-11 bg-slate-800 text-white font-medium rounded-full hover:bg-slate-700 transition-colors"
					}
				>
					Buy Now
				</Button>
			</div>

			<figure className="w-56 pr-10">
				<img src={slide.src} alt={slide.alt} />
			</figure>
		</div>
	));

	return (
		<div
			className="flex transition duration-1000"
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

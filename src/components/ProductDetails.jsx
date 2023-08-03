import { useParams } from "react-router-dom";
import Button from "./Button";
import Panel from "./Panel";
import { GoStar, GoStarFill } from "react-icons/go";
import img from "../assets/slider/photo-1545127398-14699f92334b-removebg-preview.png";

function ProductDetails() {
	const { id } = useParams();

	const renderImgBoxes = Array(4)
		.fill(0)
		.map((_, i) => (
			<figure
				key={i}
				className="border aspect-square w-28 bg-rose-50 rounded-md"
			></figure>
		));

	const renderReviews = Array(5)
		.fill(0)
		.map((_, i) => {
			if (i < 4) {
				return <GoStarFill key={i} />;
			} else {
				return <GoStar key={i} />;
			}
		});

	const renderColorBoxes = Array(5)
		.fill(0)
		.map((_, i) => {
			return (
				<Button
					key={i}
					className={
						"w-8 h-8 rounded-full outline outline-slate-300 outline-offset-2 bg-rose-300 hover:outline-rose-700"
					}
				/>
			);
		});

	return (
		<div className="mx-auto max-w-2xl lg:max-w-7xl">
			<section className="border-t p-3 px-6">{id}</section>

			<section className="px-6 flex flex-col lg:flex-row gap-12">
				<section className="w-1/2 pt-2">
					<figure className="w-full h-3/4 p-12 bg-rose-50 rounded-md ">
						<img src={img} alt="..." className="w-full h-full object-cover" />
					</figure>
					<div className="mt-6 flex gap-10 justify-between">
						{renderImgBoxes}
					</div>
				</section>

				<section>
					<Panel className={"pb-4"}>
						<h2 className="text-2xl font-semibold">{id.toLocaleUpperCase()}</h2>
						<p className="text-gray-600 text-sm max-w-sm py-2">
							a perfect balance of exhilarating high-fidelity audio and the
							effortless magic of {id}.
						</p>
						<div className="flex gap-2 py-1">
							<span className="flex gap-1 items-center">{renderReviews}</span>
							<span>(122)</span>
						</div>
					</Panel>
					<Panel className={"border-t py-4"}>
						<h3 className="text-lg font-semibold">$549.00 or 99.99/month</h3>
						<p className="text-gray-600 text-sm max-w-sm py-2">
							Suggested payments with 6 months special financing
						</p>
					</Panel>

					<Panel className="border-t py-4">
						<h3 className="font-semibold">Choose a color</h3>
						<div className="py-4 flex gap-3">{renderColorBoxes}</div>
					</Panel>

					<Panel className="border-t py-4">
						<div className="flex gap-6"></div>
						<div className="flex gap-8">
							<Button rounded primary className={"px-5 font-medium"}>
								Buy Now
							</Button>
							<Button
								rounded
								className={
									"border-slate-500 hover:bg-slate-900 hover:text-white font-medium"
								}
							>
								Add to Cart
							</Button>
						</div>
					</Panel>
				</section>
			</section>
		</div>
	);
}
export default ProductDetails;

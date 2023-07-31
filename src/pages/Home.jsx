import { GoCopy } from "react-icons/go";
import Button from "../components/Button";
import ProductsList from "../components/ProductsList";
// import { useState } from "react";

function Home() {
	const coupon = "SHP2025";

	const handleCouponCopy = () => {
		navigator.clipboard.writeText(coupon).then(() => {
			alert("Coupon copied");
		});
	};

	return (
		<div className="mt-4">
			<section className="flex flex-col gap-10 md:flex-row rounded-lg bg-rose-100 p-12 mx-auto max-w-2xl lg:max-w-7xl">
				<div>
					<h1 className="font-bold text-3xl md:text-4xl text-slate-700 mb-5">
						<div className="mb-1">Grab Upto 50% Off On</div>
						<div>Selected Products</div>
					</h1>
					<div className="flex gap-4">
						<Button
							className={
								"px-6 h-11 bg-slate-800 text-white font-medium rounded-full hover:bg-slate-700 transition-colors"
							}
						>
							Buy Now
						</Button>
						<Button
							rounded
							className="bg-slate-50 shadow-lg  font-medium flex gap-2"
						>
							{/* <span>Use Coupon</span> */}
							<span className="text-slate-500">{coupon}</span>
							<GoCopy
								onClick={handleCouponCopy}
								className="hover:text-slate-600"
							/>
						</Button>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-2xl py-16 lg:max-w-7xl">
				<h2 className="text-2xl font-medium mb-8">Products For You</h2>
				<ProductsList />
			</section>
		</div>
	);
}
export default Home;

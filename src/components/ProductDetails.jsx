import { useParams } from "react-router-dom";
import Button from "./Button";
import { GoStar } from "react-icons/go";

function ProductDetails() {
	const { id } = useParams();

	return (
		<div className="flex gap:2rem">
			<section>
				<div>
					{/* product image */}Product {id}
				</div>
				<div>{/* render similar product images */}</div>
			</section>

			<section>
				<article>
					<h3></h3>
					<p></p>
					<div>
						<span>
							<GoStar />
						</span>
						<span>
							<GoStar />
						</span>
						<span>
							<GoStar />
						</span>
						<span>
							<GoStar />
						</span>
						<span>
							<GoStar />
						</span>
					</div>
				</article>

				<article>
					<h2></h2>
					<p></p>
				</article>

				<article>
					<h4>chose a color</h4>
					<div>
						<Button secondary rounded className="w-10 h-10"></Button>
					</div>
				</article>
			</section>
		</div>
	);
}
export default ProductDetails;

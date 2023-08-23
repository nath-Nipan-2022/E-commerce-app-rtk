import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../store/apis/categoriesApi";
import Skeleton from "./Skeleton";
import ProductImage from "./ProductImage";

function Submenus({ className, childrenClassName }) {
	const { data: cats } = useGetCategoriesQuery(
		"?populate=*populate[0]=products&populate[1]=products.images"
	);

	const renderCats = cats?.data.map((item, i) => {
		if (i > 5) {
			return;
		}
		const images = item.attributes.products.data[0].attributes.images.data;

		return (
			<li key={item.id}>
				<Link
					to={`/categories/${item.attributes.name}`}
					className={`block p-2 ${childrenClassName}`}
				>
					<ProductImage
						url={images[0].attributes.url}
						alt={item.desc}
						className="w-16 hidden lg:block"
					/>
					<div className="flex flex-col justify-between items-center lg:items-start gap-2 sm:flex-row sm:pr-8 lg:flex-col lg:p-2 lg:w-44">
						<h6 className="text-sm lg:text-base">{item.attributes.name}</h6>
						<p className="text-xs lg:text-sm text-slate-500">
							{Math.floor(Math.random() * 200) + 10} Items Available
						</p>
					</div>
				</Link>
			</li>
		);
	});

	return <ul className={className}>{renderCats}</ul>;
}
export default Submenus;

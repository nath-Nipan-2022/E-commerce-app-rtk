import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../store/apis/categoriesApi";
import ProductImage from "./ProductImage";

function Category({ className }) {
	const { data: categories } = useGetCategoriesQuery(
		"?populate=*populate[0]=products&populate[1]=products.images"
	);

	const renderCards = categories?.data.map((item, i) => {
		if (i > 7) {
			return;
		}
		const images = item.attributes.products.data[0].attributes.images.data; // just copied 📋 from console tab
		const randomImgIndex =
			images.length >= 2 ? Math.floor(Math.random() * (images.length - 1)) : 0;

		return (
			<Link
				to={`/categories/${item.attributes.name}`}
				key={item.id}
				className=" relative group h-56 rounded-xl overflow-hidden"
			>
				<ProductImage
					url={images[randomImgIndex].attributes.url}
					alt={item.desc}
					className={"aspect-auto h-full w-full"}
				/>
				<div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 to-black/5 lg:text-lg text-white text-center p-4 pb-6">
					{item.attributes.name.toUpperCase()}
				</div>
			</Link>
		);
	});

	return (
		<div
			className={`grid grid-cols-2 sm:grid-cols-3 gap-6 lg:grid-cols-4 lg:justify-around ${className}`}
		>
			{renderCards}
		</div>
	);
}

export default Category;

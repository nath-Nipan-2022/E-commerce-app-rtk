import { Link } from "react-router-dom";

function Category ({ className }) {
	const data = [
		{
			caption: "Furniture",
			imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1316&q=80"
		},
		{
			caption: "Women Bags",
			imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
		},
		{
			caption: "Sunglasses",
			imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
		},
		{
			caption: "Shoes",
			imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
		},
		{
			caption: "Laptop",
			imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
		},
		{
			caption: "Headphone",
			imageUrl: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
		}
	];

	const renderCards = data.map((card, i) => {
		return (
			<Link
				to={`products/category/${card.caption.toLowerCase()}`}
				key={i}
				className="group h-56 rounded-xl overflow-hidden"
			>
				<figure className="w-full h-full relative">
					<img
						src={card.imageUrl}
						alt={card.caption}
						className="w-full h-full object-cover scale-110 group-hover:scale-125 transition"
					/>
					<figcaption className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 to-black/5 text-2xl text-white font-medium text-center p-4 pb-6">
						{card.caption}
					</figcaption>
				</figure>
			</Link>
		);
	});

	return (
		<div className={className}>
			<h2 className="text-2xl font-medium mb-8">Shop Our Top Categories </h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:justify-around">
				{(renderCards)}
			</div>
		</div>
	);
}
export default Category;

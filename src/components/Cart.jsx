import { GoTrash } from "react-icons/go";

function Cart({ className, item, onRemove }) {
	const handleRemove = () => {
		console.log(item);
		onRemove(item);
	};

	return (
		<div className={`flex items-center gap-1 ${className}`}>
			<figure className="w-12 h-12">
				<img
					src={item.imageUrl}
					alt={item.altText}
					className="w-full h-full object-cover"
				/>
			</figure>
			<article className="flex-1 flex flex-col gap-1 justify-between">
				<h3 className="text-gray-600">{item.name}</h3>
				<p className="font-bold text-slate-600">${item.price}</p>
			</article>
			<div
				onClick={handleRemove}
				className="p-2 w-8 h-8 bg-gray-100 hover:bg-red-200 rounded-lg relative"
			>
				<GoTrash className="absolute top-1/2 -translate-y-1/2" />
			</div>
		</div>
	);
}
export default Cart;

import { useEffect, useState } from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'

function Wishlist ({ productCard}) {
	const [isWishlist, setIsWishlist] = useState(null);

	useEffect(() => {
		if (isWishlist) {
			console.log('Adding Wishlist');
		} else if(isWishlist === false) {
			console.log('Removing Wishlist');
		}
	},[isWishlist])

  return (
		<div
			className="p-1.5 absolute right-2 top-2 bg-white w-9 h-9 rounded shadow hover:bg-gray-100 cursor-pointer"
			onClick={() => setIsWishlist((prev) => !prev)}
		>
			<MdOutlineFavorite
				className={`absolute w-6 h-6 left-1/2 -translate-x-1/2 transition ${
					isWishlist ? "opacity-100 scale-100" : "opacity-0 scale-125"
				}`}
			/>
			<MdOutlineFavoriteBorder
				className={` absolute w-6 h-6 left-1/2 -translate-x-1/2 transition ${
					isWishlist ? "scale-150 opacity-0" : "scale-100 opacity-100 "
				}`}
			/>
		</div>
	);
}
export default Wishlist
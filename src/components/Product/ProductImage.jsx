function ProductImage({ url,alt, ...rest }) {
	return (
		<figure
			{...rest}
			className={`aspect-square overflow-hidden rounded-lg bg-gray-200 ${rest.className}`}
		>
			<img
				src={import.meta.env.VITE_REACT_APP_UPLOAD_URL + url}
				alt={alt}
				width={300}
				height={300}
				className="h-full w-full object-cover object-center transition group-hover:scale-105"
			></img>
		</figure>
	);
}

export default ProductImage;

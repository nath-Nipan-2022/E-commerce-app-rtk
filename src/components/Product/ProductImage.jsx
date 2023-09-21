function ProductImage({ url, alt, ...rest }) {
  return (
    <figure {...rest} className={`aspect-square rounded-lg overflow-hidden`}>
      <img
        src={import.meta.env.VITE_REACT_APP_UPLOAD_URL + url}
        alt={alt}
        width={300}
        height={300}
        className={`object-cover object-center w-full h-full ${rest.className} `}
      ></img>
    </figure>
  );
}

export default ProductImage;

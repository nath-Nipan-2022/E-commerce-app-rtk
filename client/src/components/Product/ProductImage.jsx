function ProductImage({ url, alt, className, ...rest }) {
  return (
    <img
      src={import.meta.env.VITE_REACT_APP_UPLOAD_URL + url}
      alt={alt}
      width={300}
      height={300}
      {...rest}
      className={`object-cover object-center w-full h-full ${className}`}
    ></img>
  );
}

export default ProductImage;

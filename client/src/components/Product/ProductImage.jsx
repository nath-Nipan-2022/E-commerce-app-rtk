function ProductImage({ url, alt, className, ...rest }) {
  return (
    <img
      src={url}
      alt={alt}
      width={300}
      height={300}
      {...rest}
      className={`object-cover object-center w-full h-full ${className}`}
    ></img>
  );
}

export default ProductImage;

const Chip = ({ text, className, style, ...rest }) => {
  return (
    <span
      className={`select-none grid place-items-center font-bold text-sm cursor-pointer ${className}`}
      style={style}
      {...rest}
    >
      {text}
    </span>
  );
};
export default Chip;

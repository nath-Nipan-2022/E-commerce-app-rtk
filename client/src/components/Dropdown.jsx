function Dropdown({ isOpen, hasTitle, className, children, ...rest }) {
  return (
    <div
      {...rest}
      className={`absolute z-20 top-full left-0 ${
        isOpen ? "block" : "hidden"
      } ${className || ""}`}
    >
      <div className="bg-white lg:border lg:shadow-lg lg:rounded-lg animate-popUp">
        {hasTitle && (
          <h4 className="p-2 font-medium text-gray-600 border-b lg:p-4">
            {hasTitle}
          </h4>
        )}
        {children}
      </div>
    </div>
  );
}

export default Dropdown;

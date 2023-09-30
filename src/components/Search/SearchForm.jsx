import { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchForm({ value, onChange, onSubmit, className, ...rest }) {
  const onInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="search"
        value={value}
        id="product-search"
        placeholder="Search Products"
        className="search-input"
        onChange={onInputChange}
        {...rest}
      />
      <span className="search-icon-wrapper">
        <FiSearch />
      </span>
    </form>
  );
}
export default SearchForm;

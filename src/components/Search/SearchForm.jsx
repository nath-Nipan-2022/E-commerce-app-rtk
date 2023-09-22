import { useState } from "react";
import { GoSearch } from "react-icons/go";

function SearchForm({ onChange, onSubmit, className, ...rest }) {
  const [query, setQuery] = useState("");

  const onInputChange = (e) => {
    setQuery(e.target.value);
    onChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery("");
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="search"
        value={query}
        id="product-search"
        placeholder="Search Products"
        className="search-input"
        onChange={onInputChange}
        {...rest}
      />
      <span className="search-icon-wrapper">
        <GoSearch />
      </span>
    </form>
  );
}
export default SearchForm;

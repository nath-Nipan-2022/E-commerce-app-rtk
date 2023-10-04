import { useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "../../store/apis/productsApi";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";

const initState = {
  value: "",
  isOpen: false,
  selectedIndex: 0,
};

function SearchResults() {
  const [searchState, setSearchState] = useState(initState);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current || e.target.tagName === "A") return; // Link tag reloads page.
      if (!ref.current.contains(e.target)) {
        setSearchState((prev) => ({
          ...prev,
          isOpen: false,
          selectedIndex: 0,
        }));
      }
    };
    document.addEventListener("click", handler, true);

    // clean up
    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, []);

  const { data: products } = useGetProductsQuery("?populate=*&");

  // Filtering existing products
  const FILTER_ARR = ["name", "desc", "type"];

  const filteredProducts = products?.data.filter((pdt) =>
    FILTER_ARR.some((key) =>
      pdt.attributes[key]
        .toLowerCase()
        .includes(searchState.value.toLowerCase())
    )
  );

  const handleKeyBoardNavigation = (e) => {
    let index = 0;
    if (e.key === "ArrowDown") {
      index = Math.min(
        searchState.selectedIndex + 1,
        filteredProducts.length - 1
      );
    } else if (e.key === "ArrowUp") {
      index = Math.max(searchState.selectedIndex - 1, 0);
    }
    setSearchState({ ...searchState, selectedIndex: index });
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/products/${filteredProducts[searchState.selectedIndex].id}`);
    setSearchState(initState);
  };

  const renderSearchResults = filteredProducts?.map((product, index) => {
    const isActive = searchState.selectedIndex === index;

    return (
      <li key={product.id} className="relative">
        <Link
          to={`/products/${product.id}`}
          onClick={() => setSearchState(initState)}
          className={`py-1.5 px-5 font-medium block border-l-2 hover:bg-black/5 ${
            isActive ? "border-blue-500 bg-black/5" : "border-transparent"
          }`}
        >
          {product.attributes.name}
        </Link>
        {/* indicator */}
        <span
          className={`absolute top-0 left-0 hidden w-1 h-full md:block rounded-[0_8px_8px_0] bg-accent-blue ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        ></span>
      </li>
    );
  });

  const hasProducts =
    searchState.value && searchState.isOpen && filteredProducts.length > 0;

  return (
    <div className="relative min-h-[44px] ml-auto md:ml-0">
      <div
        className={`fixed z-10 top-0 py-3 md:py-0 left-0 w-full opacity-0 transition bg-background-primary lg:bg-transparent md:static md:opacity-100 md:translate-x-0 ${
          searchState.isOpen ? "opacity-100 translate-x-0" : "translate-x-full"
        }`}
      >
        {/* desktop search */}
        <SearchForm
          value={searchState.value}
          onChange={(value) => setSearchState({ ...searchState, value })}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyBoardNavigation}
          autoComplete="off"
          onClick={() => setSearchState({ ...searchState, isOpen: true })}
          className={"hidden md:block"}
        />

        {/* mobile search */}
        {searchState.isOpen && (
          <div className="flex justify-center md:hidden" ref={ref}>
            <SearchForm
              id="product-search_mobile"
              autoFocus={true}
              autoComplete="off"
              value={searchState.value}
              onSubmit={handleSubmit}
              onChange={(value) => setSearchState({ ...searchState, value })}
              onKeyDown={handleKeyBoardNavigation}
            />
          </div>
        )}

        {/* Results box */}
        {hasProducts && (
          <div className="search-results-box">
            <ul className="flex flex-col divide-y animate-slideIn divide-neutral-100">
              {renderSearchResults}
            </ul>
          </div>
        )}
      </div>

      {/* search icon */}
      <span
        className={`search-icon-wrapper z-10 md:hidden ${
          searchState.isOpen
            ? "hidden"
            : "text-gray-600 hover:text-slate-900 cursor-pointer"
        }`}
        onClick={() => setSearchState({ ...searchState, isOpen: true })}
      >
        <FiSearch />
      </span>
    </div>
  );
}
export default SearchResults;

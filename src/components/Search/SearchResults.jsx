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
  const [state, setState] = useState(initState);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current || e.target.tagName === "A") return; // Link tag reloads page.
      if (!ref.current.contains(e.target)) {
        setState((prev) => ({ ...prev, isOpen: false, selectedIndex: 0 }));
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
      pdt.attributes[key].toLowerCase().includes(state.value.toLowerCase())
    )
  );

  const handleKeyBoardNavigation = (e) => {
    if (e.key === "ArrowDown") {
      let index = Math.min(
        state.selectedIndex + 1,
        filteredProducts.length - 1
      );
      setState({ ...state, selectedIndex: index });
    } else if (e.key === "ArrowUp") {
      let index = Math.max(state.selectedIndex - 1, 0);
      setState({ ...state, selectedIndex: index });
    }
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/products/${filteredProducts[state.selectedIndex].id}`);
    setState({
      ...state,
      value: "",
    });
  };

  const renderSearchResults = filteredProducts?.map((product, index) => {
    const isActive = state.selectedIndex === index;

    return (
      <li key={product.id} className="relative">
        <Link
          to={`/products/${product.id}`}
          onClick={() =>
            setState({
              ...state,
              value: product.attributes.name,
              isOpen: false,
            })
          }
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
    state.value && state.isOpen && filteredProducts.length > 0;

  return (
    <div className="relative min-h-[44px] ml-auto md:ml-0">
      <div
        className={`fixed z-10 top-0 py-3 md:py-0 left-0 w-full opacity-0 -translate-y-full transition bg-background-primary lg:bg-transparent md:static md:opacity-100 md:translate-y-0 ${
          state.isOpen ? "opacity-100 translate-y-0" : ""
        }`}
      >
        {/* desktop search */}
        <SearchForm
          value={state.value}
          onChange={(value) => setState({ ...state, value })}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyBoardNavigation}
          onClick={() => setState({ ...state, isOpen: true })}
          className={"hidden md:block"}
        />

        {/* mobile search */}
        {state.isOpen && (
          <div className="flex justify-center md:hidden" ref={ref}>
            <SearchForm
              id="product-search_mobile"
              autoFocus={true}
              value={state.value}
              onSubmit={handleSubmit}
              onChange={(value) => setState({ ...state, value })}
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
          state.isOpen
            ? "hidden"
            : "text-gray-600 hover:text-slate-900 cursor-pointer"
        }`}
        onClick={() => setState({ ...state, isOpen: true })}
      >
        <FiSearch />
      </span>
    </div>
  );
}
export default SearchResults;

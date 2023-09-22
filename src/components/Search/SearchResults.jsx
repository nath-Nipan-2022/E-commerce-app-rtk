import { useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "../../store/apis/productsApi";
import { GoSearch } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";

function SearchResults() {
  const [searchValue, setSearchValue] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mobileSearchBarRef = useRef();

  // close search bar when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!mobileSearchBarRef.current.contains(e.target)) {
        setOpenSearch(false);
        setSelectedIndex(0);
        setSearchValue("");
      } else {
        setOpenSearch(true);
      }
    };
    document.addEventListener("click", handler, true);

    // clean up
    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, [openSearch]);

  const { data: products } = useGetProductsQuery("?populate=*&");

  // Filtering existing products
  const FILTER_ARR = ["name", "desc", "type"];

  const filteredProducts = products?.data.filter((pdt) =>
    FILTER_ARR.some((key) =>
      pdt.attributes[key].toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const handleKeyBoardNavigation = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((index) =>
        Math.min(index + 1, filteredProducts.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((index) => Math.max(index - 1, 0));
    }
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    setSearchValue("");
    navigate(`/products/${filteredProducts[selectedIndex].id}`);
    setSelectedIndex(0);
    setOpenSearch(false);
  };

  const hasProducts = searchValue && filteredProducts.length > 0;

  const renderSearchResults = filteredProducts?.map((product, index) => {
    // check selected index === product's index
    const isMatched = selectedIndex === index;
    return (
      <li key={product.id}>
        <Link
          to={"/products/" + product.id}
          onClick={() => setSearchValue("")}
          className={`py-1.5 px-5 font-medium block border-l-2 hover:bg-black/5 ${
            // add special class
            isMatched ? "border-blue-500 bg-black/5" : "border-transparent"
          }`}
        >
          {product.attributes.name}
        </Link>
      </li>
    );
  });

  return (
    <div className="relative min-h-[44px] ml-auto md:ml-0">
      <div
        className={`fixed top-0 py-3 md:py-0 left-0 w-full opacity-0 -translate-y-full transition bg-white lg:bg-transparent md:static md:opacity-100 md:translate-y-0 ${
          openSearch ? "opacity-100 translate-y-0" : ""
        }`}
      >
        {/* desktop search */}
        <SearchForm
          onChange={(value) => setSearchValue(value)}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyBoardNavigation}
          className={"hidden md:block"}
        />

        {/* mobile search */}
        {openSearch && (
          <div
            className="flex justify-center md:hidden"
            ref={mobileSearchBarRef}
          >
            <SearchForm
              id="product-search_mobile"
              autoFocus={true}
              onSubmit={handleSubmit}
              onChange={(value) => setSearchValue(value)}
              onKeyDown={handleKeyBoardNavigation}
            />
          </div>
        )}

        {/* Results box */}
        {hasProducts && (
          <ul className="translate-y-2 search-results-box animate-slideIn">
            {renderSearchResults}
          </ul>
        )}
      </div>

      {/* search icon */}
      <span
        className={`search-icon-wrapper 0 md:hidden ${
          openSearch ? "hidden" : ""
        }`}
        onClick={() => setOpenSearch(true)}
      >
        <GoSearch />
      </span>
    </div>
  );
}
export default SearchResults;

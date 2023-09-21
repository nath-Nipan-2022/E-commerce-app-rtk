import { useEffect, useRef, useState } from "react";
import { useGetProductsQuery } from "../../store/apis/productsApi";
import { GoSearch } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

function SearchForm() {
  const [searchValue, setSearchValue] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchFormRef = useRef();

  // close search bar when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!(searchFormRef.current === e.target)) {
        setOpenSearch(false);
        setSelectedIndex(0);
        setSearchValue("");
      } else {
        setOpenSearch(true);
      }
    };
    document.addEventListener("click", handler, true);

    // clean up
    return () => document.removeEventListener("click", handler);
  }, [searchValue]);

  const { data: products } = useGetProductsQuery("?populate=*&");

  // Filtering existing products
  const FILTER_ARR = ["name", "desc", "type"];

  const filteredProducts = products?.data.filter((pdt) =>
    FILTER_ARR.some((key) =>
      pdt.attributes[key].toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const handleKeyBoardNavigation = (e) => {
    const length = filteredProducts.length;

    if (e.key === "ArrowDown" && selectedIndex < length - 1) {
      setSelectedIndex((index) => index + 1);
    } else if (e.key === "ArrowUp" && selectedIndex > 0) {
      setSelectedIndex((index) => index - 1);
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchValue("");
    navigate(`/products/${filteredProducts[selectedIndex].id}`);
    setSelectedIndex(0);
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
          className={`py-1 px-4 font-medium block border-l-2 hover:bg-black/5 ${
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
    <div className="ml-auto md:ml-0">
      <div
        className={`absolute z-10 p-3 md:p-0 top-0 left-0 w-full flex justify-center opacity-0 -translate-y-full bg-white lg:bg-transparent md:static md:opacity-100 md:translate-y-0 ${
          openSearch ? "animate-popUp" : ""
        }`}
      >
        <form onSubmit={handleSubmit} className="relative">
          <input
            className={`py-1.5 md:py-2 px-4 pr-10 outline-none rounded-3xl bg-gray-100 placeholder:text-gray-500`}
            type="search"
            placeholder="Search Products"
            value={searchValue}
            ref={searchFormRef}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyBoardNavigation}
          />
          <span className="absolute top-0 right-0 grid w-10 h-full place-items-center rounded-r-3xl">
            <GoSearch className="text-gray-600 hover:text-gray-800" />
          </span>
        </form>

        <div
          className={`absolute z-10 top-full left-0 lg:left-1/2 lg:-translate-x-1/2 w-full lg:top-14 lg:w-96 px-4 transition-opacity ${
            openSearch && hasProducts
              ? "visible opacity-100"
              : "opacity-0 invisible"
          }`}
        >
          <ul className="py-2 bg-white border rounded-md shadow-xl">
            {renderSearchResults}
          </ul>
        </div>
      </div>

      <span
        className="flex p-2 cursor-pointer place-items-center md:hidden"
        onClick={() => setOpenSearch(true)}
      >
        <GoSearch className="text-gray-700 hover:text-gray-800" />
      </span>
    </div>
  );
}
export default SearchForm;

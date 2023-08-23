import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { useGetProductsQuery } from "../store/apis/productsApi";
import ShowSearchProducts from "./ShowSearchedProducts";

function SearchForm() {
	const [searchValue, setSearchValue] = useState("");
	const [openSearch, setOpenSearch] = useState(false);

	const { data: products } = useGetProductsQuery("?populate=*&");

	const FILTER_ARR = ["name", "desc", "type"];

	const filteredProducts = products?.data.filter((pdt) =>
		FILTER_ARR.some((key) =>
			pdt.attributes[key].toLowerCase().includes(searchValue.toLowerCase())
		)
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearchValue("");
	};

	const hasProducts = searchValue && filteredProducts.length > 0;

	return (
		<div className="ml-auto md:ml-0">
			{/* overlay */}
			{openSearch && (
				<div
					className={"fixed z-20 inset-0 lg:hidden"}
					onClick={() => setOpenSearch(false)}
				></div>
			)}

			<div
				className={`absolute z-20 p-3 md:p-0 top-0 left-0 w-full flex justify-center opacity-0 -translate-y-full bg-white lg:bg-transparent md:static md:opacity-100 md:translate-y-0 ${
					openSearch ? "animate-popUp" : ""
				}`}
			>
				<form
					onSubmit={handleSubmit}
					className="rounded-full flex items-center bg-gray-100 py-1.5 md:py-2 px-4"
				>
					<input
						className={`flex-1 outline-none bg-transparent placeholder:text-gray-500`}
						type="search"
						placeholder="Search Products"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<button type="submit">
						<GoSearch className="ml-2 text-gray-600 hover:text-gray-800" />
					</button>
				</form>
			</div>

			<span
				className="p-2 flex place-items-center md:hidden"
				onClick={() => setOpenSearch(true)}
			>
				<GoSearch className=" text-gray-600 hover:text-gray-800" />
			</span>

			{hasProducts && (
				<ShowSearchProducts
					products={filteredProducts}
					onSelect={() => setSearchValue("")}
				/>
			)}
		</div>
	);
}
export default SearchForm;

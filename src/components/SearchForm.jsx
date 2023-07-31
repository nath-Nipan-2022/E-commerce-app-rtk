import { GoSearch } from "react-icons/go";

function SearchForm({ searchQuery, className }) {
	return (
		<div className={`hidden md:flex items-center rounded-full bg-gray-100`}>
			<input
				className="p-2 pl-4 flex-1 bg-transparent outline-none"
				type="search"
				placeholder="Search Product"
			/>
			<span className="p-3">{<GoSearch />}</span>
		</div>
	);
}
export default SearchForm;

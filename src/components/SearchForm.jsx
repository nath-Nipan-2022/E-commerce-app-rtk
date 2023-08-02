import { GoSearch } from "react-icons/go";

function SearchForm({ searchQuery, className }) {
	return (
		<div className={`p-2 hidden md:flex items-center rounded-full bg-gray-100`}>
			<input
				className="pl-2 flex-1 bg-transparent outline-none placeholder:text-gray-500"
				type="search"
				placeholder="Search Product"
			/>
			<span className="p-1">{<GoSearch className="text-gray-600" />}</span>
		</div>
	);
}
export default SearchForm;

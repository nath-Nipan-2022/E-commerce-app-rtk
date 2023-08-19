
function CategoriesInputs ({ inputs, onChange }) {

	const renderInputs = inputs.map((input) => {
		const { name } = input.attributes;
		
		return (
			<div key={name} className={`flex gap-2 items-center my-2`}>
				<input
					type="checkbox"
					onChange={() => onChange(name)}
					id={name} name={name} />
				<label
					htmlFor={name}
					className={`text-gray-600 hover:text-gray-800 cursor-pointer w-full`}
				>{name}</label>
			</div>
		);
	});

	return (
		<>
			<h3 className="font-medium">Categories</h3>
			<div>{renderInputs}</div>
		</>
	);
}
export default CategoriesInputs;

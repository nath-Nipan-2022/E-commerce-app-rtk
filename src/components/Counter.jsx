import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Button from "./Button";

function Counter({ className, count, onIncrement, onDecrement }) {
	return (
		<div className={`flex items-center ${className}`}>
			<Button
				className={"border-none bg-transparent p-1.5 group"}
				onClick={onDecrement}
			>
				<AiOutlineMinus className="text-gray-500 group-hover:text-gray-800" />
			</Button>
			<span className="select-none font-medium w-4">
				{count > 10 ? count : `0${count}`}
			</span>
			<Button
				className={"border-none bg-transparent p-1.5 group"}
				onClick={onIncrement}
			>
				<AiOutlinePlus className="text-gray-500 group-hover:text-gray-800" />
			</Button>
		</div>
	);
}

export default Counter;

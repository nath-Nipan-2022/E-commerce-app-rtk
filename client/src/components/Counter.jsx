import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Button from "./Button";

function Counter({ className, count, onIncrement, onDecrement }) {
  return (
    <div className={`flex ${className}`}>
      <Button className="px-2.5 group" onClick={onDecrement}>
        <AiOutlineMinus className="text-gray-500 group-hover:text-gray-800" />
      </Button>
      <span className="self-center w-4 text-sm font-semibold select-none">
        {count > 10 ? count : `0${count}`}
      </span>
      <Button className="px-2.5 group" onClick={onIncrement}>
        <AiOutlinePlus className="text-gray-500 group-hover:text-gray-800" />
      </Button>
    </div>
  );
}

export default Counter;

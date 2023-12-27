import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  decrementQuantity,
  incrementQuantity,
  removeCart,
  resetCart,
  toggleCart,
} from "../store/slices/cartsSlice";

export const useCartList = function () {
  const dispatch = useDispatch();
  const { list, isOpen } = useSelector(({ carts }) => carts);

  return {
    isOpen,
    addCart,
    dispatch,
    resetCart,
    removeCart,
    toggleCart,
    cartList: list,
    incrementQuantity,
    decrementQuantity,
  };
};

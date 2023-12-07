import ReactDOM from "react-dom";

function Modal({ className, children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div
        className={`absolute inset-0 z-10 ${className}`}
        onClick={onClose}
      ></div>
      {children}
    </>,
    document.querySelector("#modal-container")
  );
}

export default Modal;

import ReactDOM from "react-dom";

function Modal({ className, children, onClose }) {
	return ReactDOM.createPortal(
		<>
			<div
				className={`fixed z-10 top-0 left-0 w-screen h-full ${className}`}
				onClick={onClose}
			></div>
			{children}
		</>,
		document.querySelector("#modal-container")
	);
}

export default Modal;

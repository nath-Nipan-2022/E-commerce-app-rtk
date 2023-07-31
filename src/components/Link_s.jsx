// import classNames from "classnames";
// import { useNavigationContext } from "../hooks/use-context";

// function Link({ path, children, className, onClick }) {
// 	const { currentPath, navigate } = useNavigationContext();

// 	const handleLinkClick = (e) => {
// 		e.preventDefault();
// 		navigate(path);
// 	};

// 	const classes = classNames(
// 		"p-2 font-medium",
// 		className,
// 		currentPath === path ? "text-blue-500" : "text-slate-700"
// 	);

// 	return (
// 		<>
// 			<a href={path} className={classes} onClick={handleLinkClick}>
// 				{children}
// 			</a>
// 		</>
// 	);
// }
// export default Link;

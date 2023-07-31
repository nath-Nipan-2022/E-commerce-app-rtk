import { useNavigationContext } from "../hooks/use-context";

function Route({ path, children }) {
	const { currentPath } = useNavigationContext();
	if (path === currentPath) {
		return children;
	}
}
export default Route;

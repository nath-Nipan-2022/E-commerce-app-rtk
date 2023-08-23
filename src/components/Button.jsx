import className from "classnames";
import { GoSync } from "react-icons/go";

function Button({
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    loading,
    loadingWithChildren,
    ...rest
}) {
    const classes = className(
        rest.className,
        "flex items-center px-4 py-1.5 border",
        {
            "opacity-80": loading,
            "border-slate-700 bg-slate-700 text-white": primary,
            "border-gray-900 bg-gray-900 text-white": secondary,
            "border-green-500 bg-green-500 text-white": success,
            "border-yellow-400 bg-yellow-400 text-white": warning,
            "border-red-500 bg-red-500 text-white": danger,
            "rounded-full": rounded,
            "border-slate-500": outline,
            "text-slate-700": outline && primary,
            "text-gray-900": outline && secondary,
            "text-green-500": outline && success,
            "text-yellow-400": outline && warning,
            "text-red-500": outline && danger,
        }
    );

    return (
        <button {...rest} disabled={loading} className={classes}>
            {loadingWithChildren ? (
                <span className="flex items-center gap-2">
                    <GoSync className=" animate-spin" />
                    {children}
                </span>
            ) : loading ? (
                <GoSync className=" animate-spin" />
            ) : (
                children
            )}
        </button>
    );
}
export default Button;

import className from "classnames";
import PropTypes from "prop-types";
import { RiLoader4Fill } from "react-icons/ri";
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
  size,
  loadingWithChildren,
  ...rest
}) {
  const classes = className(rest.className, "py-2 px-4 text-base transition", {
    "opacity-80": loading || loadingWithChildren,
    "btn-primary": primary,
    "border border-gray-300 hover:bg-slate-900 hover:border-slate-900 hover:text-white":
      secondary,
    "border border-green-500 bg-green-500 text-white": success,
    "border border-yellow-400 bg-yellow-400 text-white": warning,
    "border border-red-500 bg-red-500 text-white": danger,

    "rounded-full": rounded,
    "border border-neutral-300": outline,
    "text-slate-700": outline && primary,
    "text-gray-900": outline && secondary,
    "text-green-500": outline && success,
    "text-yellow-400": outline && warning,
    "text-red-500": outline && danger,

    "py-1.5 px-3 text-xs": size === "small",
    "py-2 px-4 text-sm": !size || size === "default",
    "py-3 px-6 text-lg": size === "large",
  });

  return (
    <button {...rest} disabled={loading} className={classes}>
      {loadingWithChildren ? (
        <span className="flex items-center justify-center gap-2">
          <RiLoader4Fill className="animate-spin" />
          {children}
        </span>
      ) : loading ? (
        <RiLoader4Fill className="animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  outline: PropTypes.bool,
  rounded: PropTypes.bool,
  loading: PropTypes.bool,
  loadingWithChildren: PropTypes.bool,
  size: PropTypes.oneOf(["small", "large", "default"]),

  checkVariation: ({
    primary,
    secondary,
    success,
    warning,
    danger,
    loading,
    loadingWithChildren,
  }) => {
    const count =
      Number(primary) +
      Number(secondary) +
      Number(success) +
      Number(warning) +
      Number(danger);

    count > 1 && console.warn("one props can only be specified");

    if (Number(loading && loadingWithChildren)) {
      console.warn("You must specify 'loading' or 'loadingWithChildren");
    }
  },
};
export default Button;

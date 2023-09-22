import { Link, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../store/apis/categoriesApi";
import { ProductImage } from "../Product";

function NavLinksDropdown({
  isOpen,
  hasTitle,
  onItemClick,
  className,
  ...rest
}) {
  const { data: categories } = useGetCategoriesQuery(
    "?populate=*populate[0]=products&populate[1]=products.images"
  );

  const navigate = useNavigate();
  const handleCategoryClick = (e, name) => {
    e.preventDefault();
    navigate(`/categories/${name.toLowerCase()}`);
    onItemClick();
  };

  const renderCats = categories?.data.map((item, i) => {
    if (i > 5) return;

    const { name } = item.attributes;
    const images = item.attributes.products.data[0].attributes.images.data;

    return (
      <li key={item.id} className="rounded-md hover:bg-slate-700/10">
        <Link
          to={`/categories/${name.toLowerCase()}`}
          onClick={(e) => handleCategoryClick(e, name)}
          className={`block p-2 lg:flex items-center gap-2`}
        >
          <div className="hidden overflow-hidden rounded-lg shrink-0 w-14 h-14 lg:block">
            <ProductImage
              url={images[0].attributes.url}
              alt={item.desc}
              className="w-14 h-14"
            />
          </div>

          <div className="sm:gap-2 sm:flex sm:items-center lg:items-start sm:pr-8 lg:flex-col lg:w-44 lg:gap-0">
            <h6>{name}</h6>
            <p className="text-xs leading-none lg:text-sm text-slate-600 whitespace-nowrap">
              {Math.floor(Math.random() * 200) + 10} Items Available
            </p>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <div
      {...rest}
      className={`absolute z-20 top-full left-0 ${
        isOpen ? "block" : "hidden"
      } ${className || ""}`}
    >
      <div className="bg-white lg:border lg:shadow-lg lg:rounded-lg animate-popUp">
        {hasTitle && (
          <h4 className="p-2 text-gray-600 border-b lg:p-4">{hasTitle}</h4>
        )}

        <ul className="grid w-full grid-cols-2 gap-2 p-2 rounded-b-md lg:p-4 lg:grid-cols-dropdown">
          {renderCats}
        </ul>
      </div>
    </div>
  );
}

export default NavLinksDropdown;

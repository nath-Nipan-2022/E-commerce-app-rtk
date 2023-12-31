import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../store/apis/categoriesApi";
import { ProductImage } from "../Product";
import Dropdown from "../Dropdown";

function NavLinksDropdown({ isOpen, onItemClick, className }) {
  const { data: items } = useGetCategoriesQuery(
    "?populate=*populate[0]=products&populate[1]=products.images"
  );

  const renderItems = items?.data.map((item, i) => {
    if (i > 5) return;

    const { name, products } = item.attributes;
    const images = products.data[0].attributes.images.data;

    return (
      <li key={item.id} className="rounded-md hover:bg-blue-50">
        <Link
          to={`/categories/${name}`}
          onClick={() => onItemClick()}
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
            <h6 className="font-medium text-gray-600">{name}</h6>
            <p className="text-xs text-gray-500 lg:text-sm whitespace-nowrap">
              {Math.floor(Math.random() * 20) + 10} items available
            </p>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <Dropdown isOpen={isOpen} hasTitle={"Top Categories"} className={className}>
      <ul className="grid w-full grid-cols-2 gap-2 p-2 rounded-b-md lg:p-4 lg:grid-cols-dropdown">
        {renderItems}
      </ul>
    </Dropdown>
  );
}

export default NavLinksDropdown;

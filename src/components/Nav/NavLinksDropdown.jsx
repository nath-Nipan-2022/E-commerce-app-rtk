import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../store/apis/categoriesApi";
import { ProductImage } from "../Product";

function NavLinksDropdown({ className, childrenClassName }) {
  const { data: categories } = useGetCategoriesQuery(
    "?populate=*populate[0]=products&populate[1]=products.images"
  );

  const renderCats = categories?.data.map((item, i) => {
    if (i > 5) return;

    const { name } = item.attributes;
    const images = item.attributes.products.data[0].attributes.images.data;

    return (
      <li key={item.id}>
        <Link
          to={`/categories/${name.toLowerCase()}`}
          className={`block p-2 ${childrenClassName}`}
        >
          <ProductImage
            url={images[0].attributes.url}
            alt={item.desc}
            className="w-16 hidden lg:block"
          />
          <div className="flex flex-col gap-2 justify-between sm:flex-row sm:items-center lg:items-start sm:pr-8 lg:flex-col lg:p-2 lg:w-44">
            <h6>{name}</h6>
            <p className="text-xs lg:text-sm text-slate-500">
              {Math.floor(Math.random() * 200) + 10} Items Available
            </p>
          </div>
        </Link>
      </li>
    );
  });

  return <ul className={className}>{renderCats}</ul>;
}
export default NavLinksDropdown;

import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../store/apis/categoriesApi";
import { ProductImage } from "./Product";
import { getRandomIndex } from "../helper/getRandomIndex";

function CategorySection({ className }) {
  const { data: categories } = useGetCategoriesQuery(
    "?populate=*populate[0]=products&populate[1]=products.images"
  );

  const renderCards = categories?.data.map((item, i) => {
    if (i > 7) {
      return;
    }
    const images = item.attributes.products.data[0].attributes.images.data; // just copied 📋 from console tab
    const randomImgIndex = getRandomIndex(images);
    return (
      <Link
        to={`/categories/${item.attributes.name}`}
        key={item.id}
        className="p-3 border rounded-lg md:p-4 group hover:shadow-lg"
      >
        <figure className="mx-auto overflow-hidden rounded-md lg:w-56 aspect-square">
          <ProductImage
            url={images[randomImgIndex].attributes.url}
            alt={item.desc}
            className="w-full h-full transition-transform duration-200 group-hover:scale-105"
          />
        </figure>
        <div className="pt-3 pb-1 text-xs font-semibold text-center md:text-sm text-accent-slate-blue">
          {item.attributes.name.toUpperCase()}
        </div>
      </Link>
    );
  });

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 gap-8 lg:grid-cols-4 lg:justify-around ${className}`}
    >
      {renderCards}
    </div>
  );
}

export default CategorySection;

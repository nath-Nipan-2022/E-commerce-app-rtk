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
        className="group"
      >
        <figure className="w-56 mx-auto mb-5 overflow-hidden border shadow-lg border-neutral-100 rounded-xl aspect-square">
          <ProductImage
            url={images[randomImgIndex].attributes.url}
            alt={item.desc}
            className="w-full h-full transition-transform duration-200 group-hover:scale-105"
          />
        </figure>
        <div className="font-semibold text-center">
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

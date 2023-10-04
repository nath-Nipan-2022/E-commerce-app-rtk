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
        className="relative h-40 overflow-hidden sm:h-56 group rounded-xl"
      >
        <ProductImage
          url={images[randomImgIndex].attributes.url}
          alt={item.desc}
          className={
            "aspect-auto h-full w-full group-hover:scale-105 transition-transform duration-200"
          }
        />
        <div className="absolute inset-0 flex items-end justify-center p-4 pb-6 text-center text-white bg-gradient-to-t from-black/40 to-[#00000020] font-semibold lg:text-lg">
          {item.attributes.name.toUpperCase()}
        </div>
      </Link>
    );
  });

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 gap-6 lg:grid-cols-4 lg:justify-around ${className}`}
    >
      {renderCards}
    </div>
  );
}

export default CategorySection;

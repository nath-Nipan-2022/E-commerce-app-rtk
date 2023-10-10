import { ProductsList } from "../components/Product";
import CategorySection from "../components/Category";
import Skeleton from "../components/Skeleton";
import Slider from "../components/Slider";
import { useGetProductsQuery } from "../store/apis/productsApi";
import { getRandomIndex } from "../helper/getRandomIndex";

function Home() {
  const { data, isLoading, error } = useGetProductsQuery(
    `?populate=*&filters[type][$eq]=trending`
  );

  const randomIndex = data?.data && getRandomIndex(data.data);

  return (
    <div>
      <section className="overflow-hidden rounded-lg bg-[#dce2e9]">
        {isLoading ? (
          <Skeleton className={"w-full h-44 sm:h-56 lg:h-72 border"} />
        ) : (
          <Slider images={data.data[randomIndex].attributes.images.data} />
        )}
        {error && "Error Loading Slider"}
      </section>

      <section className="py-4 max-container lg:py-10">
        <h2 className="text-h2">Trending Products</h2>
        <ProductsList type="trending" />
      </section>

      <section className="py-8 rounded max-container">
        <h2 className="text-h2">Shop Our Top Categories </h2>
        <CategorySection />
      </section>

      <section className="py-16 max-container">
        <h2 className="text-h2">Most Bought Products</h2>
        <ProductsList type="featured" />
      </section>
    </div>
  );
}
export default Home;

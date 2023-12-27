import { useSelector } from "react-redux";

import NotFoundIcon from "../assets/not_found.webp";
import { ProductsListItem } from "../components/Product";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

export default function WishListPage() {
  const wishlist = useSelector(({ wishlist }) => wishlist.list);

  return (
    <section className="lg:p-12 max-container">
      <h2 className="text-center text-h2">Wishlist</h2>

      {wishlist?.length === 0 && (
        <div className="h-[344px] w-60 mx-auto">
          <figure>
            <img
              src={NotFoundIcon}
              alt="not found"
              width={200}
              height={300}
              className="w-full h-full"
            />
          </figure>
          <div className="flex flex-col items-center">
            <h6 className="p-4 font-semibold text-center">
              Your wishlist is empty.
            </h6>

            <Link
              to={"/"}
              className="flex items-center px-4 py-2 text-sm text-white rounded-lg btn-primary"
            >
              <GoArrowLeft className="mr-2" />
              <span>Explore Products</span>
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        {wishlist.length > 0 &&
          wishlist.map((item) => (
            <ProductsListItem key={item.id} product={item} />
          ))}
      </div>
    </section>
  );
}

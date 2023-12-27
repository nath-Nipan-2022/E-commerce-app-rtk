import { Link } from "react-router-dom";
import EmptyCartIcon from "../assets/not_found.webp";
import OrdersList from "../components/OrdersList";
import Skeleton from "../components/Skeleton";
import { useGetOrdersQuery } from "../store/apis/ordersApi";

import { SignedIn, SignedOut } from "@clerk/clerk-react";

function OrdersPage() {
  const { data: orders, isLoading } = useGetOrdersQuery();

  return (
    <section className="max-w-3xl py-4 mx-auto">
      <h2 className="pb-8 text-3xl font-semibold text-center text-slate-700">
        Orders
      </h2>
      <SignedOut>
        <div className="p-20 rounded-lg bg-slate-50">
          <div className="grid place-items-center">
            <h2 className="mb-6 text-2xl font-semibold">
              You are not signed in.
            </h2>
            <Link
              to="/sign-in"
              className="flex items-center px-6 py-2.5 text-sm text-white rounded-lg btn-primary"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        {isLoading ? renderSkeletons() : <OrdersList orders={orders.data} />}
        {orders?.data?.length === 0 && (
          <div className="h-[250px]">
            <img
              src={EmptyCartIcon}
              alt="empty cart"
              width={100}
              height={150}
              className="w-full h-full"
            />

            <h3 className="py-2 text-lg font-semibold text-center">
              You have not ordered yet.
            </h3>
          </div>
        )}
      </SignedIn>
    </section>
  );
}

function renderSkeletons() {
  return Array(5)
    .fill(0)
    .map((_, i) => {
      return (
        <article className="mt-2 mb-6" key={i}>
          <div className="flex items-center justify-between gap-6 py-4">
            <Skeleton className="w-32 h-2 rounded-md sm:w-40" />
            <Skeleton className="w-32 h-2 rounded-md sm:w-40" />
          </div>
          <div className="flex gap-4 py-4 border-y">
            <Skeleton className="w-32 h-32 rounded-md shrink-0" />
            <div className="flex flex-col flex-1 gap-2 sm:gap-6 sm:flex-row">
              <Skeleton className="w-32 h-2 rounded-md sm:w-40" />
              <div className="mt-2 sm:mt-0">
                <Skeleton className="w-10 h-2 rounded-md" />
                <Skeleton className="w-6 h-2 mt-2 rounded-md" />
              </div>
              <div className="mt-2 sm:mt-0">
                <Skeleton className="w-10 h-2 rounded-md" />
                <Skeleton className="w-6 h-2 mt-2 rounded-md" />
              </div>
              <Skeleton className="w-20 h-6 mt-2 rounded-md sm:mt-0 sm:w-40" />
            </div>
          </div>
        </article>
      );
    });
}
export default OrdersPage;

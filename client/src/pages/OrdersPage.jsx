import EmptyCartIcon from "../assets/not_found.svg";
import OrdersList from "../components/OrdersList";
import Skeleton from "../components/Skeleton";
import { useGetOrdersQuery } from "../store/apis/ordersApi";

function OrdersPage() {
  const { data: orders, isLoading } = useGetOrdersQuery();

  return (
    <section className="max-w-3xl py-4 mx-auto">
      <h1 className="pb-4 text-xl font-bold sm:text-center">Order details</h1>
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

import EmptyCartIcon from "../assets/not_found.svg";
import OrdersList from "../components/OrdersList";
import Skeleton from "../components/Skeleton";
import { useGetOrdersQuery } from "../store/apis/ordersApi";

function OrdersPage() {
  const { data: orders, isLoading } = useGetOrdersQuery();

  return (
    <section className="py-4">
      <h2 className="pb-4 text-xl font-bold border-b">Order details</h2>
      {isLoading ? (
        <div className="sm:flex sm:gap-4">
          <div>
            <Skeleton className="w-32 rounded-md shrink-0" />

            <div className="flex-1 pt-1">
              <Skeleton className="h-2" />
              <Skeleton className="h-2 mt-1" />
              <Skeleton className="h-2 mt-2" />
              <Skeleton className="w-20 mt-4 rounded-md h-11" />
            </div>

            <div className="w-36">
              <Skeleton className="w-10 h-2 mt-2" />
              <Skeleton className="w-32 h-2 mt-2" />

              <br />
              <Skeleton className="w-10 h-2 mt-2" />
              <Skeleton className="h-2 mt-2" />
            </div>
          </div>
        </div>
      ) : (
        <OrdersList orders={orders.data} />
      )}

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

export default OrdersPage;

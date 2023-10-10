import { Link } from "react-router-dom";
import { ProductImage } from "./Product";
import { formateDate } from "../helper";

const OrderItem = ({ product }) => {
  const { name, price, images } = product.attributes;

  return (
    <article className="flex gap-4 py-3 border-b">
      <figure className="overflow-hidden rounded-md w-14 h-14 md:w-32 md:h-32 shrink-0 ">
        <ProductImage url={images.data[0].attributes.url} />
      </figure>

      <div className="flex flex-col flex-1 p-4 text-sm rounded-md sm:flex-row sm:gap-6 bg-background-secondary">
        <h3 className="flex-1">
          <span className="font-semibold">{name}</span>
        </h3>
        <h4>
          <span className="hidden text-gray-500 md:block">Quantity</span>{" "}
          <span className="font-semibold">{product.quantity}</span>
        </h4>
        <h4>
          <span className="hidden text-gray-500 md:block">Price</span>{" "}
          <span className="font-semibold text-accent-blue">{price}</span>
        </h4>
        <Link
          to={`/products/${product.id}`}
          className="px-2 py-1.5 text-xs font-semibold text-center transition border rounded-md border-neutral-300 text-slate-600 hover:bg-accent-slate-blue hover:text-neutral-50 mt-3 sm:mt-0 h-8"
        >
          View details
        </Link>
      </div>
    </article>
  );
};

const OrdersList = ({ orders }) => {
  const renderOrders = orders?.map((_, index) => {
    let order = orders[orders.length - index - 1];

    let titleBar = (
      <div className="flex flex-wrap justify-between gap-1 pb-4 border-b sm:gap-4">
        <h2 className="text-sm">
          Order Id:{" "}
          <span className="font-semibold">
            {order.attributes.stripeId.slice(10, 14)}
          </span>
        </h2>
        <p className="text-sm font-semibold">
          <span className="font-normal text-neutral-600">Order date: </span>
          {formateDate(order.attributes.updatedAt.slice(0, 10))}
        </p>
      </div>
    );

    let items = order.attributes.products.map((product) => (
      <OrderItem key={product.id} product={product} />
    ));

    return (
      <article key={order.id} className="mb-6">
        {titleBar}
        <div className="flex flex-col divide-y rounded-md">{items}</div>
      </article>
    );
  });

  return <div className="mt-6">{renderOrders}</div>;
};

export default OrdersList;

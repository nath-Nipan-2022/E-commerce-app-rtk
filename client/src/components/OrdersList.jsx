import { Link } from "react-router-dom";
import { ProductImage } from "./Product";
import { formateDate } from "../helper";

const OrderItem = ({ product }) => {
  const { name, price, images } = product.attributes;

  return (
    <article className="flex gap-4 py-5 text-sm">
      <figure className="w-[60px] h-[60px] overflow-hidden rounded-lg sm:w-32 sm:h-32 shrink-0 ">
        <ProductImage url={images.data[0].attributes.url} />
      </figure>

      <div className="flex flex-col flex-1 gap-1 p-4 rounded-md lg:gap-6 lg:p-5 sm:items-center sm:flex-row bg-background-secondary">
        <article className="flex-1">
          <h3 className="mb-1">
            <span className="font-semibold leading-6 lg:text-xl">{name}</span>
          </h3>
          {product.color && (
            <h4>
              <span className="text-gray-500">Color: </span>
              <span className="ml-1 font-semibold">{product.color}</span>
            </h4>
          )}
        </article>
        <article className="items-center gap-10 sm:flex">
          <div className="flex gap-4 mb-4 sm:mb-0">
            <h4 className="flex gap-2 sm:flex-col">
              <span className="text-gray-500">Quantity</span>
              <span className="font-semibold">{product.quantity}</span>
            </h4>
            <h4 className="flex gap-2 sm:flex-col">
              <span className="text-gray-500">Price</span>{" "}
              <span className="font-semibold text-accent-blue">${price}</span>
            </h4>
          </div>
          <Link
            to={`/products/${product.id}`}
            className="inline-block text-xs font-semibold text-blue-800 transition rounded hover:text-blue-600"
          >
            View details
          </Link>
        </article>
      </div>
    </article>
  );
};

const OrdersList = ({ orders }) => {
  const renderOrders = orders?.map((_, index) => {
    let order = orders[orders.length - index - 1];

    let titleBar = (
      <div className="flex items-center justify-between h-20 gap-2 border-y">
        <h2 className="text-sm">
          Order Id :{" "}
          <span className="font-semibold">
            {order.attributes.stripeId.slice(10, 14)}
          </span>
        </h2>
        <p className="text-sm font-semibold">
          <span className="font-normal text-neutral-600">Order date : </span>
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

  return <>{renderOrders}</>;
};

export default OrdersList;

import { Link } from "react-router-dom";
import { ProductImage } from "./Product";
import { formateDate } from "../helper";

const OrderItem = ({ product, orderedOn, orderId }) => {
  const { name, price, images } = product.attributes;

  return (
    <article className="gap-4 p-3 border rounded-lg lg:p-4 sm:flex">
      <div className="flex flex-col gap-4">
        <figure className="w-24 h-24 overflow-hidden rounded-md shrink-0 ">
          <ProductImage url={images.data[0].attributes.url} />
        </figure>

        <Link
          to={`/products/${product.id}`}
          className="px-2 py-1.5 text-xs font-semibold text-center transition border rounded-md border-neutral-300 text-slate-600 hover:bg-accent-slate-blue hover:text-neutral-50"
        >
          View details
        </Link>
      </div>

      <div className="flex flex-1 gap-3 p-4 mt-4 rounded-md bg-background-secondary sm:mt-0">
        <div className="flex-1 max-w-md pt-1 text-sm">
          <h3 className="font-semibold leading-tight max-w-[12ch]">{name}</h3>
          <h4 className="my-1 text-lg font-semibold text-accent-blue">
            ${price}
          </h4>
          <h4 className="mtext-sm">Qty: {product.quantity}</h4>
        </div>
        <div className="text-sm sm:w-36">
          <h4 className="text-gray-700">Ordered on</h4>
          <p className="text-xs font-semibold">{formateDate(orderedOn)}</p>
          <h4 className="mt-3 text-gray-700">Order id</h4>
          <p className="text-xs font-semibold">{orderId}</p>
        </div>
      </div>
    </article>
  );
};

const OrdersList = ({ orders }) => {
  const renderOrders = orders?.map((_, index) => {
    let order = orders[orders.length - index - 1];
    return order.attributes.products.map((product) => (
      <OrderItem
        key={product.id}
        product={product}
        orderedOn={order.attributes.updatedAt.slice(0, 10)}
        orderId={order.attributes.stripeId.slice(10, 26)}
      />
    ));
  });

  return (
    <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
      {renderOrders}
    </div>
  );
};

export default OrdersList;

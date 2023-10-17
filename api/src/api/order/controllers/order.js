("use strict");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  /**
   * @param {{ request: { body: { products: any; }; }; response: { status: number; }; }} ctx
   */
  async create(ctx) {
    const { products } = ctx.request.body;
    try {
      const line_items = await Promise.all(
        products.map(
          async (
            /** @type {{id:number,name:string,desc:string,price:number,ratings:number,reviews:number,quantity:number}} */ product
          ) => {
            const item = await strapi
              .service("api::product.product")
              .findOne(product.id);

            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
              },
              quantity: product.quantity,
            };
          }
        )
      );

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["US", "IN"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
        line_items,
      });

      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id } });

      return { stripeSession: session };
    } catch (error) {
      ctx.response.status = 500;
      console.log(error);
      return { error };
    }
  },
}));

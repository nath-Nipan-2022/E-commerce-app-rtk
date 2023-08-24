import paymentLogos from "../assets/paymentLogos.png";
import { footerLinks } from "../constants";

function Footer() {
  return (
    <div className="py-2 px-6 mb-4 lg:max-w-7xl mx-auto">
      {/* <!-- Top section --> */}
      <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-10">
        {footerLinks.map((link) => (
          <div
            className="flex-1 flex flex-col gap-4 text-justify text-sm"
            key={link.title}
          >
            <h1 className="text-base font-semibold text-gray-700">
              {link.title}
            </h1>
            {link.links?.map((link) => (
              <span key={link} className="text-gray-500">
                {link}
              </span>
            ))}
            {link.desc && <span className="text-gray-500">{link.desc}</span>}
          </div>
        ))}
      </div>

      {/* <!-- Bottom section --> */}
      <div className="mt-10 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-blue-600 text-xl">ShopCart</div>
          <div className="text-gray-600 text-sm ml-4">@Copyright 2023</div>
        </div>
        <div>
          <img
            className="h-10 w-full"
            src={paymentLogos}
            alt="payment logos"
            width={100}
            height={44}
          />
        </div>
      </div>
    </div>
  );
}
export default Footer;

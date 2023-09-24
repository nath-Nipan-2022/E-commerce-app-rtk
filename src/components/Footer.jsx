import paymentLogos from "../assets/paymentLogos.png";
import { footerLinks } from "../constants";

function Footer() {
  return (
    <footer className="mt-16 bg-slate-900">
      <div className="px-6 pt-20 pb-10 mx-auto lg:max-w-7xl">
        {/* <!-- Top section --> */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {footerLinks.map((link) => (
            <div className="flex flex-col flex-1 gap-4" key={link.title}>
              <h6 className="font-semibold text-slate-300">{link.title}</h6>
              {link?.links && (
                <ul className="pl-4 text-sm list-disc">
                  {link.links.map((link) => (
                    <li key={link} className="py-1 text-slate-400">
                      {link}
                    </li>
                  ))}
                </ul>
              )}
              {link.desc && (
                <p className="text-sm text-slate-400">{link.desc}</p>
              )}
            </div>
          ))}
        </div>
        {/* <!-- Bottom section --> */}
        <div className="grid items-center grid-cols-2 gap-10 mt-10">
          <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
            <span className="text-2xl font-bold text-blue-600">ShopCart</span>
            <span className="text-sm text-gray-400">@Copyright 2023</span>
          </div>
          <img
            src={paymentLogos}
            alt="payment logos"
            width={100}
            height={44}
            className="w-full ml-auto md:w-[calc(50%-20px)]"
          />
        </div>
      </div>
    </footer>
  );
}
export default Footer;

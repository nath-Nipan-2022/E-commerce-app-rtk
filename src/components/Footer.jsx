import paymentLogos from "../assets/paymentLogos.png";

function Footer() {
	const footerLinks = [
		{
			title: "Category",
			links: ["Women", "Men", "Shoes", "Accessories", "New Arrivals"],
		},
		{
			title: "Links",
			links: ["FAQ", "Pages", "Stores", "Compare", "Cookies"],
		},
		{
			title: "About",
			desc: "Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut et dolore. Lorem ipsum dolor sit amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt ut labore etdolore",
		},
		{
			title: "Contact",
			desc: "Lorem ipsum dolor sit amet conse cLorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sitamet conse ctetur adipisicing elit, seddo eiusmod tempor ",
		},
	];

	return (
		<div className="py-2 mb-4">
			{/* <!-- Top section --> */}
			<div className="mt-20 flex gap-10">
				{footerLinks.map((link) => (
					<div
						className="flex-1 flex flex-col gap-4 text-justify text-sm"
						key={link.title}
					>
						<h1 className="text-base font-semibold text-gray-700">
							{link.title}
						</h1>
						{link.links?.map((l, i) => (
							<span key={i} className="text-gray-500">
								{l}
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
					<div className="text-gray-500 text-sm ml-4">@Copyright 2023</div>
				</div>
				<div>
					<img className="h-10" src={paymentLogos} alt="payment logos" />
				</div>
			</div>
		</div>
	);
}
export default Footer;

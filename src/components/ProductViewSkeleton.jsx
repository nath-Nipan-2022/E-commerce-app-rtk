import Panel from "./Panel";
import Skeleton from "./Skeleton";

function ProductSkeleton() {
	return (
		<section className="px-6 flex flex-col gap-6 sm:gap-12 sm:flex-row">
			{/* Left Section  */}
			<section className="pt-2 lg:px-10 sm:w-1/2">
				<Skeleton className="w-full h-72 lg:h-96 rounded-md border" />
				<div className="w-full flex gap-3 mt-6 ">
					<Skeleton
						times={4}
						className={"w-1/4 h-16 lg:h-20 rounded-md border"}
					></Skeleton>
				</div>
			</section>
			{/* Right Section */}
			<section>
				<Panel className={"mt-3 pb-4"}>
					<Skeleton className="rounded h-3 mb-6" />

					<Skeleton times={2} className="w-1/2 h-2 rounded mb-1" />

					<Skeleton className="mt-10 w-32 h-2" />
				</Panel>

				<Panel className={"border-t py-8"}>
					<Skeleton className="w-1/5 rounded h-2 mb-1" />
					<Skeleton className="w-2/3 h-2"></Skeleton>
				</Panel>

				<Panel className="border-t py-8">
					<Skeleton className="rounded w-1/4 4 h-3 mb-1" />
					<div className="py-4 flex gap-3">
						<Skeleton
							times={5}
							className="rounded-full w-8 h-8 border"
						></Skeleton>
					</div>
				</Panel>
			</section>
		</section>
	);
}
export default ProductSkeleton;

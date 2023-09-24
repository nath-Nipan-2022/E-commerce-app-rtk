import Panel from "../Panel";
import Skeleton from "../Skeleton";

function ProductViewSkeleton() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      {/* Left Section  */}
      <section className="pt-2 lg:px-6 sm:w-1/2 lg:flex lg:flex-row-reverse lg:items-start lg:gap-4">
        <Skeleton className="w-full rounded-md h-72 lg:h-96" />
        <div className="flex justify-between gap-2 mt-6 lg:mt-0 lg:flex-col lg:w-24">
          <Skeleton
            times={4}
            className={"w-1/4 aspect-square lg:w-full rounded-md"}
          ></Skeleton>
        </div>
      </section>
      {/* Right Section */}
      <section className="flex flex-col w-1/2 pr-10">
        <Panel className={"mt-3 pb-4"}>
          <Skeleton className="w-2/3 h-3 mb-3 rounded" />

          <Skeleton times={2} className="w-1/2 h-2 mb-1 rounded" />

          <Skeleton className="w-32 h-2 mt-3" />
        </Panel>

        <Panel className={"border-t py-4"}>
          <Skeleton className="w-1/5 h-2 mb-2 rounded" />
          <Skeleton className="w-2/3 h-2"></Skeleton>
        </Panel>

        <Panel className="py-4 border-t">
          <Skeleton className="w-1/5 h-2 mb-2 rounded" />
          <div className="flex gap-2">
            <Skeleton
              times={4}
              className="w-8 h-8 border rounded-full"
            ></Skeleton>
          </div>
        </Panel>

        <div className="flex flex-col justify-between flex-1">
          <Panel className="py-4 border-t">
            <Skeleton className="w-24 h-2 mb-2 rounded" />
            <Skeleton className="w-24 rounded h-7" />
          </Panel>
          <Panel>
            <Skeleton className="rounded h-9" />
            <Skeleton className="mt-3 rounded h-9" />
          </Panel>
        </div>
      </section>
    </div>
  );
}
export default ProductViewSkeleton;

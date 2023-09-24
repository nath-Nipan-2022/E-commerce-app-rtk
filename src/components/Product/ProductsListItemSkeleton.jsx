import Skeleton from "../Skeleton";

export const ProductsListItemSkeleton = ({ times = 1 }) => {
  return (
    <>
      {Array(times)
        .fill(0)
        .map((_, i) => (
          <article key={i}>
            <Skeleton className="rounded-md h-44 md:h-52" />
            <Skeleton className="mt-2.5 h-2 rounded-2xl" />
            <Skeleton className="w-2/3 h-2 mt-2 rounded-2xl" />
            <Skeleton className="w-2/5 h-2 mt-2 rounded-2xl" />
            <Skeleton className="h-10 mt-3 rounded-md w-28" />
          </article>
        ))}
    </>
  );
};

import { GoArrowLeft } from "react-icons/go";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="grid h-screen pb-10 bg-rose-200 place-items-center"
    >
      <div className="max-w-[260px] p-4">
        <h1 className="mb-4">
          <div className="font-medium">Oops!</div>
          <div className="font-bold leading-none tracking-wide text-9xl">
            404
          </div>
          <div className="text-3xl">
            Something went <span className="font-bold">WRONG!</span>
          </div>
        </h1>
        <Link
          to={"/"}
          className="rounded-full py-1.5 bg-accent-blue text-white font-semibold pl-3 pr-4 hover:bg-slate-700 transition text-sm flex items-center gap-2 w-fit"
        >
          <span>
            <GoArrowLeft />
          </span>
          <span>Back</span>
        </Link>
      </div>
    </div>
  );
}

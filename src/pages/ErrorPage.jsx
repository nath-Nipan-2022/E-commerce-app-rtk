import { GoArrowLeft } from "react-icons/go";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="grid place-items-center h-screen pb-10">
      <div className="max-w-[260px] p-4">
        <h1 className="mb-4">
          <div className="font-medium">Oops!</div>
          <div className="text-9xl tracking-wide">404</div>
          <div className="text-3xl">
            Something went <span className="font-bold">WRONG!</span>
          </div>
        </h1>
        <Link
          to={"/"}
          className="rounded-full py-1.5 bg-slate-600 text-white pl-3 pr-4 hover:bg-slate-700 transition flex items-center gap-2.5 w-fit "
        >
          <span>
            <GoArrowLeft />
          </span>
          <span>Go Back</span>
        </Link>
      </div>
    </div>
  );
}

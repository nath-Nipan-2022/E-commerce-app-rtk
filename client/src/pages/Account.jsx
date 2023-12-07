import Skeleton from "../components/Skeleton";

function Account() {
  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-6 py-10">
      <article className="relative flex flex-col items-center justify-center w-20 h-20 border rounded-full">
        <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
        <div className="h-5 bg-gray-200 rounded-t-full w-9"></div>
      </article>

      <h2 className="text-lg font-bold text-gray-800">John Doe</h2>
      </section>
    </div>
  );
}
export default Account;

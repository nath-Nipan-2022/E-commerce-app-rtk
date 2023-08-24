import Skeleton from "../components/Skeleton";

function Account() {
  return (
    <div>
      <h1 className="text-2xl text-fuchsia-600 font-bold text-center">
        Account Page goes here! ✨
      </h1>
      <Skeleton
        times={1}
        className={"w-52 aspect-square rounded-lg shadow-lg border"}
      />
    </div>
  );
}
export default Account;

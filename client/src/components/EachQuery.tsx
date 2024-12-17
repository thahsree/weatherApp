import { useAllSearches } from "../hooks/useAllSearches";

interface QueryItem {
  email: string;
  query: string;
  created_at: string;
}

export const EachQuery = () => {
  //getting data from hook
  const { data, error, isLoading, isError, isSuccess } = useAllSearches();

  const stackArray: QueryItem[] = Array.isArray(data) ? data.slice(0, 10) : [];

  const getDifference = (dateString: string) => {
    const currentDate = new Date();
    const date = new Date(dateString);

    const timeDifferenceInMilli = currentDate.getTime() - date.getTime();

    const seconds = Math.floor(timeDifferenceInMilli / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day(s) ago`;
    } else if (hours > 0) {
      return `${hours} hour(s) ago`;
    } else if (minutes > 0) {
      return `${minutes} minute(s) ago`;
    } else {
      return `${seconds} second(s) ago`;
    }
  };
  return (
    <div className="flex flex-col gap-5 w-[50%]">
      {stackArray.map((data, i) => (
        <div
          key={i}
          className="flex border rounded-lg px-10 py-4 cursor-pointer hover:bg-slate-200 w-full justify-between items-center"
        >
          <h1 className="text-sm text-gray-500 ">
            <span>{data.email}</span> searched for{" "}
            <span className="text-md text-black">{data.query}</span> weather
          </h1>
          <p className="italic text-xs text-gray-600">
            {getDifference(data.created_at)}
          </p>
        </div>
      ))}
    </div>
  );
};

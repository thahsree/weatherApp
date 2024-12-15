import { useNavigate } from "react-router-dom";
import { useSearchList } from "../hooks/useSearchList";

function Profie() {
  const { data, error, isLoading, isError, isSuccess } = useSearchList();
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="w-full h-[100vh] text-lg font-bold flex justify-center items-center">
        Loading
      </div>
    );
  }
  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh] gap-2 relative">
      <div
        onClick={() => navigate("/")}
        className="absolute bg-red-700 text-white font-bold flex items-center justify-center text-center w-[50px] h-[50px] top-10 left-10 text-[30px] rounded-full"
      >
        ←
      </div>
      <h1 className="font-mono text-xl font-bold">Recent Searches</h1>
      {data?.result.map((item: any, i: number) => (
        <div
          key={i}
          className="flex border px-12 py-5 w-[500px] text-center items-center justify-center"
        >
          {item.query}
        </div>
      ))}
    </div>
  );
}

export default Profie;

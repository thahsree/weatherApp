import { useState } from "react";
import Login from "./Login";
import Navbar from "./Navbar";
import WeatherCard from "./WeatherCard";

import { useAllSearches } from "../hooks/useAllSearches";
import { EachQuery } from "./EachQuery";

function Home() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSignUp, setSignUp] = useState<boolean>(false);

  const { data: searchData } = useAllSearches();

  return (
    <>
      <Navbar setShowLogin={setShowLogin} setSignUp={setSignUp} />
      <main
        className={`px-20 bg-gray-100 h-max py-4 flex flex-col items-center gap-10 transition-all duration-300 ${
          showLogin || showSignUp ? "blur-[1px]" : ""
        }`}
      >
        <WeatherCard />
        {/* <HourlyCard location={district}/> */}

        {searchData ? <EachQuery /> : ""}
      </main>

      {showLogin && (
        <div className="absolute top-[15%] right-[30%] w-[40%] bg-white shadow-lg p-5 rounded-md z-50">
          <Login setShowLogin={setShowLogin} type="Login" />
        </div>
      )}
      {showSignUp && (
        <div className="absolute top-[15%] right-[30%] w-[40%] bg-white shadow-lg p-5 rounded-md z-50">
          <Login setSignUp={setSignUp} type="Signup" />
        </div>
      )}
    </>
  );
}

export default Home;

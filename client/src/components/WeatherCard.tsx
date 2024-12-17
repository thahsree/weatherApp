import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useWeatherSearch } from "../hooks/useWeatherSearch";

interface addressProps {
  district: string;
  newDistrict?: string;
}
function WeatherCard() {
  const { data: weatherData, isLoading, isError } = useWeatherSearch();

  const queryClient = useQueryClient();

  const weather = queryClient.getQueryState<any>(["weather"]);

  const [isDay, setIsDay] = useState<boolean>();

  const [dateString, setDateString] = useState<string>(
    new Date().toISOString()
  );

  useEffect(() => {
    weatherData?.current?.is_day === "no" ? setIsDay(false) : setIsDay(true);
  }, [weatherData]);

  // Parse the date string and format it
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour format
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col items-center bg-white rounded w-[50%] h-max">
      <div className="border-b py-4 flex justify-between px-2 w-full">
        <h4 className="text-sm font-bold text-gray-400 ">TODAYS WEATHER</h4>
        <h4 className="text-sm font-medium text-gray-800">{formattedDate}</h4>
      </div>
      <div className="flex w-full">
        <div className="py-4 px-10">
          <div className="flex items-center gap-3">
            <div className="relative w-[150px] h-[150px]">
              <img
                src={
                  isDay &&
                  !weatherData?.current?.weather_descriptions.some(
                    (desc: any) => desc.toLowerCase()
                  ) &&
                  !["rainy", "winter", "snow"].some((desc) =>
                    weatherData?.current?.weather_descriptions.includes(desc)
                  )
                    ? "/sunny.svg"
                    : !isDay &&
                      !weatherData?.current?.weather_descriptions.some(
                        (desc: any) => desc.toLowerCase()
                      ) &&
                      !["rainy", "winter", "snow"].some((desc) =>
                        weatherData?.current?.weather_descriptions.includes(
                          desc
                        )
                      )
                    ? "/nightclouds.svg"
                    : weatherData?.current?.weather_descriptions.some(
                        (desc: any) => desc.toLowerCase().includes("snow")
                      )
                    ? "/snow.svg"
                    : weatherData?.current?.weather_descriptions.some(
                        (desc: any) => desc.toLowerCase().includes("rain")
                      )
                    ? "/rain.svg"
                    : weatherData?.current?.weather_descriptions.some(
                        (desc: any) => desc.toLowerCase().includes("lightning")
                      )
                    ? "/lightning.svg"
                    : !isDay
                    ? "/nightclouds.svg"
                    : "/sunny.svg"
                }
                alt="weather"
                className="w-full"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[100px] font-semibold tracking-tighter">
                {weatherData?.current?.temperature}°
                <span className="font-semibold text-6xl">c</span>
              </h1>
              <h4 className="text-right font-thin text-lg ">
                Feels like {weatherData?.current?.feelslike}°
              </h4>
            </div>
          </div>
          <h3 className="text-lg font-semibold">
            {weatherData?.current?.weather_descriptions[0]}
          </h3>
        </div>
        <div className="flex flex-col justify-center w-full px-5">
          <div className="flex items-center justify-between w-full py-3 border-b">
            <h3>Wind</h3>
            <p>{weatherData?.current?.wind_speed} km/h</p>
          </div>
          <div className="flex items-center justify-between w-full py-3 border-b">
            <h3>Visibility</h3>
            <p>{weatherData?.current?.visibility}</p>
          </div>
          <div className="flex items-center justify-between w-full py-3">
            <h3>Humidity</h3>
            <p>{weatherData?.current?.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;

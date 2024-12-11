import axios from "axios";
import { useEffect, useState } from "react";

interface addressProps {

    district: string,
    newDistrict?: string
}
function WeatherCard({ district, newDistrict }: addressProps) {



    const [weather, setWeather] = useState<string>('');
    const [feelsLike, setFeelsLike] = useState<string>('');
    const [isDay, setIsDay] = useState<boolean>(true);
    const [windSpeed, setWindSpeed] = useState<number>(0);
    const [weatherDescriptions, setWeatherDescriptions] = useState<string[]>([]);
    const [humidity, setHumidity] = useState<number>(0);
    const [Visibility, setVisibility] = useState<string>('')


    const [dateString, setDateString] = useState<string>(new Date().toISOString());

    // Parse the date string and format it
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Use 12-hour format
    };
    const formattedDate = date.toLocaleDateString('en-US', options);

    useEffect(() => {

        console.log(import.meta.env.VITE_WEATHER_ACCESS_KEY)
        console.log(newDistrict, "newDistrict")
        async function fetchWeatherData() {
            try {

                const access_key = import.meta.env.VITE_WEATHER_ACCESS_KEY
                const response = await axios.get(`https://api.weatherstack.com/current?access_key=${access_key}&query=${newDistrict ? newDistrict : district}`);
                console.log(response, 'res');
                
                setWeather(response.data.current.temperature);
                setFeelsLike(response.data.current.feelslike);
                setIsDay(response.data.current.is_day == 'no' ? false : true);
                setWindSpeed(response.data.current.wind_speed);
                setWeatherDescriptions(response.data.current.weather_descriptions)
                setVisibility(response.data.current.visibility)
                setHumidity(response.data.current.humidity)

                if(response.data.success === false){
                    alert("LOCATION NOT FOUND OR INTERNAL ERROR");
                }
               
            } catch (error) {
                console.log(error);
            }
        }
        fetchWeatherData()

    }, [district, newDistrict])

    return (
        <div className='flex flex-col items-center bg-white rounded w-[50%] h-max'>
            <div className='border-b py-4 flex justify-between px-2 w-full'>
                <h4 className="text-sm font-bold text-gray-400 ">TODAYS WEATHER</h4>
                <h4 className="text-sm font-medium text-gray-800">{formattedDate}</h4>
            </div>
            <div className="flex w-full">
                <div className="py-4 px-10">
                    <div className="flex items-center gap-3">
                        <div className="relative w-[150px] h-[150px]">
                            <img
                                src={
                                    isDay && !weatherDescriptions.some(desc => desc.toLowerCase()) && !['rainy', 'winter', 'snow'].some(desc => weatherDescriptions.includes(desc))
                                        ? "/sunny.svg"
                                        : !isDay && !weatherDescriptions.some(desc => desc.toLowerCase()) && !['rainy', 'winter', 'snow'].some(desc => weatherDescriptions.includes(desc))
                                            ? "/nightclouds.svg"
                                            : weatherDescriptions.some(desc => desc.toLowerCase().includes('snow'))
                                                ? "/snow.svg"
                                                : weatherDescriptions.some(desc => desc.toLowerCase().includes('rain'))
                                                    ? "/rain.svg"
                                                    : weatherDescriptions.some(desc => desc.toLowerCase().includes('lightning'))
                                                        ? "/lightning.svg"
                                                        : !isDay ? "/nightclouds.svg":
                                                            "/sunny.svg"
                                                            
                                }
                                alt="weather"
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-[100px] font-semibold tracking-tighter">{weather}°<span className="font-semibold text-6xl">c</span></h1>
                            <h4 className="text-right font-thin text-lg ">Feels like {feelsLike}°</h4>
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold">{weatherDescriptions[0]}</h3>
                </div>
                <div className="flex flex-col justify-center w-full px-5">
                    <div className="flex items-center justify-between w-full py-3 border-b">
                        <h3>Wind</h3>
                        <p>{windSpeed} km/h</p>
                    </div>
                    <div className="flex items-center justify-between w-full py-3 border-b">
                        <h3>Visibility</h3>
                        <p>{Visibility}</p>
                    </div>
                    <div className="flex items-center justify-between w-full py-3">
                        <h3>Humidity</h3>
                        <p>{humidity}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
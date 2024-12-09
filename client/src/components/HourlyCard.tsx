import axios from "axios";
import { useEffect } from "react";
import EachHour from "./EachHour";

function HourlyCard(location: {location:string}) {

    useEffect(() => {
        const fetchData = async()=>{
            try {

                const access_key = import.meta.env.VITE_WEATHER_ACCESS_KEY
                const res =await axios.get(`http://api.weatherstack.com/historical?access_key=${access_key}&query=${location}&historical_date=2024-12-09&hourly=1`)
                console.log(res,'historical');
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [location])
    return (
        <div className='flex flex-col items-center bg-white rounded w-[50%] h-max'>
            <div className='border-b py-4 flex justify-between px-2 w-full'>
                <h4 className="text-sm font-bold text-gray-400 ">HOURLY WEATHER</h4>
            </div>
            <div className="w-full flex overflow-x-auto scrollbar-hide space-x-4 p-4">
                <EachHour time="9AM" humidity="5%" weather="20°" />
                <EachHour time="9AM" humidity="5%" weather="20°" />
                <EachHour time="9AM" humidity="5%" weather="20°" />
                <EachHour time="9AM" humidity="5%" weather="20°" />
                <EachHour time="9AM" humidity="5%" weather="20°" />
                <EachHour time="9AM" humidity="5%" weather="20°" />
                <EachHour time="9AM" humidity="5%" weather="20°" />
                <EachHour time="9AM" humidity="5%" weather="20°" />
                <EachHour time="9AM" humidity="5%" weather="20°" />
                <EachHour time="9AM" humidity="5%" weather="20°" />
                <EachHour time="9AM" humidity="5%" weather="20°" />
                <EachHour time="9AM" humidity="5%" weather="20°" />
            </div>
        </div>
    );
}

export default HourlyCard;

interface weatherProps{
    time:string,
    weather:string,
    humidity:string
}
function EachHour({time,weather,humidity}:weatherProps) {
    return (
        <div className="flex flex-col py-4 justify-center items-center">
            <h3 className="font-thin">{time}</h3>
            <div className="w-[50px] h-[70px]">
                <img src="/nightclouds.svg" alt="weather" className="w-full" />
            </div>
            <h2 className="text-4xl font-condensed font-bold tracking-tighter scale-x-75"> {weather}</h2>
            <div className="flex items-center justify-center">
                <div className="w-[15px] h-[15px]">
                    <img src="/drop.svg" alt="drop" className="w-full"/>
                </div>
                <h3>{humidity}</h3>
            </div>
        </div>
    );
}

export default EachHour;
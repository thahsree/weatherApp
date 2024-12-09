import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import WeatherCard from './WeatherCard';

function Home() {
    const [address,setAddress] = useState<any>({});
    const [district , setDistrict] = useState<string>('')
    const [newDistrict , setNewDistrict] = useState<string>('');
    

    const fetchLocation = ()=> {
        // Fetch the geolocation data on component mount
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setAddress(data.address);
                    setDistrict(data.address.state_district || data.address.county || '');
                })
                .catch(error => console.error("Geolocation fetch error: ", error));
        });
    }

    useEffect(() => {
        fetchLocation();
    }, []); 
    const state = address?.state || ''; 
    return (
        <>
            <Navbar state={state} district={district} setNewDistrict={setNewDistrict} newDistrict={newDistrict}/>
            <main className='px-20 bg-gray-100 h-[100vh] py-4 flex flex-col items-center gap-10'>
                <WeatherCard  district={district}  newDistrict={newDistrict}/>
                {/* <HourlyCard location={district}/> */}
            </main>
        </>
    );
}

export default Home;
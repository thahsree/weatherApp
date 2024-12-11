import { useEffect, useState } from 'react';
import Login from './Login';
import Navbar from './Navbar';
import WeatherCard from './WeatherCard';

function Home() {
    const [address, setAddress] = useState<any>({});
    const [district, setDistrict] = useState<string>('')
    const [newDistrict, setNewDistrict] = useState<string>('');
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const [showSignUp, setSignUp] = useState<boolean>(false);


    const fetchLocation = () => {
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

    const cookies = document.cookie; // This gives you a string of all cookies
    console.log(cookies,'COOKIES'); // For example: "accessToken=your_token_here; user=JohnDoe"


    useEffect(() => {
        fetchLocation();
    }, []);
    const state = address?.state || '';
    return (
        <>
            <Navbar state={state} district={district} setNewDistrict={setNewDistrict} newDistrict={newDistrict} setShowLogin={setShowLogin} setSignUp={setSignUp} />
            <main className={`px-20 bg-gray-100 h-[100vh] py-4 flex flex-col items-center gap-10 transition-all duration-300 ${showLogin ? 'blur-[1px]' : ''
                }`}>
                <WeatherCard district={district} newDistrict={newDistrict} />
                {/* <HourlyCard location={district}/> */}

            </main>

            {
                showLogin &&
                <div className="absolute top-[15%] right-[30%] w-[40%] bg-white shadow-lg p-5 rounded-md z-50">
                    <Login setShowLogin={setShowLogin} type='Login' />
                </div>
            }
            {
                showSignUp &&
                <div className="absolute top-[15%] right-[30%] w-[40%] bg-white shadow-lg p-5 rounded-md z-50">
                    <Login setSignUp={setSignUp} type='Signup' />
                </div>
            }
        </>
    );
}

export default Home;
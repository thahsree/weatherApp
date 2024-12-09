import { Dispatch, SetStateAction, useState } from "react";

interface AddressProps {
    state: string,
    district: string,
    newDistrict?:string,
    setNewDistrict: Dispatch<SetStateAction<string>>;
}
function Navbar({ state, district, setNewDistrict,newDistrict }: AddressProps) {

    const [updatedDistrict, setUpdateDistrict] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateDistrict(e.target.value); // Update the input field value
    };

    const handleSearch = () => {
        
        if (updatedDistrict) {
            alert(`Searching for weather in: ${updatedDistrict}`);
            setNewDistrict(updatedDistrict); 
        } else {
            alert("Please enter a location to search.");
        }
    };
    return (
        <nav className="flex bg-slate-900  h-20 w-full items-center justify-center gap-32">
            <div className="flex items-center justify-center gap-3">
                <h1 className="text-2xl text-yellow-100 font-semibold">W E A T H E R A P P</h1>
                <p className="text-sm text-white">{district},{state} 20°C</p>
            </div>
            <div className="flex gap-3">
                <input onChange={handleInputChange} type="text" placeholder="enter location" className="px-5 py-1 text-black rounded outline-none" />
                <button onClick={handleSearch} className="rounded flex items-center justify-center px-2 py-1 bg-white">search</button>
            </div>
        </nav>
    );
}

export default Navbar;
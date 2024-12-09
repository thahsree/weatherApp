import { Dispatch, SetStateAction, useState } from "react";

interface AddressProps {
    state: string,
    district: string,
    newDistrict?:string,
    setNewDistrict: Dispatch<SetStateAction<string>>;
    setShowLogin:Dispatch<SetStateAction<boolean>>;
    setSignUp:Dispatch<SetStateAction<boolean>>;
}
function Navbar({ state, district, setNewDistrict,newDistrict,setShowLogin,setSignUp }: AddressProps) {

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
                <p className="text-sm text-white">{!newDistrict ? `${district},${state}`: newDistrict}</p>
            </div>
            <div className="flex gap-3">
                <input onChange={handleInputChange} type="text" placeholder="enter location" className="px-5 py-1 text-black rounded outline-none" />
                <button onClick={handleSearch} className="rounded flex items-center justify-center px-2 py-1 bg-white">search</button>
            </div>
            <div className="flex text-white gap-2">
                <button onClick={()=> {
                    setSignUp(false);
                    setShowLogin(prev => !prev)
                }} className="bg-white font-semibold cursor-pointer text-slate-900 rounded px-2 py-.1">Login</button>
                <button onClick={()=> {
                    setShowLogin(false);
                    setSignUp(prev=> !prev)
                }} className="underline underline-offset-2 font-thin cursor-pointer">Signup</button>
            </div>
        </nav>
    );
}

export default Navbar;
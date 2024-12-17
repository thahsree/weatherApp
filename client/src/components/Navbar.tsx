import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchLocation } from "../hooks/useFetchLocation";

interface AddressProps {
  setShowLogin: Dispatch<SetStateAction<boolean>>;
  setSignUp: Dispatch<SetStateAction<boolean>>;
}


function Navbar({ setShowLogin, setSignUp }: AddressProps) {
  const [updatedDistrict, setUpdateDistrict] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateDistrict(e.target.value); // Update the input field value
  };

  const queryClient = useQueryClient();

  const storedUser = localStorage.getItem("user");
  const user: any = storedUser ? JSON.parse(storedUser) : null;

  const { data: location } = useFetchLocation();

  const handleSearch = async () => {
    if (updatedDistrict) {
      alert(`Searching for weather in: ${updatedDistrict}`);
      queryClient.setQueryData(["location"], updatedDistrict);
    } else {
      alert("Please enter a location to search.");
    }
  };

  const navigate = useNavigate();

  const logout = async () => {
    try {
      localStorage.removeItem("user");
      const res = await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex bg-slate-900  h-20 w-full items-center justify-center gap-32">
      <div className="flex items-center justify-center gap-3">
        <h1 className="text-2xl text-yellow-100 font-semibold">
          W E A T H E R A P P
        </h1>
        <p className="text-sm text-white">{location ? location : "..."}</p>
      </div>
      <div className="flex gap-3 h-full items-center justify-center">
        <div className="flex flex-col relative h-full items-center justify-center">
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="enter location"
            className="w-[250px] px-5 py-1 text-black rounded outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          className="rounded flex items-center justify-center px-2 py-1 bg-white"
        >
          search
        </button>
      </div>

      {user ? (
        <div className="flex items-center justify-center px-3 py-1 gap-2">
          <p className="text-center text-white">
            Hello {user?.user.name.toUpperCase()}
          </p>
          <button
            onClick={logout}
            className="text-white border px-2 py-1 rounded"
          >
            Logout
          </button>
          <div
            onClick={() => navigate("/profile")}
            className="cursor-pointer ml-2 w-[30px] h-[30px] bg-red-600 rounded-full flex items-center justify-center capitalize font-semibold"
          >
            {user?.user.name.charAt(0)}
          </div>
        </div>
      ) : (
        <div className="flex text-white gap-2">
          <button
            onClick={() => {
              setSignUp(false);
              setShowLogin((prev) => !prev);
            }}
            className="bg-white font-semibold cursor-pointer text-slate-900 rounded px-2 py-1"
          >
            Login
          </button>
          <button
            onClick={() => {
              setShowLogin(false);
              setSignUp((prev) => !prev);
            }}
            className="underline underline-offset-2 font-thin cursor-pointer"
          >
            Signup
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

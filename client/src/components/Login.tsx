import axios from "axios";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface FormProps {
  type?: string;
  setShowLogin?: Dispatch<SetStateAction<boolean>>;
  setSignUp?: Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({
  setShowLogin,
  setSignUp,
  type,
}: FormProps) {
  const [showPass, setShowPass] = useState(false); // for password show/hide
  const [showCpass, setShowCpass] = useState(false);

  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Handle close based on the form type (Login/Signup)
  const handleClose = () => {
    if (type === "Login") {
      setShowLogin && setShowLogin((prev) => !prev);
    } else {
      setSignUp && setSignUp((prev) => !prev);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (type === "Login") {
        const data = {
          email,
          password,
        };
        try {
          const response = await axios.post(
            "http://localhost:8080/auth/login",
            data,
            {
              withCredentials: true,
            }
          );
          setShowLogin && setShowLogin(false);

          if (response.status == 201) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }

          return response.data;
        } catch (error: any) {
          alert(error.response.data.message);
        }
      } else {
        try {
          const signUpData = {
            email,
            name: username,
            password,
            confirmPass: confirmPass,
          };
          const res = await axios.post(
            "http://localhost:8080/auth/register",
            signUpData
          );

          alert(res.data.message);

          setSignUp && setSignUp(false);
        } catch (error: any) {
          alert(error.response.data.message);

          console.log(error);
        }
      }
    } catch (error: any) {
      alert("internal server error");
      console.log(error);
    }
  };

  return (
    <div className="border flex flex-col bg-white gap-7 p-12 max-md:justify-center relative">
      <div
        onClick={handleClose}
        className="absolute top-1 right-1 w-[30px] h-[30px] cursor-pointer"
        aria-label="Close form"
      >
        <img src="/close.svg" alt="Close form" className="w-full" />
      </div>

      <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <h3 className="text-center font-bold">
          {type === "Login" ? "Login" : "Sign Up"}
        </h3>

        {/* Username input */}
        {type === "Signup" && (
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="username"
            className="px-5 py-2 border-b outline-none w-full placeholder:text-sm focus:border-black focus:ring-2 focus:ring-gray-400"
          />
        )}

        {/* Email Input */}
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="px-5 py-2 border-b outline-none w-full placeholder:text-sm focus:border-black focus:ring-2 focus:ring-gray-400"
        />

        {/* Password Input */}
        <div className="relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="px-5 py-2 border-b outline-none w-full placeholder:text-sm focus:border-black focus:ring-2 focus:ring-gray-400"
          />
          <div
            className="absolute top-[10%] right-0 cursor-pointer w-[20px] h-[20px] max-sm:w-[15px] max-sm:h-[15px] max-sm:top-[20%]"
            onClick={() => setShowPass((prev) => !prev)}
            aria-label={showPass ? "Hide password" : "Show password"}
          >
            <img
              src={showPass ? "/unlocked.svg" : "/locked.svg"}
              alt={showPass ? "Hide password" : "Show password"}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Confirm Password Input (only for SignUp) */}
        {type === "Signup" && (
          <div className="relative">
            <input
              onChange={(e) => setConfirmPass(e.target.value)}
              type={showCpass ? "text" : "password"}
              placeholder="Confirm Password"
              className="px-5 py-2 border-b outline-none w-full placeholder:text-sm focus:border-black focus:ring-2 focus:ring-gray-400"
            />
            <div
              className="absolute top-[10%] right-0 cursor-pointer w-[20px] h-[20px] max-sm:w-[15px] max-sm:h-[15px] max-sm:top-[20%]"
              onClick={() => setShowCpass((prev) => !prev)}
              aria-label={
                showCpass ? "Hide confirm password" : "Show confirm password"
              }
            >
              <img
                src={showCpass ? "/unlocked.svg" : "/locked.svg"}
                alt={
                  showCpass ? "Hide confirm password" : "Show confirm password"
                }
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="px-10 py-2 w-full bg-black text-white hover:bg-gray-800 transition-colors"
        >
          {type === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

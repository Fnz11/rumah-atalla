/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomToast from "../components/CustomToast";

export default function SignIn() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;
  console.log("DBURL", DBURL);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = async () => {
    setIsLoading(true);
    await axios
      .post(DBURL + "/users/signin", {
        email: email,
        password: password,
      })
      .then((res1) => {
        console.log("Login berhasil!", res1.data);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res1.data.token}`;
        axios
          .post(DBURL + "/users/check/" + res1.data.token)
          .then((res) => {
            console.log(res.data.decodedToken);
            localStorage.setItem("token", res1.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.decodedToken));
            setIsLoading(false);
            navigate("/admin/dashboard");
          })
          .catch((error) => {
            setIsError(true);
          });
      })
      .catch((error) => {
        setIsError(true);
        toast.custom((t) => (
          <CustomToast t={t} message="Sign In Error" type="failed" />
        ));
      });
    setIsLoading(false);
  };

  const User = JSON.parse(localStorage.getItem("user"));
  const fetchUserData = async () => {
    await axios
      .get(DBURL + "/users/" + User?.userId)
      .then((res) => {
        navigate("/admin/dashboard");
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (User) {
      fetchUserData();
    }
  }, []);

  return (
    <>
      <div className="overflow-hidden relative h-screen w-screen sm:justify-start items-center justify-center">
        <img
          src="/Header.jpg"
          className="min-h-screen w-screen min-w-fit absolute z-[-1]"
          alt=""
        />
        <div className="flex z-[10] items-start bg-thirdyThin mx-auto h-screen w-[90%] sm:w-96 sm:px-6 px-4 py-12 sm:ml-32 shadow-xl flex-col">
          {/* LOGO */}
          <div className="flex w-full h-20 -ml-4 justify-center drop-shadow items-center ">
            <img
              src="/LogoBlack.png"
              className="pointer-events-none w-[5.5rem] h-[5.5rem] aspect-square"
              alt="Logo"
            />
            <div className="uppercase  text-[1.7rem] leading-[2.3rem] mb-[0.5rem] text-primaryNormal block">
              <h1 className="-mb-[0.4rem]">Rumah</h1>
              <h1 className="font-bold">Atalla</h1>
              <div className="w-[120%] h-[0.2rem] -my-[0.1rem] rounded-md bg-primaryNormal" />
            </div>
          </div>

          {/* TITLE */}
          <h1 className="w-full text-start text-xl sm:text-2xl mt-3 font-semibold text-primaryNormal drop-shadow-md">
            Sign In
          </h1>

          {/* FORM */}
          <form action="" className="w-full flex flex-col mt-3 gap-3">
            <div>
              <label
                className="text-sm sm:text-base drop-shadow-sm font-semibold text-primaryNormal"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                placeholder="ecample123@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full shadow-sm placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
              />
            </div>
            <div>
              <label
                className="text-sm sm:text-base drop-shadow-sm font-semibold text-primaryNormal"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="text"
                placeholder="example"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full shadow-sm placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
              />
            </div>
            <div className="flex items-center justify-between">
              {isError && (
                <h1 className="text-sm sm:text-base text-red-500 font-semibold">
                  Error Sign In
                </h1>
              )}
              <button
                type="button"
                onClick={handleLogin}
                className={`${
                  isLoading
                    ? "bg-secondary text-thirdyNormal scale-[1.05] drop-shadow-lg opacity-[0.5]"
                    : "text-secondary hover:bg-secondary hover:text-thirdyNormal   hover:scale-[1.05] hover:drop-shadow-lg"
                }  mt-2 sm:text-base text-sm  ml-auto border-2 border-secondary transition-all duration-300  font-bold py-2 px-2 rounded w-28 justify-center flex items-center`}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

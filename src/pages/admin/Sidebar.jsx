import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  // OWNER
  const userRole = JSON.parse(localStorage.getItem("user"))?.role;
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    if (userRole === "owner") {
      setIsOwner(true);
    }
  }, [userRole]);

  return (
    <>
      <div className="w-[3rem] lg:w-[12%] text-sm fixed h-screen bg-primaryVeryThin shadow-md z-[100] flex flex-col justify-between pt-20 transition-all duration-300">
        <div>
          <div className="px-4 py-5 lg:py-3 hidden text-center lg:flex items-center justify-center text-base font-semibold text-white my-1">
            {isOwner ? "OWNER" : "ADMIN"} PANEL
          </div>
          <div className="lg:mx-4 hidden lg:flex items-center h-[1px] w-auto bg-white opacity-[0.6]"></div>

          <div className="px-4 hidden lg:flex font-semibold text-white mt-2 text-[0.6rem] opacity-[0.6]">
            DASHBOARD
          </div>
          {/* DASHBOARD */}
          <Link
            to={"/admin/dashboard"}
            className={`${
              location.pathname === "/admin/dashboard" &&
              "bg-primaryNormal drop-shadow-md"
            } flex items-center justify-between text-thirdyThin drop-shadow-sm  px-4 py-5 lg:py-3 transition-all duration-300 `}
          >
            <div className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-user scale-[0.8] fa-lg"></i>
              <h1 className="  lg:flex hidden">Dashboard</h1>
            </div>
            <div className="xl:flex hidden">
              <i className="fa-solid fa-chevron-right scale-[0.8]  fa-md"></i>
            </div>
          </Link>

          {/* TRANSACTION */}
          <Link
            to={"/admin/transactions"}
            className={`${
              location.pathname === "/admin/transactions" &&
              "bg-primaryNormal drop-shadow-md"
            } flex items-center  text-thirdyThin drop-shadow-sm  px-4 py-5 lg:py-3 justify-between transition-all duration-300 `}
          >
            <div className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-file-invoice scale-[0.8] fa-lg"></i>
              <h1 className="  lg:flex hidden">Transaction</h1>
            </div>
            <div className="xl:flex hidden">
              <i className="fa-solid fa-chevron-right scale-[0.8]  fa-md"></i>
            </div>
          </Link>

          <div className="lg:mx-4 flex items-center h-[0.1px] w-auto bg-white opacity-[0.6]  drop-shadow-xl"></div>

          <div className="px-4 hidden lg:flex font-semibold text-white mt-2 text-[0.6rem] opacity-[0.6]">
            CONTROLLER
          </div>
          {/* PROMO */}
          {isOwner && (
            <Link
              to={"/admin/promo"}
              className={`${
                location.pathname === "/admin/promo" &&
                "bg-primaryNormal drop-shadow-md"
              } flex items-center  text-thirdyThin drop-shadow-sm  px-4 py-5 lg:py-3 justify-between transition-all duration-300 `}
            >
              <div className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-tag scale-[0.8] fa-lg"></i>
                <h1 className="  lg:flex hidden">Promo</h1>
              </div>
              <div className="xl:flex hidden">
                <i className="fa-solid fa-chevron-right scale-[0.8]  fa-md"></i>
              </div>
            </Link>
          )}

          {/* PRODUCT CONTROL */}
          <Link
            to={"/admin/product"}
            className={`${
              location.pathname === "/admin/product" &&
              "bg-primaryNormal drop-shadow-md"
            } flex items-center text-thirdyThin drop-shadow-sm  px-4 py-5 lg:py-3 justify-between transition-all duration-300 `}
          >
            <div className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-box scale-[0.8] fa-lg"></i>
              <h1 className="  lg:flex hidden">Product</h1>
            </div>
            <div className="xl:flex hidden">
              <i className="fa-solid fa-chevron-right scale-[0.8]  fa-md"></i>
            </div>
          </Link>

          {/* USER CONTROL */}
          {isOwner && (
            <Link
              to={"/admin/user"}
              className={`${
                location.pathname === "/admin/user" &&
                "bg-primaryNormal drop-shadow-md"
              } flex items-center   text-thirdyThin drop-shadow-sm  px-4 py-5 lg:py-3 justify-between transition-all duration-300 `}
            >
              <div className="flex items-center justify-center gap-2">
                <i className="fa-solid -mr-1 fa-users scale-[0.8] fa-lg"></i>
                <h1 className="  lg:flex hidden">User</h1>
              </div>
              <div className="xl:flex hidden">
                <i className="fa-solid fa-chevron-right scale-[0.8]  fa-md"></i>
              </div>
            </Link>
          )}

          <div className="lg:mx-4 flex items-center h-[0.1px] w-auto bg-white opacity-[0.6]  drop-shadow-xl"></div>

          <div className="px-4 hidden lg:flex font-semibold text-white mt-2 text-[0.6rem] opacity-[0.6]">
            CASHIER
          </div>
          {/* KASIR FOODS */}
          <Link
            to={"/admin/foods"}
            className={`${
              location.pathname === "/admin/foods" &&
              "bg-primaryNormal drop-shadow-md"
            } flex items-center text-thirdyThin drop-shadow-sm  px-4 py-5 lg:py-3 justify-between transition-all duration-300 `}
          >
            <div className="flex items-center justify-center gap-2">
              <i className="scale-[0.8] fa-lg  fa-solid fa-cash-register"></i>
              <h1 className="  lg:flex hidden">Foods</h1>
            </div>
            <div className="xl:flex hidden">
              <i className="fa-solid fa-chevron-right scale-[0.8]  fa-md"></i>
            </div>
          </Link>

          {/* KASIR FASHIONS */}
          <Link
            to={"/admin/fashions"}
            className={`${
              location.pathname === "/admin/fashions" &&
              "bg-primaryNormal drop-shadow-md"
            } flex items-center text-thirdyThin drop-shadow-sm  px-4 py-5 lg:py-3 justify-between transition-all duration-300 `}
          >
            <div className="flex items-center justify-center gap-2">
              <i className="scale-[0.8] fa-lg  fa-solid fa-cash-register"></i>
              <h1 className="  lg:flex hidden">Fashions</h1>
            </div>
            <div className="xl:flex hidden">
              <i className="fa-solid fa-chevron-right scale-[0.8]  fa-md"></i>
            </div>
          </Link>
        </div>

        <div className="flex flex-col mb-3 ">
          <div className="lg:mx-4 flex items-center h-[0.1px] w-auto bg-white opacity-[0.6]  drop-shadow-xl"></div>

          {/* LOGOUT */}
          <button className=" flex items-center gap-2 text-thirdyThin drop-shadow-sm  px-4 py-5 lg:py-3 justify-start ">
            <i className="fa-solid fa-arrow-right-from-bracket scale-[0.8] fa-lg"></i>
            <h1
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
              className=" lg:flex hidden"
            >
              Log Out
            </h1>
          </button>
        </div>
      </div>
    </>
  );
}

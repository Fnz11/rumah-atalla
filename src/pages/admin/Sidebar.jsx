import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LinkSide from "../../components/Sidebar/LinkSide";

export default function Sidebar() {
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
      <div className="w-[3rem] lg:w-[15%]   text-sm fixed h-[94.5vh] bg-primaryNormal rounded-r-2xl sm:rounded-2xl  shadow-md z-[100] flex flex-col justify-between  transition-all duration-300">
        <div>
          <Link
            to={"/"}
            className="flex w-full -ml-2  mt-4 sm:mt-7 mb-5 justify-center drop-shadow items-center "
          >
            <img
              src="/LogoWhite.png"
              className="scale-[1] pointer-events-none h-[1.8rem] max-lg:ml-4 lg:h-[3rem] aspect-square"
              alt="Logo"
            />
            <div className="uppercase ml-1 text-[1rem] leading-[1.4rem] mb-[0.5rem] text-white hidden lg:block">
              <h1 className="-mb-[0.4rem]">Rumah</h1>
              <h1 className="font-bold">Atalla</h1>
              <div className="w-[110%] h-[0.1rem] -my-[0.15rem] rounded-md bg-white" />
            </div>
          </Link>
          <div className="lg:mx-4 mt-4 hidden lg:flex items-center h-[1px] w-auto bg-white opacity-[0.6]"></div>

          <div className="px-4 hidden lg:flex font-semibold text-white  text-[0.6rem] opacity-[0.6]">
            DASHBOARD
          </div>
          {/* DASHBOARD */}
          <LinkSide path={"/admin/dashboard"} name={"Dashboard"}>
            <i className="fa-solid fa-user scale-[0.8] fa-lg"></i>
          </LinkSide>

          {/* TRANSACTION */}
          <LinkSide path={"/admin/transactions"} name={"Transaction"}>
            <i className="fa-solid fa-file-invoice scale-[0.8] fa-lg"></i>
          </LinkSide>

          <div className="lg:mx-4 flex items-center h-[0.1px] w-auto bg-white opacity-[0.6]  drop-shadow-xl"></div>

          <div className="px-4 hidden lg:flex font-semibold text-white mt-2 text-[0.6rem] opacity-[0.6]">
            CONTROLLER
          </div>
          {/* PROMO */}
          {isOwner && (
            <LinkSide path={"/admin/promo"} name={"Promo"}>
              <i className="fa-solid fa-tag scale-[0.8] fa-lg"></i>
            </LinkSide>
          )}

          {/* PRODUCT CONTROL */}
          <LinkSide path={"/admin/product"} name={"Product"}>
            <i className="fa-solid fa-box scale-[0.8] fa-lg"></i>
          </LinkSide>

          {/* USER CONTROL */}
          {isOwner && (
            <LinkSide path={"/admin/user"} name={"User"}>
              <i className="fa-solid -mr-1 fa-users scale-[0.8] fa-lg"></i>
            </LinkSide>
          )}

          <div className="lg:mx-4 flex items-center h-[0.1px] w-auto bg-white opacity-[0.6]  drop-shadow-xl"></div>

          <div className="px-4 hidden lg:flex font-semibold text-white mt-2 text-[0.6rem] opacity-[0.6]">
            CASHIER
          </div>
          {/* KASIR FOODS */}
          <LinkSide path={"/admin/foods"} name={"Foods"}>
            <i className="fa-solid -mr-1 fa-bowl-food scale-[0.8] fa-lg"></i>
          </LinkSide>

          {/* KASIR FASHIONS */}
          <LinkSide path={"/admin/fashions"} name={"Fashions"}>
            <i className="fa-solid -mr-1 fa-shirt scale-[0.8] fa-lg"></i>
          </LinkSide>
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
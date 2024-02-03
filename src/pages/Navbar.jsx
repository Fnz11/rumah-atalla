/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Sidebar from "./admin/Sidebar";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

export default function Navbar() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;

  const navigate = useNavigate();
  const [userOpen, setUserOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const adminPage = location.pathname.startsWith("/admin");

  const User = localStorage?.getItem("user")
    ? JSON.parse(localStorage?.getItem("user"))
    : null;
  const [userData, setUserData] = useState(null);
  const fetchUserData = async () => {
    await axios
      .get(DBURL + "/users/" + User?.userId)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        if (err.status === 404) {
          navigate("/");
        } else {
          fetchUserData();
        }
        console.log(err);
      });
  };

  useEffect(() => {
    if (User) {
      fetchUserData();
    } else if (adminPage && !userData) {
      navigate("/");
    }
  }, [window.location, adminPage]);

  return (
    <>
      {!adminPage && (
        <div className="h-20 w-screen px-5 xl:px-28 py-6 bg-primaryNormal flex justify-between shadow-md fixed z-[150]">
          {userOpen && (
            <div
              onClick={() => setUserOpen(!userOpen)}
              className="z-[160] w-full h-full absolute top-0 left-0"
            ></div>
          )}
          {/* LEFT SIDE */}
          <div className="flex items-center">
            {/* LOGO */}
            <Link
              to={"/"}
              className="flex mr-3 lg:mr-16 w-[3.7rem] drop-shadow items-center"
            >
              <img
                src="/LogoWhite.png"
                className="w-[3.7rem] h-[3.7rem] aspect-square"
                alt="Logo"
              />
              <div className="uppercase ml-1 text-base text-thirdyNormal hidden sm:block">
                <h1 className="-mb-[0.4rem]">Rumah</h1>
                <h1 className="font-bold">Atalla</h1>
                <div className="w-[120%] h-[0.1rem] -my-[0.15rem] rounded-md bg-thirdyNormal" />
              </div>
            </Link>

            {/* Link */}
            <div className="text-white ml-10 gap-6 text-lg font-medium lg:flex items-center hidden">
              {/* <Link
              to="/"
              className="text-thirdyThin drop-shadow hover:text-thirdyNormal"
            >
              About
            </Link> */}
              {/* <Link
              to="/products"
              className="text-thirdyThin drop-shadow hover:text-thirdyNormal"
            >
              Products
            </Link>
            <Link
              to="/foods"
              className="text-thirdyThin drop-shadow hover:text-thirdyNormal"
            >
              Foods
            </Link> */}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex w-full ">
            <div className="flex items-center justify-center lg:justify-end w-full ">
              {/* SEARCH */}
              {/* <div className="relative">
              <div className="absolute w-full inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-[45vw] lg:w-[20rem] placeholder:text-gray-600 bg-[#F6FAF2] focus:outline-white p-2 pl-10 text-sm text-gray-600 border rounded-lg "
                placeholder="Search..."
                // style="color: white"
                required
              />
            </div> */}
              <button className=" flex items-center gap-2 hover:opacity-[0.8] hover:scale-[0.95] transition-all duration-300 text-thirdyThin drop-shadow-sm  px-4 py-5 lg:py-3 justify-start ">
                {userData ? (
                  <>
                    <i className="fa-solid fa-arrow-right-from-bracket scale-[0.8] fa-lg"></i>
                    <h1
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        setUserData(null);
                        navigate("/");
                      }}
                      className=" lg:flex hidden whitespace-nowrap"
                    >
                      Log Out
                    </h1>
                  </>
                ) : (
                  <h1
                    onClick={() => navigate("login")}
                    className=" lg:flex hidden whitespace-nowrap"
                  >
                    Log In
                  </h1>
                )}
              </button>
            </div>
            {userData && (
              <div className="text-white items-center flex gap-3 lg:gap-6 font-medium ">
                {/* LOGOUT */}

                {/* <Link
              to="/cart"
              className="text-thirdyThin drop-shadow hover:text-thirdyNormal"
            >
              <i className="fa-solid fa-cart-shopping fa-lg scale-[0.8]"></i>
            </Link> */}
                {/* USER */}
                <div className="flex items-center justify-center ">
                  <button
                    onClick={() => setUserOpen(!userOpen)}
                    className="text-thirdyThin hidden lg:flex items-center drop-shadow hover:text-thirdyNormal hover:opacity-[0.8] hover:scale-[0.95] transition-all duration-300"
                  >
                    <img
                      src={
                        userData?.imageUrl ? userData?.imageUrl : "/Profile.png"
                      }
                      className="h-10 aspect-square object-cover rounded-full drop-shadow-md"
                      alt=""
                    />
                    {/* <div className="h-8 w-8 rounded-full bg-thirdyThin"></div> */}
                  </button>

                  {/* DROPDOWN USER */}
                  <div
                    className={` relative lg:flex  justify-center hidden text-lg`}
                  >
                    <div
                      onMouseMove={() => {
                        if (userOpen) {
                          setUserOpen(true);
                        }
                      }}
                      className={`absolute rounded-2xl top-6 bg-white shadow-xl right-[0.5rem] xl:-right-[4.8rem] z-[100]  ${
                        userOpen
                          ? "h-[36rem] opacity-100 visible"
                          : "h-0 opacity-0 shadow-md invisible"
                      } w-[25rem] flex flex-col p-3 transition-all duration-700 items-center text-center gap-3`}
                    >
                      <Link
                        to={"/admin/dashboard"}
                        onClick={() => setUserOpen(false)}
                        className={`
                       font-semibold text-xl  drop-shadow-sm text-gray-600 ${
                         userOpen
                           ? "opacity-100 translate-x-0"
                           : "opacity-0 translate-x-20"
                       } transition-all delay-[0.15s] duration-300 flex items-center flex-col w-[90%] py-2`}
                      >
                        <div className="h-20 w-20 rounded-full">
                          <img
                            src={
                              userData?.imageUrl
                                ? userData?.imageUrl
                                : "/Profile.png"
                            }
                            className="h-20 aspect-square object-cover rounded-full drop-shadow-md"
                            alt=""
                          />
                        </div>
                        <h1 className="mt-2">
                          Hi,{" "}
                          {JSON.parse(localStorage.getItem("user"))?.username}!
                        </h1>
                      </Link>
                      <div className="flex w-full gap-3">
                        <Link
                          to={"/admin/transactions"}
                          onClick={() => setUserOpen(false)}
                          className={`w-[50%] flex items-center overflow-hidden rounded-2xl relative justify-center bg-[rgba(0,0,0,0.5)] group h-[7rem] font-medium drop-shadow-sm text-white ${
                            userOpen
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-20"
                          } transition-all delay-[0.2s] duration-300  w-[90%] py-2`}
                        >
                          <img
                            src="https://terralogiq.com/wp-content/uploads/2022/10/Transaction-Analysis-1024x683.jpg"
                            className={`absolute w-full z-[0] h-full object-cover  transition-all duration-700  ${
                              location.pathname === "/admin/transactions"
                                ? "scale-[1.2] rotate-3 group-hover:scale-[1] group-hover:rotate-0"
                                : "group-hover:scale-[1.2] group-hover:rotate-3"
                            }`}
                            alt=""
                          />
                          <div
                            className={`absolute   ${
                              location.pathname === "/admin/transactions"
                                ? "opacity-[0.7] bg-[rgba(0,0,0,0.6)]"
                                : "group-hover:opacity-[0.7] bg-[rgba(0,0,0,0.8)] group-hover:bg-[rgba(0,0,0,0.6)]"
                            } w-full h-full z-[1]  transition-all duration-300`}
                          ></div>
                          <h1 className="z-[1]">
                            <i className="fa-solid fa-file-invoice scale-[0.8] fa-lg mr-1"></i>
                            Transactions
                          </h1>
                        </Link>
                        <Link
                          to={"/admin/promo"}
                          onClick={() => setUserOpen(false)}
                          className={`w-[50%] flex items-center rounded-2xl relative  justify-center bg-secondary h-[7rem] font-medium drop-shadow-sm text-white ${
                            userOpen
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-20"
                          } transition-all delay-[0.25s] group rounded-2xl overflow-hidden duration-300  w-[90%] py-2`}
                        >
                          <img
                            src="https://images.bisnis.com/posts/2022/08/11/1565861/diskon-makanan-promo-makanan-diskon-hari-ini.jpg"
                            className={`absolute w-full z-[0] h-full object-cover  transition-all duration-700  ${
                              location.pathname === "/admin/promo"
                                ? "scale-[1.2] rotate-3 group-hover:scale-[1] group-hover:rotate-0"
                                : "group-hover:scale-[1.2] group-hover:rotate-3"
                            }`}
                            alt=""
                          />
                          <div
                            className={`absolute   ${
                              location.pathname === "/admin/promo"
                                ? "opacity-[0.7] bg-[rgba(0,0,0,0.6)]"
                                : "group-hover:opacity-[0.7] bg-[rgba(0,0,0,0.8)] group-hover:bg-[rgba(0,0,0,0.6)]"
                            } w-full h-full z-[1]  transition-all duration-300`}
                          ></div>
                          <h1 className="z-[1]">
                            <i className="fa-solid fa-tag scale-[0.8] fa-lg mr-1"></i>
                            Promo
                          </h1>
                        </Link>
                      </div>

                      <div className="flex w-full gap-3">
                        <Link
                          to={"/admin/product"}
                          onClick={() => setUserOpen(false)}
                          className={`w-[50%] flex items-center overflow-hidden rounded-2xl relative justify-center bg-[rgba(0,0,0,0.5)] group h-[7rem] font-medium drop-shadow-sm text-white ${
                            userOpen
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-20"
                          } transition-all delay-[0.2s] duration-300  w-[90%] py-2`}
                        >
                          <img
                            src="https://www.dreamhost.com/blog/wp-content/uploads/2019/06/afa314e6-1ae4-46c5-949e-c0a77f042e4f_DreamHost-howto-prod-descrips-full.jpeg"
                            className={`absolute w-full z-[0] h-full object-cover  transition-all duration-700  ${
                              location.pathname === "/admin/product"
                                ? "scale-[1.2] rotate-3 group-hover:scale-[1] group-hover:rotate-0"
                                : "group-hover:scale-[1.2] group-hover:rotate-3"
                            }`}
                            alt=""
                          />
                          <div
                            className={`absolute   ${
                              location.pathname === "/admin/product"
                                ? "opacity-[0.7] bg-[rgba(0,0,0,0.6)]"
                                : "group-hover:opacity-[0.7] bg-[rgba(0,0,0,0.8)] group-hover:bg-[rgba(0,0,0,0.6)]"
                            } w-full h-full z-[1]  transition-all duration-300`}
                          ></div>
                          <h1 className="z-[1]">
                            <i className="fa-solid fa-box scale-[0.8] fa-lg mr-1"></i>
                            Product Control
                          </h1>
                        </Link>
                        <Link
                          to={"/admin/user"}
                          onClick={() => setUserOpen(false)}
                          className={`w-[50%] flex items-center rounded-2xl relative  justify-center bg-secondary h-[7rem] font-medium drop-shadow-sm text-white ${
                            userOpen
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-20"
                          } transition-all delay-[0.25s] group rounded-2xl overflow-hidden duration-300  w-[90%] py-2`}
                        >
                          <img
                            src="https://atlassianblog.wpengine.com/wp-content/uploads/2022/01/2240x1090-1-1560x760.jpg"
                            className={`absolute w-full z-[0] h-full object-cover  transition-all duration-700  ${
                              location.pathname === "/admin/user"
                                ? "scale-[1.2] rotate-3 group-hover:scale-[1] group-hover:rotate-0"
                                : "group-hover:scale-[1.2] group-hover:rotate-3"
                            }`}
                            alt=""
                          />
                          <div
                            className={`absolute   ${
                              location.pathname === "/admin/user"
                                ? "opacity-[0.7] bg-[rgba(0,0,0,0.6)]"
                                : "group-hover:opacity-[0.7] bg-[rgba(0,0,0,0.8)] group-hover:bg-[rgba(0,0,0,0.6)]"
                            } w-full h-full z-[1]  transition-all duration-300`}
                          ></div>
                          <h1 className="z-[1]">
                            <i className="fa-solid fa-users scale-[0.8] fa-lg mr-1"></i>
                            User Control
                          </h1>
                        </Link>
                      </div>

                      <div className="flex w-full gap-3">
                        <Link
                          to={"/admin/foods"}
                          onClick={() => setUserOpen(false)}
                          className={`w-[50%] flex items-center overflow-hidden rounded-2xl relative justify-center bg-[rgba(0,0,0,0.5)] group h-[7rem] font-medium drop-shadow-sm text-white ${
                            userOpen
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-20"
                          } transition-all delay-[0.2s] duration-300  w-[90%] py-2`}
                        >
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl6SzfGl7TUhR-NEd2sL_rwbaBq-7dRG2Cxg&usqp=CAU"
                            className={`absolute w-full z-[0] h-full object-cover  transition-all duration-700  ${
                              location.pathname === "/admin/foods"
                                ? "scale-[1.2] rotate-3 group-hover:scale-[1] group-hover:rotate-0"
                                : "group-hover:scale-[1.2] group-hover:rotate-3"
                            }`}
                            alt=""
                          />
                          <div
                            className={`absolute   ${
                              location.pathname === "/admin/foods"
                                ? "opacity-[0.7] bg-[rgba(0,0,0,0.6)]"
                                : "group-hover:opacity-[0.7] bg-[rgba(0,0,0,0.8)] group-hover:bg-[rgba(0,0,0,0.6)]"
                            } w-full h-full z-[1]  transition-all duration-300`}
                          ></div>
                          <h1 className="z-[1]">
                            <i className="fa-solid fa-box scale-[0.8] fa-lg mr-1"></i>
                            Foods
                          </h1>
                        </Link>
                        <Link
                          to={"/admin/fashions"}
                          onClick={() => setUserOpen(false)}
                          className={`w-[50%] flex items-center rounded-2xl relative  justify-center bg-secondary h-[7rem] font-medium drop-shadow-sm text-white ${
                            userOpen
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-20"
                          } transition-all delay-[0.25s] group rounded-2xl overflow-hidden duration-300  w-[90%] py-2`}
                        >
                          <img
                            src="https://img.freepik.com/premium-photo/group-young-beautiful-muslim-women-fashionable-dress-with-hijab-using-mobile-phone-while-taking-selfie-picture-front-black-chalkboard-representing-modern-islam-fashion-technology-ramad_530697-51545.jpg"
                            className={`absolute w-full z-[0] h-full object-cover  transition-all duration-700  ${
                              location.pathname === "/admin/fashions"
                                ? "scale-[1.2] rotate-3 group-hover:scale-[1] group-hover:rotate-0"
                                : "group-hover:scale-[1.2] group-hover:rotate-3"
                            }`}
                            alt=""
                          />
                          <div
                            className={`absolute   ${
                              location.pathname === "/admin/fashions"
                                ? "opacity-[0.7] bg-[rgba(0,0,0,0.6)]"
                                : "group-hover:opacity-[0.7] bg-[rgba(0,0,0,0.8)] group-hover:bg-[rgba(0,0,0,0.6)]"
                            } w-full h-full z-[1]  transition-all duration-300`}
                          ></div>
                          <h1 className="z-[1]">
                            <i className="fa-solid fa-users scale-[0.8] fa-lg mr-1"></i>
                            Fashions
                          </h1>
                        </Link>
                      </div>

                      <h1 className="text-sm mt-3 text-gray-600">
                        © 2023 Rumah Atalla —@Raffi Atalla Atmaja
                      </h1>
                    </div>
                  </div>
                </div>
                {/* DROPDOWN BUTTON */}
                <button className="text-thirdyThin lg:hidden flex items-center drop-shadow hover:text-thirdyNormal ">
                  <i className="fa-solid fa-bars fa-xl scale-[0.85]"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {userOpen && (
        <div
          onClick={() => setUserOpen(false)}
          className="h-screen w-screen absolute z-[100]"
        ></div>
      )}

      <div className="flex bg-thirdyThin">
        <div
          className={`h-screen w-[3%] lg:w-[12%] ${
            adminPage ? "flex" : "hidden"
          }`}
        ></div>
        <div
          className={` w-full flex  translate-y-[2.5vh] ${
            adminPage ? "sm:translate-x-[1rem]" : "-translate-x-[14.5rem]"
          } fixed z-[100]`}
        >
          <Sidebar />
        </div>
        <div
          className={`${
            adminPage ? "w-[93%] lg:w-[88%] pl-[3.8rem] " : "w-full"
          }`}
        >
          <div className="w-full flex flex-col pr-2 sm:px-8 lg:px-16">
            {/* <AdminNavbar /> */}
            <div className="w-full flex flex-col justify-center items-center">
              <div className="bg-section-dark w-full h-[4rem] rounded-2xl shadow-lg mt-5 flex items-center px-5 py-3 text-white">
                AdminNavbar
              </div>
            </div>
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

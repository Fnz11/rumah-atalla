import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function AdminNavbar({ User }) {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="justify-between bg-section-dark w-full h-[4rem] rounded-2xl shadow-lg mt-5 flex items-center px-5 py-3 text-white">
          <span>
            {User?.role === "owner" ? (
              <>
                Welcome back,
                <span className="text-thirdyNormal ml-2 font-semibold">
                  {User?.username}
                </span>
                <span className="text-xl pb-1">👋</span>
              </>
            ) : (
              <>
                Keep up the good work!,
                <span className="text-thirdyNormal ml-2 font-semibold">
                  {User?.username}
                </span>
                <span className="text-xl pb-1">🔥</span>
              </>
            )}
          </span>
          <Link
            to="/"
            className="flex px-8 py-2 rounded-2xl hover:bg-primaryThin group transition-all duration-300"
          >
            <i className="fa-solid fa-arrow-up mr-2 mt-[0.2rem] scale-[0.9] -rotate-[45deg] opacity-[0.5] group-hover:opacity-100 transition-all duration-300"></i>
            Landing
          </Link>
        </div>
      </div>
    </>
  );
}

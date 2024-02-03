/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function LinkSide({ path, name, children }) {
  return (
    <>
      <Link
        to={path}
        className={`${
          location.pathname === path && "bg-primaryThin drop-shadow-md"
        } flex items-center justify-between text-thirdyThin drop-shadow-sm group mx-2 px-4 rounded-2xl py-5 lg:py-3 hover:bg-primaryThin transition-all duration-300 `}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="opacity-[0.3] group-hover:opacity-100 transition-all duration-200">{children}</span>
          <h1 className="  lg:flex hidden">{name}</h1>
        </div>
        <div className="xl:flex hidden">
          <i className="fa-solid fa-arrow-up rotate-[45deg] opacity-[0.3] group-hover:opacity-100 transition-all duration-200"></i>
        </div>
      </Link>
    </>
  );
}

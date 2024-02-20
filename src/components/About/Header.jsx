import { Link } from "react-router-dom";
import Button from "../Button";

export default function Header() {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full h-[90vh] overflow-hidden justify-center bg-gray-900 shadow-xl mt-20">
        {/* LEFT */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <img
            src="Header.jpg"
            className="absolute opacity-[60%] object-cover h-[110vh] top-0 z-[1] blur-[5px]"
            alt="Header"
          />
          <div className="text-center mb-18 z-[2] drop-shadow-md">
            <h1 className="text-[2.5rem] lg:text-8xl font-semibold tracking-tight mb-2 text-thirdyThin ">
              Pilihan Terbaik
            </h1>
            <h1 className="text-[2.5rem] lg:text-8xl font-semibold tracking-tight mb-5 text-thirdyThin ">
              Untuk Fashion Anda
            </h1>
            <h1 className="text-xl lg:text-3xl font-semibold tracking-tight text-thirdyThin ">
              Jangan lewatkan promo-promo menarik!
            </h1>
            <div className="flex gap-5 mt-6 items-center w-full justify-center">
              <Link to={"/login"}>
                <Button variant="">Log In as a Kasir</Button>
              </Link>
              <Link to={"/fashions"}>
                <Button variant="red">Buy Products</Button>
              </Link>
              {/* <Button variant="secondary">Fashions</Button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

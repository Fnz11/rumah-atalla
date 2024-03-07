/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
export default function Button({
  children,
  variant,
  className,
  onClick,
  disabledParam,
}) {
  // console.log(onClick)
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabledParam}
        type="button"
        className={` ${className} ${
          disabledParam && "opacity-[0.7] pointer-events-none"
        } border-2 shadow-lg hover:shadow-xl ${
          variant === "secondary" || !variant
            ? "border-secondary  bg-secondary text-thirdyThin"
            : variant === "red"
            ? "border-red-400   bg-red-400 text-thirdyThin"
            : variant === "thirdy"
            ? "border-thirdyNormal  bg-thirdyNormal  text-secondary"
            : variant === "green"
            ? "border-green-500   bg-green-500  text-thirdyThin"
            : "border-yellow-500  bg-yellow-500  text-thirdyThin"
        }  hover:scale-[1.02] hover:opacity-[0.9] hover:drop-shadow-lg transition-all duration-300  font-bold py-[0.75rem] px-5 rounded-lg sm:min-w-[9rem] flex justify-center items-center`}
      >
        {children}
      </button>
    </>
  );
}

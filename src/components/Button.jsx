/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
export default function Button({ children, variant, className, onClick, disabledParam }) {
  // console.log(onClick)
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabledParam}
        type="button"
        className={` ${className} border-2 shadow-lg hover:shadow-xl ${
          variant === "secondary" || !variant
            ? "border-secondary hover:bg-transparent hover:text-secondary bg-secondary text-thirdyNormal"
            : variant === "red"
            ? "border-red-400  hover:text-red-400 hover:bg-transparent bg-red-400 text-thirdyNormal"
            : variant === "thirdy" ?
              "border-thirdyNormal  hover:bg-transparent bg-thirdyNormal hover:text-thirdyNormal text-secondary" :
              variant === "green" && "border-green-500  hover:text-green-500 hover:bg-transparent bg-green-500 text-thirdyNormal"
        }  hover:scale-[1.05] hover:drop-shadow-lg transition-all duration-300  font-bold py-3 px-4 rounded-2xl min-w-[9rem] `}
      >
        {children}
      </button>
    </>
  );
}

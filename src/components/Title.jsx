/* eslint-disable react/prop-types */
export default function Title({ title, className }) {
  return (
    <>
      <div className={`flex items-center gap-5 w-full my-10 ${className}`}>
        <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
        <h1 className=" text-[2.5rem] text-center font-semibold text-primaryNormal drop-shadow-md w-[30rem]">
          {title}
        </h1>
        <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
      </div>
    </>
  );
}

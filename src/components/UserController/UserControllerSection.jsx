/* eslint-disable react/prop-types */
export default function UserControllerSection({ item, handlePopover, number }) {
  return (
    <>
      <div
        onClick={() => handlePopover({ param: "edit", item: item })}
        className="rounded-2xl cursor-pointer group hover:shadow-xl shadow-md hover:inset-0 transition-all duration-300 w-full relative  bg-white text-gray-600 leading-5 sm:leading-normal text-sm border-b-2 inset-[0.2rem]"
      >
        <div className="flex items-center z-[10] relative w-full">
          <h1 className="text-center w-[10%] py-6 ">{number}</h1>
          <h1 className="flex items-center justify-start w-[50%] py-6 gap-4">
            <img
              src={item?.imageUrl ? item?.imageUrl : "/Profile.png"}
              className="w-20 aspect-square object-cover rounded-full drop-shadow-md"
              alt=""
            />
            <div>
              <span className="text-gray-600 font-semibold">{item.username}</span>
              <br />
              <span className="text-gray-400">{item.number}</span>
              <br />
              <span className="text-gray-400">{item.createdAt}</span>
            </div>
          </h1>
          {/* <h1 className="text-center py-6 w-[20%] sm:block hidden">
            <span className="text-gray-600">{item.lamaOnline}</span>
          </h1> */}
          <h1 className="text-center  py-6 w-[40%] justify-center flex">
            <span className="text-gray-600 font-semibold leading-6">
              <div className="text-yellow-400 drop-shadow-sm flex items-center gap-2">
                <i className="fa-solid fa-clock mb-1 fa-lg "></i>
                Pending: {item?.transactions?.pending}
              </div>
              <div className="text-green-400 drop-shadow-sm flex items-center gap-2">
                <i className="fa-solid fa-circle-check mb-1 fa-lg"></i>
                Successed: {item?.transactions?.successed}
              </div>
              <div className="text-red-400 drop-shadow-sm flex items-center gap-2">
                <i className="fa-solid fa-circle-exclamation mb-1 fa-lg"></i>
                Canceled: {item?.transactions?.canceled}
              </div>
            </span>
          </h1>
          {/* <h1 className=" flex items-center justify-center  w-[15%]  py-6">
            {item.status === true ? (
              <>
                <h1 className="bg-green-500 text-green-700 drop-shadow-sm rounded-[50%] h-5 w-5 text-center "></h1>
              </>
            ) : item.status === false ? (
              <>
                <h1 className="bg-red-500 text-red-700 drop-shadow-sm rounded-[50%] h-5 w-5 text-center "></h1>
              </>
            ) : (
              ""
            )}
          </h1> */}
        </div>
      </div>
    </>
  );
}

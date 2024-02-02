/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export default function FoodTransactionSection(props) {
  return (
    <>
      <div
              
        onClick={() => props?.handlePopover({ item: props?.data })}
        className={`
        ${
          props.data.status === "canceled"
            ? "bg-red-300 hover:bg-red-400"
            : props.data.status === "pending"
            ? "bg-yellow-300 hover:bg-yellow-400"
            : "bg-green-300 hover:bg-green-400"
        }
        rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl hover:inset-0 transition-all duration-300 w-full relative text-gray-600 text-[0.7rem] leading-5 sm:leading-normal sm:text-base shadow-lg border-b-2 inset-[0.2rem]`}
      >
        <div className="flex items-center z-[10] relative">
          <h1 className="text-center  w-[30%] lg:w-[15%] py-6 drop-shadow-sm font-semibold">
            {props?.data?.kasir}
          </h1>
          <h1 className="text-center  w-[75%] lg:w-[50%] py-6 break-all">
            <span className="font-semibold drop-shadow-sm">
              {props?.data?.buyer}{" "}
            </span>

            <span className="">- 10/2/23</span>
            <br />
            {props?.data?._id?.toString()}
          </h1>
          {/* <h1 className="text-center  py-6 w-[10%] lg:block hidden font-semibold">
            {props?.data?.qty}
          </h1> */}
          <h1 className="text-center py-6 w-[25%] lg:block hidden font-semibold drop-shadow-sm">
            Rp. {props.data.totalWithDiscount ? props?.data?.totalWithDiscount?.toLocaleString() : (props?.data?.totalAmount)?.toLocaleString()}
          </h1>
          <div className=" text-center font-semibold flex items-center justify-center relative  w-[15%]  py-6">
            {props?.data?.status === "successed" ? (
              <>
                <h1 className=" drop-shadow-sm rounded-[50%] w-[5rem] text-center ">
                  Success
                </h1>
              </>
            ) : props?.data?.status === "pending" ? (
              <>
                <h1 className=" drop-shadow-sm rounded-[50%] w-[5rem] text-center ">
                  Pending
                </h1>
              </>
            ) : (
              <>
                <h1 className=" drop-shadow-sm rounded-[50%] w-[5rem] text-center ">
                  Canceled
                </h1>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

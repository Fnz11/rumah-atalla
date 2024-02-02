/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function FashionTransactionSection(props) {
  function addDotsToNumber(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
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
        rounded-2xl cursor-pointer group hover:shadow-xl hover:inset-0 transition-all duration-300 w-full relative  bg-whit text-gray-600 text-[0.7rem] leading-5 sm:leading-normal sm:text-base shadow-lg border-b-2 inset-[0.2rem]`}
      >
        <div className="flex items-center z-[10] relative">
          <h1 className="text-center w-[35%] lg:w-[25%] py-6 drop-shadow-sm font-semibold">
            {props?.data?.kasir}
          </h1>
          <h1 className="flex items-center justify-center  w-[10%] lg:w-[5%] py-6">
            {" "}
            {props?.data?.store === "web" ? (
              <i className="fa-solid fa-store text-primaryDark"></i>
            ) : props?.data?.store === "tokopedia" ? (
              <>
                <div className="flex relative">
                  <img className="h-7" src="/Tokopedia.png" alt="" />
                </div>
              </>
            ) : (
              <>
                <div className="flex relative">
                  <img className="h-7" src="/Shopee.png" alt="" />
                </div>
              </>
            )}
          </h1>
          <h1 className="text-center  w-[50%] lg:w-[30%] py-6 break-all">
            <span className="font-semibold drop-shadow-sm">
              {props?.data?.buyer}{" "}
            </span>
            <span className="">- 10/2/23</span>
            <br />
            {props?.data?._id?.toString()}
          </h1>
          <h1 className="text-center py-6 w-[25%] lg:block hidden font-semibold drop-shadow-sm">
            Rp. {addDotsToNumber(props?.data?.totalAmount)}
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

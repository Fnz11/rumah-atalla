/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import TransactionPopoverSection from "./TransactionPopoverSection";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../../components/CustomToast";

/* eslint-disable react/prop-types */
export default function TransactionPopover(props) {
  // LOADING
  const [isLoading, setIsLoading] = useState(false);
  // HANDLE PATCH
  const token = localStorage.getItem("token");
  const patchTransaction = async (status) => {
    setIsLoading(true);

    axios
      .patch(
        "http://localhost:3000/api/transactions/" + props.data?._id?.toString(),
        { status: status },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        props.refetch();
        toast.custom((t) => (
          <CustomToast
            t={t}
            message="Edit transaction successed"
            type="success"
          />
        ));
        props.togglePopover("", null);
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Edit transaction failed" type="failed" />
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function formatISODate(isoDateString) {
    const date = new Date(isoDateString);

    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${Math.floor(
      date.getSeconds()
    )}`;

    return formattedDate;
  }

  function addDotsToNumber(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <>
      <Toaster />
      <AnimatePresence>
        {props.showPopover && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => props.togglePopover("", null)}
              className={` ${
                isLoading && "pointer-events-none"
              } w-screen h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm absolute`}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`${
                isLoading && "pointer-events-none"
              } relative overflow-hidden bg-thirdyThin  w-[90%] px-7 sm:px-10 sm:w-[45rem] mx-10 h-[40rem] sm:h-[46rem] max-h-[95%] sm:max-h-[95%] p-5 z-[1] rounded-2xl shadow-md`}
            >
              {/* LOADING */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute w-full h-full top-0 z-[100] left-0 flex items-center justify-center"
                >
                  <div className="w-full h-full bg-[rgba(255,255,255,0.4)] absolute top-0 left-0 scale-[1.2]"></div>
                  <div className="relative flex w-full h-full items-center justify-center">
                    <motion.img
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      src="/loading.png"
                      className="h-14 opacity-[0.7] animate-spin"
                      alt=""
                    />
                  </div>
                </motion.div>
              )}

              {/* LOGO */}
              <div className="flex w-full -ml-2 justify-center drop-shadow items-center ">
                <img
                  src="/LogoGreen.png"
                  className="scale-[1.8] sm:scale-[2.3] pointer-events-none w-[8rem] h-[8rem] aspect-square"
                  alt="Logo"
                />
                <div className="uppercase text-[2.3rem] leading-[2.5rem] ml-0 sm:ml-5 sm:text-[2.8rem] sm:leading-[3rem] mb-[0.5rem] text-primaryNormal">
                  <h1 className="-mb-[0.4rem]">Rumah</h1>
                  <h1 className="font-bold">Atalla</h1>
                  <div className="w-[120%] h-[0.3rem] -my-[0.15rem] rounded-md bg-primaryNormal" />
                </div>
              </div>

              {/* HEADER */}
              <div className="flex items-center -mt-2 sm:mt-0 gap-5 w-full mb-2">
                <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
                <h1 className="w-auto leading-9 sm:w-[80rem] text-[1.6rem] sm:text-[2rem] text-center font-semibold text-primaryNormal drop-shadow-md">
                  Transaction Detail
                </h1>
                <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
              </div>

              {/* CONTENT */}
              <div className="flex gap-10 w-full text-[0.7rem] sm:text-base mb-1">
                <div className="flex w-[50%]">
                  <div className="">
                    <div className="flex ">
                      <h1 className="mr-2 font-semibold">Kasir: </h1>
                      <h1 className="font-semibold">{props?.data?.kasir}</h1>
                    </div>
                    <div className="flex ">
                      <h1 className="mr-2 font-semibold">Pembeli: </h1>
                      <h1 className="font-semibold">{props?.data?.buyer}</h1>
                    </div>
                    <div className="flex ">
                      <h1 className="mr-2 font-semibold">ID: </h1>
                      <h1 className="break-all">
                        {props?.data?._id.toString()}
                      </h1>
                    </div>
                    <div className="flex ">
                      <h1 className="mr-2 font-semibold">Date: </h1>
                      <h1 className="text-gray-500">
                        {formatISODate(props?.data?.createdAt)}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="flex w-[50%] ">
                  <div className="">
                    <div className="flex ">
                      <h1 className="mr-2 font-semibold">Store: </h1>
                      <h1 className="capitalize">{props?.data?.store}</h1>
                    </div>
                    <div className="flex ">
                      <h1 className="mr-2 font-semibold">Total: </h1>
                      <h1 className="font-semibold drop-shadow-sm">
                        Rp. {addDotsToNumber(props?.data?.totalWithDiscount)}
                      </h1>
                    </div>
                    <div className="flex flex-col text-[0.7rem] ml-2  sm:text-sm">
                      <div className="flex ">
                        <h1 className="mr-2 ">Price: </h1>
                        <h1 className=" drop-shadow-sm">
                          Rp. {addDotsToNumber(props?.data?.totalAmount)}
                        </h1>
                      </div>
                      {props?.data?.totalWithDiscount !=
                        props.data.totalAmount && (
                        <div className="flex ">
                          <h1 className="mr-2 ">Discount: </h1>
                          <h1 className=" text-secondary drop-shadow-sm">
                            Rp.
                            {addDotsToNumber(
                              props?.data?.totalAmount -
                                props?.data?.totalWithDiscount
                            )}
                          </h1>
                        </div>
                      )}
                      {props?.data?.totalCashback > 0 && (
                        <div className="flex ">
                          <h1 className="mr-2 ">Cashback: </h1>
                          <h1 className=" text-primaryThin drop-shadow-sm">
                            +Rp.{addDotsToNumber(props?.data?.totalCashback)}
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="w-full h-[15rem] sm:h-[20rem] overflow-y-scroll overflow-x-hidden">
                {props.products.length > 0 && (
                  <>
                    <div className="flex w-full text-[0.7rem] sm:text-base bg-secondary h-[3rem] font-semibold shadow-md inset-[0.2rem] relative text-white items-center rounded-2xl px-2">
                      <div className="w-[50%]">Nama Barang </div>
                      <div className="w-[20%]">Harga</div>
                      <div className="w-[20%]">Jumlah</div>
                      <div className="w-[10%]">QTY</div>
                    </div>

                    {props.data.products.map((item) => (
                      <div key={item?.id}>
                        <TransactionPopoverSection
                          promos={props.promos}
                          item={item}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* BUTTON */}
              <div className="w-full mt-3 flex gap-3 items-end justify-center">
                <button
                  onClick={
                    props?.data?.status !== "canceled"
                      ? () => patchTransaction("canceled")
                      : () => props.togglePopover("", null)
                  }
                  className={` 
                ${
                  props?.data?.status === "canceled"
                    ? "text-thirdyNormal drop-shadow-lg bg-red-500"
                    : "  text-red-500 hover:bg-red-500 hover:text-thirdyNormal  "
                }
                border-2 border-red-500 transition-all duration-300  font-bold py-2 sm:py-3 text-[0.7rem] sm:text-base px-2 sm:px-4 rounded-2xl w-28 sm:w-32 hover:drop-shadow-lg justify-center flex items-center hover:scale-[1.05]`}
                >
                  Canceled
                </button>
                <button
                  onClick={
                    props?.data?.status !== "pending"
                      ? () => patchTransaction("pending")
                      : () => props.togglePopover("", null)
                  }
                  className={` 
                ${
                  props?.data?.status === "pending"
                    ? "text-thirdyNormal drop-shadow-lg bg-yellow-500"
                    : "  text-yellow-500 hover:bg-yellow-500 hover:text-thirdyNormal  "
                }
                border-2 border-yellow-500 transition-all duration-300  font-bold py-2 sm:py-3 text-[0.7rem] sm:text-base px-2 sm:px-4 rounded-2xl w-28 sm:w-32 hover:drop-shadow-lg justify-center flex items-center hover:scale-[1.05]`}
                >
                  Pending
                </button>
                <button
                  onClick={
                    props?.data?.status !== "successed"
                      ? () => patchTransaction("successed")
                      : () => props.togglePopover("", null)
                  }
                  className={` 
                ${
                  props?.data?.status === "successed"
                    ? "text-thirdyNormal drop-shadow-lg bg-green-500"
                    : "  text-green-500 hover:bg-green-500 hover:text-thirdyNormal  "
                }
                border-2 border-green-500 transition-all duration-300  font-bold py-2 sm:py-3 text-[0.7rem] sm:text-base px-2 sm:px-4 rounded-2xl w-28 sm:w-32 hover:drop-shadow-lg justify-center flex items-center hover:scale-[1.05]`}
                >
                  Successed
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

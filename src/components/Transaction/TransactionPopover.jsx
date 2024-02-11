/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import TransactionPopoverSection from "./TransactionPopoverSection";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import BlackScreenPopover from "../BlackScreenPopover";
import LoadingPopover from "../LoadingPopover";
import LogoPopover from "../LogoPopover";
import PopoverDetail from "./PopoverDetail";
import Button from "../Button";
import Title from "../Title";
import TransactionHeadPopoverSection from "./TransactionHeadPopoverSection";

/* eslint-disable react/prop-types */
export default function TransactionPopover(props) {
  const DBURL = import.meta.env.VITE_APP_DB_URL;
  console.log("DBDBDBDBDB", DBURL);
  // LOADING
  const [isLoading, setIsLoading] = useState(false);
  // HANDLE PATCH
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  const patchTransaction = async (status) => {
    setIsLoading(true);
    const newData = {
      status: status,
      kasirId: user?.userId,
      kasir: user?.username,
    };
    axios
      .patch(DBURL + "/transactions/" + props.data?._id?.toString(), newData, {
        headers: {
          Authorization: token,
        },
      })
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

  return (
    <>
      <Toaster />
      <AnimatePresence>
        {props.showPopover && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <BlackScreenPopover
              onClick={() => props.togglePopover("", null)}
              isLoading={isLoading}
            />
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`${
                isLoading && "pointer-events-none"
              } relative overflow-hidden bg-section  w-[90%] px-5 sm:px-10 sm:w-[45rem] mx-2 sm:mx-10 h-[40rem] pt-0 sm:h-[46rem] max-h-[95%] sm:max-h-[95%] p-5 z-[1] rounded-2xl shadow-md`}
            >
              {/* LOADING */}
              {isLoading && <LoadingPopover />}

              {/* LOGO */}
              <LogoPopover />

              {/* HEADER */}
              <Title className={"my-3"} title={"Transaction Detail"} />

              {/* CONTENT */}
              <div className="flex gap-10 w-full text-[0.7rem] sm:text-base mb-1">
                <div className="flex flex-col w-[50%]">
                  <PopoverDetail
                    bold
                    left={"Kasir: "}
                    right={props?.data?.kasir}
                  />
                  <PopoverDetail
                    bold
                    left={"Buyer: "}
                    right={props?.data?.buyer}
                  />
                  <PopoverDetail
                    left={"ID: "}
                    right={props?.data?._id?.toString()}
                  />
                  <PopoverDetail
                    left={"Date: "}
                    right={formatISODate(props?.data?.createdAt)}
                  />
                </div>
                <div className="flex flex-col w-[50%] ">
                  <PopoverDetail
                    left={"Store: "}
                    right={props?.data?.store}
                    bold
                  />
                  <PopoverDetail
                    left={"Total: "}
                    right={
                      "Rp." + props?.data?.totalWithDiscount?.toLocaleString()
                    }
                    bold
                  />
                  <div className="flex flex-col text-[0.7rem] ml-2  sm:text-sm">
                    <PopoverDetail
                      left={"Price: "}
                      right={"Rp." + props?.data?.totalAmount?.toLocaleString()}
                    />

                    {props?.data?.totalWithDiscount !=
                      props.data.totalAmount && (
                      <PopoverDetail
                        left={"Discount: "}
                        className={"text-secondary"}
                        right={
                          "Rp." +
                          (
                            props?.data?.totalAmount -
                            props?.data?.totalWithDiscount
                          ).toLocaleString()
                        }
                      />
                    )}
                    {props?.data?.totalCashback > 0 && (
                      <PopoverDetail
                        left={"Cashback: "}
                        className={"text-primaryNormal"}
                        right={
                          "+Rp." + props?.data?.totalCashback?.toLocaleString()
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="w-full h-[15rem] sm:h-[20rem] overflow-y-scroll overflow-x-hidden">
                {props.products.length > 0 && (
                  <>
                    <TransactionHeadPopoverSection />

                    {props.data.products.map((item) => (
                      <>
                        <TransactionPopoverSection
                          promos={props.promos}
                          item={item}
                        />
                      </>
                    ))}
                  </>
                )}
              </div>

              {/* BUTTON */}
              <div className="w-full mt-3 flex gap-3 items-end justify-center">
                <Button
                  className={"min-w-[4rem]"}
                  onClick={
                    props?.data?.status !== "canceled"
                      ? () => patchTransaction("canceled")
                      : () => props.togglePopover("", null)
                  }
                  variant={"red"}
                >
                  <i className="fa-solid fa-circle-exclamation mb-1 fa-lg sm:mr-2"></i>
                  <span className="max-sm:hidden">Cancel</span>
                </Button>
                <Button
                  className={"min-w-[4rem]"}
                  onClick={
                    props?.data?.status !== "pending"
                      ? () => patchTransaction("pending")
                      : () => props.togglePopover("", null)
                  }
                  variant={"yellow"}
                >
                  <i className="fa-solid fa-clock mb-1 fa-lg  sm:mr-2"></i>

                  <span className="max-sm:hidden">Pending</span>
                </Button>
                <Button
                  className={"min-w-[4rem]"}
                  onClick={
                    props?.data?.status !== "successed"
                      ? () => patchTransaction("successed")
                      : () => props.togglePopover("", null)
                  }
                  variant={"green"}
                >
                  <i className="fa-solid fa-circle-check mb-1 fa-lg sm:mr-2"></i>
                  <span className="max-sm:hidden">Success</span>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

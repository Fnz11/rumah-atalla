/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import Title from "../Title";
import { SwiperSlide, Swiper } from "swiper/react";
import Button from "../Button";

export default function ShowMore(props) {
  if (props.showPopover) {
    console.log("IN IPROSP", props);
  }
  return (
    <>
      <AnimatePresence>
        {props.showPopover && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                props?.togglePopover();
              }}
              className={` w-screen h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm absolute`}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={` relative overflow-hidden bg-thirdyThin w-[24rem] px-4 sm:px-10 h-[49rem] sm:h-[48rem] transition-all duration-300 max-h-[95vh] sm:w-[40rem] mx-2 sm:mx-10  p-5 z-[1] rounded-2xl shadow-md`}
            >
              {/* LOGO */}
              <div className="flex w-full h-fit -ml-2 justify-center drop-shadow items-center ">
                <img
                  src="/LogoGreen.png"
                  className="scale-[2.3] pointer-events-none w-[8rem] h-[8rem] aspect-square"
                  alt="Logo"
                />
                <div className="uppercase ml-1 text-[2.8rem] leading-[3rem] mb-[0.5rem] text-primaryNormal hidden sm:block">
                  <h1 className="-mb-[0.4rem]">Rumah</h1>
                  <h1 className="font-bold">Atalla</h1>
                  <div className="w-[120%] h-[0.3rem] -my-[0.15rem] rounded-md bg-primaryNormal" />
                </div>
              </div>

              <Title title="Detail" className={"my-2"} />

              {/* FORM */}
              <div className="flex flex-col  gap-4 h-[62%] sm:h-[70%] pb-4 w-full justify-between">
                <div className="h-full sm:h-[90%] ">
                  <div className="w-full h-full flex flex-col gap-3 text-sm max-sm:overflow-y-scroll max-sm:overflow-x-hidden">
                    <div className="h-[100%] max-sm:mt-[2.6rem] sm:h-[40%]  w-full flex max-sm:flex-col-reverse justify-between items-center text-gray-600 font-[600]">
                      <div className="w-full flex flex-col items-center sm:justify-between sm:h-full sm:py-3">
                        <div className="w-full flex py-1">
                          <span className="w-[35%] sm:w-[25%] flex">Name</span>
                          <span className="sm:w-[75%] flex truncate">
                            : {props?.data?.name}
                          </span>
                        </div>

                        <div className="w-full flex py-1">
                          <span className="w-[35%] sm:w-[25%] flex">
                            Category
                          </span>
                          <span className="sm:w-[75%] flex font-medium truncate">
                            : {props?.data?.category}
                          </span>
                        </div>
                        <div className="w-full flex py-1">
                          <span className="w-[35%] sm:w-[25%] flex">Brand</span>
                          <span className="sm:w-[75%] flex truncate">
                            : {props?.data?.brand}
                          </span>
                        </div>
                        <div className="w-full flex py-1 overflow-hidden">
                          <span className="w-[35%] sm:w-[25%] flex">
                            Description
                          </span>
                          <span className="flex">
                            <span className="max-w-[15rem] flex truncate text-ellipsis overflow-hidden font-medium">
                              : {props?.data?.description}
                            </span>
                          </span>
                          <button
                            className="ml-1 hover:opacity-[0.6]"
                            // onClick={() => props?.setReadMore(!readMore)}
                          >
                            ...
                          </button>
                        </div>
                      </div>
                      <div className="max-sm:w-full max-sm:pb-3 sm:h-[105%] aspect-square ">
                        <Swiper
                          slidesPerView={1}
                          spaceBetween={2}
                          navigation
                          className="w-full bg-white aspect-square flex  justify-center items-center  rounded-2xl shadow-lg"
                        >
                          {props?.data?.imageUrl?.length > 0 ? (
                            props?.data?.imageUrl?.map((image, index) => (
                              <SwiperSlide key={index} className="">
                                <div className="h-full w-full relative">
                                  <img
                                    src={image.url}
                                    alt={image.url}
                                    className="h-full aspect-square object-cover absolute"
                                  />
                                </div>
                              </SwiperSlide>
                            ))
                          ) : (
                            <SwiperSlide className="">
                              <div className="font-semibold text-gray-600 flex items-center justify-center w-full h-full bg-gray-300 pb-1">
                                No Image
                              </div>
                            </SwiperSlide>
                          )}
                        </Swiper>
                      </div>
                    </div>
                    <div className="w-full   sm:h-[60%] flex flex-col">
                      <div className="w-full max-sm:flex-col max-sm:justify-center max-sm:text-center bg-secondary px-5 py-3 rounded-2xl shadow-2xl flex text-white font-semibold">
                        <h1 className="w-full sm:w-[30%] flex justify-center">
                          Variant
                        </h1>
                        {/* <h1 className="w-[40%]">Description</h1> */}
                        <h1 className="w-full sm:w-[70%] flex justify-center">
                          Size
                        </h1>
                      </div>
                      <div className="w-[101.7%] h-auto mt-2 overflow-y-scroll overflow-x-hidden flex flex-col">
                        {props?.data?.variants?.map((item, indexVariant) => (
                          <div key={indexVariant}>
                            {item?.size?.map((size, indexSize) => {
                              const idOnCart =
                                item?._id?.toString() +
                                "?variant=" +
                                indexVariant +
                                ",size=" +
                                indexSize;

                              const isAdded = props?.FashionCartItems?.some(
                                (product) => {
                                  if (product?.idOnCart === idOnCart) {
                                    return true;
                                  }
                                }
                              );
                              const { discountPrice, cashBackTotal } = item
                                ?.size[indexSize] ?? {
                                discountPrice: 0,
                                cashBackTotal: 0,
                              };
                              const newSize = {
                                ...size,
                                indexSize,
                              };
                              const newVariant = {
                                ...item,
                                indexVariant,
                              };
                              return (
                                <button
                                  key={size.name}
                                  onClick={() =>
                                    props?.addToCart({
                                      _id: item?._id?.toString(),
                                      idOnCart: idOnCart,
                                      name: props?.data?.name,
                                      variants: props?.data?.variants,
                                      variant: newVariant,
                                      size: newSize,
                                      sizes: item?.size,
                                      qty: 1,
                                      discountNominal:
                                        props?.data?.discountNominal,
                                      discountPersentase:
                                        props?.data?.discountPersentase,
                                      cashbackNominal:
                                        props?.data?.cashbackNominal,
                                      cashbackPersentase:
                                        props?.data?.cashbackPersentase,
                                      productPromos: props?.data?.productPromos,
                                      price: size?.price,
                                    })
                                  }
                                  className={` 
                                ${
                                  isAdded &&
                                  "border-4 border-primaryThin scale-[0.95]"
                                }
                                transition-all duration-200 hover:shadow-xl min-h-[6rem] hover:inset-0 inset-[0.2rem] relative w-full bg-white mb-4 px-5 sm:py-6 py-3  rounded-2xl shadow-lg  flex text-gray-600 font-semibold items-center justify-center text-[0.8rem] max-sm:flex-col`}
                                >
                                  <h1 className="max-sm:hidden w-full justify-center sm:w-[30%] flex h-full items-center text-center truncate">
                                    {item?.name}
                                  </h1>
                                  <h1
                                    className={`w-full max-sm:justify-center sm:w-[70%] h-full flex items-center justify-center font-medium flex-col gap-2 `}
                                  >
                                    <div
                                      key={size?.size}
                                      className="flex gap-1 font-semibold items-center"
                                    >
                                      <div className="sm:hidden">{item?.name}  -</div>
                                      <div>{size?.size}</div> -
                                      <div>{size?.stock} pcs</div> -
                                      <div className="text-secondary font-semibold flex flex-col items-start leading-4 justify-center">
                                        {discountPrice !== size?.price && (
                                          <h1>
                                            Rp.{" "}
                                            {discountPrice?.toLocaleString()}
                                          </h1>
                                        )}
                                        <h1
                                          className={`${
                                            discountPrice !== size?.price &&
                                            "line-through opacity-70"
                                          }`}
                                        >
                                          Rp. {size?.price?.toLocaleString()}
                                        </h1>
                                        {cashBackTotal !== 0 && (
                                          <h1 className="text-primaryThin">
                                            +Rp.{" "}
                                            {cashBackTotal?.toLocaleString()}
                                          </h1>
                                        )}
                                      </div>
                                    </div>
                                  </h1>
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* BUTTON */}
                <div className="flex  gap-3 w-full items-center justify-center ">
                  <div className={`flex gap-3`}>
                    <Button
                      variant={"secondary"}
                      onClick={() => props?.togglePopover()}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

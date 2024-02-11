/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import Title from "../Title";
import { SwiperSlide, Swiper } from "swiper/react";
import Button from "../Button";
import { useState } from "react";
import ReadMoreDescription from "../ReadMoreDescription";
import BlackScreenPopover from "../BlackScreenPopover";
import LogoPopover from "../LogoPopover";

export default function ShowMore(props) {
  if (props.showPopover) {
    console.log("IN IPROSP", props);
  }
  // READMORE
  const [readMore, setReadMore] = useState(false);
  console.log(readMore);

  // HOVER PROMO
  const [hoverPromo, setHoverPromo] = useState("");
  const handleHoverPromo = (promo) => {
    console.log("PMPM", promo);
    setHoverPromo(promo);
  };
  return (
    <>
      <ReadMoreDescription
        description={props?.data?.description}
        handleClose={() => setReadMore(false)}
        readMore={readMore}
      />
      <AnimatePresence>
        {props.showPopover && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <BlackScreenPopover
              onClick={() => {
                props?.togglePopover();
              }}
              isLoading={false}
            />
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={` relative overflow-hidden bg-section w-[24rem] px-4 pt-0 sm:px-10 h-[49rem] sm:h-[48rem] transition-all duration-300 max-h-[95vh] sm:w-[40rem] mx-2 sm:mx-10  p-5 z-[1] rounded-2xl shadow-md`}
            >
              {/* LOGO */}
              <LogoPopover />

              <Title title="Detail" className={"my-2"} />

              {/* DATA */}
              <div className="flex flex-col  gap-4 h-[62%] sm:h-[70%] pb-4 w-full justify-between">
                <div className="h-full sm:h-[90%] ">
                  <div className="w-full h-full flex flex-col gap-3 text-sm overflow-y-scroll overflow-x-hidden">
                    <div className="h-[100%] max-sm:mt-[2.6rem] sm:h-[40%]  w-full flex max-sm:flex-col-reverse justify-between items-center text-primaryDark font-[600]">
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
                            onClick={() => setReadMore(!readMore)}
                          >
                            ...
                          </button>
                        </div>
                        <div className={`w-full flex py-1 `}>
                          <span className="w-[35%] sm:w-[25%] flex">Promo</span>
                          <span className="sm:w-[75%] gap-1 flex">
                            :{" "}
                            <span>
                              {props?.data?.productPromos?.length > 0
                                ? props?.data?.productPromos?.map(
                                    (promo, index) => (
                                      <>
                                        <div
                                          onMouseDown={() =>
                                            handleHoverPromo(promo._id)
                                          }
                                          onMouseEnter={() =>
                                            handleHoverPromo(promo._id)
                                          }
                                          onMouseLeave={() =>
                                            handleHoverPromo("")
                                          }
                                          key={index}
                                          className="relative w-full h-full group"
                                        >
                                          <img
                                            src={promo?.imageUrl?.url}
                                            className="h-6 sm:h-7 mr-1 group-hover:scale-[1.05] border-2 group-hover:border-primaryThin aspect-square object-cover object-center drop-shadow-xl rounded-md"
                                            alt=""
                                          />
                                          {hoverPromo === promo._id && (
                                            <motion.div
                                              initial={{ opacity: 0, y: -4 }}
                                              animate={{ opacity: 1, y: 1 }}
                                              transition={{ duration: 0.2 }}
                                              className=" text-center text-[0.7rem] sm:text-[0.8rem] p-3 z-[100] shadow-md bg-gradient-to-r from-primaryDark to-primaryThin text-white border-2 border-primaryNormal h-20 w-36 absolute -top-[5.3rem] -left-14 flex flex-col items-center justify-center rounded-2xl"
                                            >
                                              <h1 className="">{promo.name}</h1>
                                              <h1>
                                                {(promo.type ===
                                                  "diskon nominal" ||
                                                  promo.type ===
                                                    "cashback nominal") &&
                                                  "Rp. "}
                                                {promo.value}
                                                {(promo.type ===
                                                  "diskon persentase" ||
                                                  promo.type ===
                                                    "cashback persentase") &&
                                                  "%"}
                                              </h1>
                                            </motion.div>
                                          )}
                                        </div>
                                      </>
                                    )
                                  )
                                : "-"}
                            </span>
                          </span>
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
                              <div className="font-semibold text-primaryDark flex items-center justify-center w-full h-full bg-gray-300 pb-1">
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
                      <div className="w-[101.7%] h-auto mt-2 flex flex-col pr-3">
                        {props?.data?.variants?.map((item, indexVariant) => (
                          <div key={indexVariant}>
                            {item?.size?.map((size, indexSize) => {
                              console.log(size);
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
                                  onClick={() => {
                                    if (size?.stock === 0) return;
                                    props?.addToCart({
                                      _id: props?.data?._id?.toString(),
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
                                    });
                                  }}
                                  className={` 
                                ${
                                  isAdded &&
                                  "border-4 border-primaryThin scale-[0.95]"
                                } ${size?.stock === 0 && "cursor-not-allowed"}
                                transition-all overflow-hidden duration-200 hover:shadow-xl min-h-[6rem] hover:inset-0 inset-[0.2rem] relative w-full bg-white mb-4 px-5 sm:py-6 py-3 rounded-2xl shadow-lg  flex text-primaryDark font-semibold items-center justify-center text-[0.8rem] max-sm:flex-col`}
                                >
                                  <div
                                    className={`w-full bg-section-dark text-white opacity-[0.9] text-sm sm:text-lg font-semibold h-full absolute left-0 top-0 z-[10] flex items-center justify-center ${
                                      size?.stock > 0 && "hidden"
                                    }`}
                                  >
                                    out of stock
                                  </div>
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
                                      <div className="sm:hidden">
                                        {item?.name} -
                                      </div>
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

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TransactionPopoverSection({ item: props, promos }) {
  const [promoProduct, setPromoProduct] = useState([]);
  useEffect(() => {
    console.log("OJEFKOWEOPRO", promos, props);
    let newPromo = [];
    promos.map((promo) => {
      console.log(promo.name);
      if (promo.products.includes(props.productId.toString())) {
        newPromo.push(promo);
      }
    });
    setPromoProduct(newPromo);
  }, [promos]);

  // useEffect(() => {
  //   console.log("OJEFKOWEOPRO", promos, props);
  //   promos?.map((promo) => {
  //     if (promo.products.includes(props.productId.toString())) {
  //       setPromoProduct((prevData) => [...prevData, promo]);
  //     }
  //   });
  // }, [promos]);

  // HOVER PROMO
  const [hoverPromo, setHoverPromo] = useState("");
  const handleHoverPromo = (promo) => {
    setHoverPromo(promo);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        key={props._id.toString()}
        className="flex w-full bg-white my-1 shadow-sm py-2 min-h-[5.5rem] text-gray-600 items-center rounded-2xl px-2 relative inset-[0.2rem]"
      >
        <div className="w-[50%] font-semibold">
          <h1 className="text-sm sm:text-base items-center flex">
            {props.name}
          </h1>
          {promoProduct.length > 0 && (
            <div className="h-6 w-full z-[1] flex items-end">
              {promoProduct.map((promo) => (
                <div
                  onMouseDown={() => handleHoverPromo(promo._id)}
                  onMouseEnter={() => handleHoverPromo(promo._id)}
                  onMouseLeave={() => handleHoverPromo("")}
                  key={promo._id}
                  className="relative"
                >
                  <img
                    src={promo.imageUrl}
                    className="h-3 sm:h-6 mr-2"
                    alt=""
                  />
                  {hoverPromo === promo._id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm text-center p-3 z-[100] shadow-md bg-gradient-to-r from-primaryDark to-primaryThin text-white border-2 border-primaryNormal h-20 w-36 absolute flex flex-col items-center justify-center rounded-2xl"
                    >
                      <h1 className="">{promo.name}</h1>
                      <h1>
                        {(promo.type === "diskon nominal" ||
                          promo.type === "cashback nominal") &&
                          "Rp. "}
                        {promo.value}
                        {(promo.type === "diskon persentase" ||
                          promo.type === "cashback persentase") &&
                          "%"}
                      </h1>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-[20%] flex items-center font-bold  drop-shadow-sm">
          <div className="flex flex-col ml-1  text-[0.7rem] font-semibold sm:text-sm">
            {props?.discount != props.price && (
              <span className="text-secondary -mb-1">Rp.{props?.discount?.toLocaleString()}</span>
            )}
            <span
              className={`text-gray-600 -mb-1 ${
                props.price != props?.discount &&
                "line-through  opacity-[0.6]  w-full text-center"
              }`}
            >
              Rp.{(props.price / props.qty).toLocaleString()}
            </span>
            {props?.cashback > 0 && (
              <span className="text-primaryThin  text-center">
                +Rp.{props?.cashback?.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <div className="w-[20%] flex items-center   drop-shadow-sm f">
          <div className="flex flex-col ml-1 text-[0.7rem] font-semibold sm:text-sm">
            {props?.discount != props.price && (
              <span className="text-secondary -mb-1">
                Rp.{props?.discount?.toLocaleString()}
              </span>
            )}
            <span
              className={`text-primaryNormal -mb-1 ${
                props.price != props?.discount &&
                "line-through opacity-[0.6]  w-full text-center"
              }`}
            >
              Rp.{props.price?.toLocaleString()}
            </span>
            {props?.cashback > 0 && (
              <span className="text-primaryThin text-center">
                +Rp.{(props?.cashback * props.qty)?.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <div className="w-[10%] flex items-center">
          <h1
            type="text"
            className={`px-2 py-2 w-10 text-center text-sm font-semibold`}
          >
            {props?.qty}
          </h1>
        </div>
      </motion.div>
    </>
  );
}

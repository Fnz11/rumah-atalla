/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FoodsKasirPopover({
  item: props,
  handleTotal,
  productsForm,
  promos,
}) {
  console.log(props, "EEPPEPEPPPPPPPPPP");
  // QUANTITY
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const exist = productsForm.find((item) => item.productId === props._id);
    if (exist) {
      setQuantity(exist.qty);
    }
  }, []);

  const [promoProduct, setPromoProduct] = useState([]);
  useEffect(() => {
    let newPromo = [];
    promos.map((promo) => {
      if (promo.products.includes(props._id)) {
        newPromo.push(promo);
      }
    });
    setPromoProduct(newPromo);
  }, []);

  const handleDecrement = () => {
    // console.log(product);
    if (quantity > 1) {
      setQuantity(quantity - 1);
      handleTotal({
        productId: props._id,
        qty: quantity - 1,
        price: props.price,
        discount: props.discount,
        cashback: props.cashback,
        name: props.name,
      });
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    handleTotal({
      productId: props._id,
      qty: quantity + 1,
      price: props.price,
      discount: props.discount,
      cashback: props.cashback,
      name: props.name,
    });
  };

  // HOVER PROMO
  const [hoverPromo, setHoverPromo] = useState("");

  // COMA
  function addDotsToNumber(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const handleHoverPromo = (promo) => {
    setHoverPromo(promo);
  };

  const HargaComponent = () => {
    return (
      <>
        <div className="flex flex-col leading-3 sm:leading-4 ">
          {props?.discount != props.price && (
            <span className="text-secondary ">
              Rp. {addDotsToNumber(props?.discount)}
            </span>
          )}
          <span
            className={`text-secondary  ${
              props.price != props?.discount &&
              "line-through  opacity-[0.6]  w-full text-center"
            }`}
          >
            Rp. {addDotsToNumber(props.price)}
          </span>
          {props?.cashback > 0 && (
            <span className="text-primaryThin  text-center">
              + Rp. {addDotsToNumber(props?.cashback)}
            </span>
          )}
        </div>
      </>
    );
  };

  const JumlahComponent = () => {
    return (
      <>
        <div className="flex flex-col leading-3 sm:leading-4 ">
          {props?.discount != props.price && (
            <span className="text-secondary ">
              Rp. {addDotsToNumber(props?.discount * quantity)}
            </span>
          )}
          <span
            className={`text-secondary  ${
              props.price != props?.discount &&
              "line-through  opacity-[0.6]  w-full text-center"
            }`}
          >
            Rp. {addDotsToNumber(props.price * quantity)}
          </span>
          {props?.cashback > 0 && (
            <span className="text-primaryThin  text-center">
              + Rp. {addDotsToNumber(props?.cashback * quantity)}
            </span>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        key={props._id}
        className="flex w-full  bg-section my-1 shadow-md py-2 min-h-[5.5rem] text-gray-600  text-[0.7rem] sm:text-sm items-center rounded-2xl px-2 relative inset-[0.2rem]"
      >
        <div className="w-[50%] gap-3 sm:w-[40%] flex flex-col justify-between">
          <div>
            {props.name} <br />
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
                        className=" text-center left-0 p-3 z-[100] shadow-md bg-gradient-to-r from-[#FFB000] to-[#FFE569] text-white border-2 border-[#FFE569] h-20 w-36 absolute flex flex-col items-center justify-center rounded-2xl"
                      >
                        <h1 className="drop-shadow-sm">{promo.name}</h1>
                        <h1 className="drop-shadow-sm">
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
          <div className="sm:hidden w-fit pr-3">
            <HargaComponent />
          </div>
        </div>
        <div className="w-[20%] max-sm:hidden flex items-center font-semibold  text-end  drop-shadow-sm">
          <HargaComponent />
        </div>
        <div className="w-[20%] max-sm:hidden flex items-center font-semibold  text-end  drop-shadow-sm">
          <JumlahComponent />
        </div>
        <div className="w-[50%] gap-3 sm:w-[20%] flex flex-col items-end sm:items-center justify-between">
          <div>
            <button
              onClick={handleDecrement}
              className="px-2 py-1 border-2 border-gray-300"
            >
              -
            </button>
            <input
              type="text"
              className={`px-2 py-2 border-y-2 w-10 border-gray-300 text-center `}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button
              onClick={handleIncrement}
              className="px-2 py-1 border-2 border-gray-300 "
            >
              +
            </button>
          </div>
          <div className="sm:hidden w-fit pr-3">
            <JumlahComponent />
          </div>
        </div>
      </motion.div>
    </>
  );
}

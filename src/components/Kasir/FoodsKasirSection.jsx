/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import CustomToast from "../CustomToast";

export default function FoodsKasirSection({
  props,
  addToCart,
  CartItems,
  promos,
  type,
}) {
  const handleAddToCart = () => {
    if (props?.stock == 0) {
      toast.custom((t) => (
        <CustomToast
          t={t}
          message="Failed to add to cart, stock needed"
          type="failed"
        />
      ));
      return;
    }
    addToCart(props._id.toString(), type);
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={props._id.toString()}
        className={` ${props?.stock === 0 && "cursor-not-allowed"} ${
          CartItems.includes(props._id.toString())
            ? "border-4 border-primaryThin opacity-[0.6] shadow-lg group hover:shadow-xl"
            : " shadow-lg group hover:shadow-xl"
        } group relative bg-section rounded-t-2xl rounded-bl-2xl transition-all  text-[0.6rem] sm:text-sm mb-10`}
      >
        <div
          className={`w-full bg-section-dark text-white opacity-[0.8] text-sm sm:text-2xl font-semibold h-full absolute left-0 top-0 z-[10] flex items-center justify-center pb-10 ${
            props?.stock > 0 && "hidden"
          } `}
        >
          out of stock
        </div>
        <div className="relative w-full overflow-hidden rounded-xl bg-gray-200 group-hover:opacity-[0.85] transition-all aspect-square">
          <div className="absolute h-full w-full z-[1] flex items-end">
            {promos.map((item, index) => {
              let included = false;
              const currentDate = new Date();

              if (
                item.products.includes(props._id.toString()) &&
                new Date(item.date.startDate) < currentDate &&
                new Date(item.date.endDate) > currentDate
              ) {
                included = true;
              }
              if (included) {
                return (
                  <img
                    key={index}
                    src={item?.imageUrl?.url}
                    className="h-6 sm:h-12 mr-1 aspect-square object-cover object-center drop-shadow-xl rounded-sm"
                    alt=""
                  />
                );
              }
            })}
          </div>
          <img
            src={props.imageUrl.url}
            alt={props.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="my-2 mx-4 flex flex-col justify-between">
          <div>
            <h3 className=" text-gray-700">
              <div>
                <span aria-hidden="true" className="absolute inset-0" />
                {props.name}
              </div>
            </h3>
          </div>
          <div className="flex justify-between">
            <p className=" font-medium ">{props.stock}</p>
            <p className=" font-semibold text-secondary">
              Rp. {props.price?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* INC */}
        <div
          className={`px-[1.5rem] pt-[0.4rem] pb-[1rem] rounded-bl-3xl rounded-br-3xl bg-white absolute z-[1111]  shadow-xl flex gap-[0.1rem] ${
            CartItems.includes(props._id.toString())
              ? "border-4 border-t-0 border-primaryThin shadow-lg group hover:shadow-xl -right-1 -bottom-[3.85rem]"
              : " -right-0 -bottom-[3.6rem] shadow-lg group hover:shadow-xl"
          } `}
        >
          <button
            // onClick={handleDecrement}
            className="px-3 py-2 text-white bg-section-dark rounded-md "
          >
            -
          </button>
          <input
            type="text"
            className={`px-2 py-2 text-center text-white bg-section-dark rounded-md w-10 `}
            // value={quantity}
            // onChange={handleQuantity}
          />
          <button
            onClick={handleAddToCart}
            className="px-3 py-2 text-white bg-section-dark rounded-md  "
          >
            +
          </button>
        </div>
      </motion.div>
    </>
  );
}

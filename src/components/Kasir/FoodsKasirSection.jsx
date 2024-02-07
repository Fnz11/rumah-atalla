/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export default function FoodsKasirSection({
  props,
  addToCart,
  CartItems,
  promos,
  type,
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => addToCart(props._id.toString(), type)}
        key={props._id.toString()}
        className={`${
          CartItems.includes(props._id.toString())
            ? "border-4 border-primaryThin opacity-[0.6] scale-[0.95] shadow-lg group hover:shadow-xl"
            : " shadow-lg group hover:shadow-xl"
        }  group relative bg-section rounded-2xl transition-all `}
      >
        <div className="relative w-full overflow-hidden rounded-2xl bg-gray-200 group-hover:opacity-[0.85] transition-all aspect-square">
          <div className="absolute h-full w-full z-[1] flex items-end">
            {promos.map((item, index) => {
              if (item?.products?.includes(props?._id?.toString())) {
                return (
                  <img
                    key={index}
                    src={item.imageUrl.url}
                    className="h-12 mr-1 drop-shadow-xl"
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
            <h3 className="text-sm text-gray-700">
              <div>
                <span aria-hidden="true" className="absolute inset-0" />
                {props.name}
              </div>
            </h3>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-medium ">{props.stock}</p>
            <p className="text-sm font-semibold text-secondary">
              Rp. {props.price?.toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

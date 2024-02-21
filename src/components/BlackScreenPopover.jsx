/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export default function BlackScreenPopover({ onClick, isLoading }) {
  console.log(isLoading, onClick);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        className={` ${
          isLoading && "pointer-events-none"
        } w-screen h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm absolute`}
      ></motion.div>
    </>
  );
}

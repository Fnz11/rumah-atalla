/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useEffect } from "react";

export default function Carts() {
  // QUANTITY
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  return (
    <>
      <div className="bg-thirdyThin min-w-fit min-h-screen py-10 text-primaryDark">
        {/* CONTENT */}
        <div className="mx-4 sm:mx-6 lg:mx-32 h-min-[50rem] bg-white rounded-sm shadow-md">
          {/* TOP */}
          <div className="w-full bg-secondary text-white shadow-md h-16 px-5 flex text-lg font-medium items-center">
            <div className="w-[5%]"></div>
            <h1 className="w-[40%]">Produk</h1>
            <h1 className="w-[20%]">Harga Satuan</h1>
            <h1 className="w-[20%]">Total Harga</h1>
            <h1 className="w-[15%]">Aksi</h1>
          </div>

          {/* CONTENT */}
          {[...Array(10)].map((item, i) => (
            <div
              key={i}
              className={`w-full border-b-2 border-thirdyThin min-h-[10rem] px-5 flex text-lg font-thin items-center ${
                i === 9 ? "border-b-0" : ""
              }`}
            >
              <div className="w-[5%] pl-2 flex items-end">
                <input type="checkbox" className="scale-[1.5]" />
              </div>
              <div className="w-[40%]">
                <div className="flex gap-3">
                  <div className="w-44 h-full">
                    <img
                      src="https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg"
                      className="w-44 aspect-square"
                      alt=""
                    />
                  </div>
                  <div className="w-full mr-8">
                    <h1>Hijab crep</h1>
                    <textarea
                      rows="4"
                      placeholder="Deskripsi..."
                      className="shadow-s border-[2px] w-full  border-gray-300 p-1 text-sm rounded-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[20%]">Rp. 90.000</div>
              <div className="w-[20%]">Rp. 90.000</div>
              <div className="w-[15%] flex items-center">
                <button
                  onClick={handleDecrement}
                  className="px-2 py-1 border-2 border-gray-300"
                >
                  -
                </button>
                <input
                  type="text"
                  className={`px-2 py-2 border-y-2 w-10 border-gray-300 text-center text-sm`}
                  value={quantity}
                />
                <button
                  onClick={handleIncrement}
                  className="px-2 py-1 border-2 border-gray-300 "
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-4 sm:mx-6 mt-5 lg:mx-32 p-5 h-32 bg-white rounded-sm shadow-md"></div>
      </div>
    </>
  );
}

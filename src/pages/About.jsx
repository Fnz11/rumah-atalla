/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FashionAndFoods from "../components/About/FashionAndFoods";
import Gallery from "../components/About/Gallery";
import Header from "../components/About/Header";
import Medsos from "../components/About/Medsos";
import Quote from "../components/About/Quote";
import Button from "../components/Button";
import axios from "axios";
import Title from "../components/Title";
import FashionKasirSection from "../components/Kasir/FashionKasirSection";
import { Link } from "react-router-dom";

export default function About() {
  const products = [
    {
      id: 1,
      imageSrc:
        "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
      imageAlt: "Product 1",
      href: "#",
      name: "Blouse Bunga",
      color: "Pink",
      price: "$29.99",
    },
    {
      id: 2,
      imageSrc:
        "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
      imageAlt: "Product 2",
      href: "#",
      name: "Gaun Maxi Floral",
      color: "Biru",
      price: "$39.99",
    },
    {
      id: 3,
      imageSrc:
        "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
      imageAlt: "Product 3",
      href: "#",
      name: "Rok Midi Polkadot",
      color: "Putih",
      price: "$24.99",
    },
    {
      id: 4,
      imageSrc:
        "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
      imageAlt: "Product 4",
      href: "#",
      name: "Blazer Formal",
      color: "Hitam",
      price: "$49.99",
    },
    {
      id: 5,
      imageSrc:
        "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
      imageAlt: "Product 5",
      href: "#",
      name: "Dress Polos",
      color: "Merah",
      price: "$34.99",
    },
    {
      id: 6,
      imageSrc:
        "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
      imageAlt: "Product 6",
      href: "#",
      name: "Blouse Stripe",
      color: "Biru dan Putih",
      price: "$27.99",
    },
  ];
  const DBURL = import.meta.env.VITE_APP_DB_URL;
  const [fashionProducts, setFashionProducts] = useState([]);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);

  const fetchFashionProducts = async () => {
    setIsLoadingFetch(true);
    await axios
      .get(DBURL + "/products/")
      .then((res) => {
        setFashionProducts(res.data);
        setIsLoadingFetch(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchFashionProducts();
  }, []);

  return (
    <>
      <div>
        {/* HEADER */}
        <Header />

        {/* FASHION AND FOOD */}
        <FashionAndFoods />

        {/* MEDSOS */}
        <Medsos />

        {/* KUTIPAN */}
        <Quote />

        {/* FOTO FOTO */}
        <Gallery />

        {/* PRODUCT REKOMENDASI */}
        <div className="w-screen h-auto flex xl:px-32 flex-col items-center bg-thirdyThin pt-20 mb-20 ">
          {/* TITTLE */}
          <Title title="Recent Fashion" />

          {/* PRODUCT */}
          <div className="grid grid-cols-3 gap-x-2 gap-y-10 lg:grid-cols-6 xl:gap-x-4">
            {fashionProducts.map((product, index) => {
              if (index > 5) return;
              return (
                <FashionKasirSection
                  props={product}
                  key={index}
                  FashionCartItems={[]}
                  toggleShowMore={{}}
                />
              );
            })}
          </div>
          <Link to="/fashions">
            <Button className={"mt-7"} variant="secondary">
              More
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

// {/* FOOD REKOMENDASI */}
// <div className="w-screen h-auto flex flex-col items-center bg-thirdyThin pb-10">
//   {/* JUDUL */}
//   <div className="flex items-center gap-5 w-[95%] mb-10">
//     <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
//     <h1 className=" text-[2.5rem] text-center font-semibold text-primaryNormal drop-shadow-md">
//       Food Rekomendasi
//     </h1>
//     <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
//   </div>

//   {/* FOOD */}
//   <div className="grid grid-cols-3 gap-x-2 gap-y-10 lg:grid-cols-6 mx-10 xl:gap-x-4">
//     {products.map((product) => (
//       <div
//         key={product.id}
//         className="group relative bg-white drop-shadow-sm group hover:drop-shadow-md transition-all rounded-2xl"
//       >
//         <div className=" w-full overflow-hidden rounded-2xl bg-gray-200 group-hover:opacity-[0.85] transition-all aspect-square">
//           <img
//             src={product.imageSrc}
//             alt={product.imageAlt}
//             className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//           />
//         </div>
//         <div className="my-2 mx-4 flex justify-between">
//           <div>
//             <h3 className="text-sm text-gray-700">
//               <a href={product.href}>
//                 <span aria-hidden="true" className="absolute inset-0" />
//                 {product.name}
//               </a>
//             </h3>
//             <p className="mt-1 text-sm text-gray-500">
//               {product.color}
//             </p>
//           </div>
//           <p className="text-sm font-medium ">{product.price}</p>
//         </div>
//       </div>
//     ))}
//   </div>
//   <Button className={"mt-7"} variant={"secondary"}>
//     More
//   </Button>
// </div>

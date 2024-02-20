/* eslint-disable no-unused-vars */
import FashionAndFoods from "../components/About/FashionAndFoods";
import Gallery from "../components/About/Gallery";
import Medsos from "../components/About/Medsos";
import Quote from "../components/About/Quote";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <div>
        {/* HEADER */}
        <About />

        {/* FASHION AND FOOD */}
        <FashionAndFoods />

        {/* MEDSOS */}
        <Medsos />

        {/* KUTIPAN */}
        <Quote />

        {/* FOTO FOTO */}
        <Gallery />
      </div>
    </>
  );
}

// {/* PRODUCT REKOMENDASI */}
// <div className="w-screen h-auto flex flex-col items-center bg-thirdyThin pt-20 pb-10">
//   {/* TITTLE */}
//   <div className="flex items-center gap-5 w-[95%] mb-10">
//     <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
//     <h1 className=" text-[2.5rem] text-center font-semibold text-primaryNormal drop-shadow-md">
//       Fashion Rekomendasi
//     </h1>
//     <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
//   </div>

//   {/* PRODUCT */}
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
//   <Button className={"mt-7"} variant="secondary">
//     More
//   </Button>
// </div>

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

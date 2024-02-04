import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function About() {
  // const products = [
  //   {
  //     id: 1,
  //     imageSrc:
  //       "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
  //     imageAlt: "Product 1",
  //     href: "#",
  //     name: "Blouse Bunga",
  //     color: "Pink",
  //     price: "$29.99",
  //   },
  //   {
  //     id: 2,
  //     imageSrc:
  //       "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
  //     imageAlt: "Product 2",
  //     href: "#",
  //     name: "Gaun Maxi Floral",
  //     color: "Biru",
  //     price: "$39.99",
  //   },
  //   {
  //     id: 3,
  //     imageSrc:
  //       "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
  //     imageAlt: "Product 3",
  //     href: "#",
  //     name: "Rok Midi Polkadot",
  //     color: "Putih",
  //     price: "$24.99",
  //   },
  //   {
  //     id: 4,
  //     imageSrc:
  //       "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
  //     imageAlt: "Product 4",
  //     href: "#",
  //     name: "Blazer Formal",
  //     color: "Hitam",
  //     price: "$49.99",
  //   },
  //   {
  //     id: 5,
  //     imageSrc:
  //       "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
  //     imageAlt: "Product 5",
  //     href: "#",
  //     name: "Dress Polos",
  //     color: "Merah",
  //     price: "$34.99",
  //   },
  //   {
  //     id: 6,
  //     imageSrc:
  //       "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
  //     imageAlt: "Product 6",
  //     href: "#",
  //     name: "Blouse Stripe",
  //     color: "Biru dan Putih",
  //     price: "$27.99",
  //   },
  // ];
  return (
    <>
      <div>
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row w-full h-[90vh] overflow-hidden justify-center bg-gray-900 shadow-xl">
          {/* LEFT */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <img
              src="Header.jpg"
              className="absolute opacity-[60%] object-cover h-[110vh] top-0 z-[1] blur-[5px]"
              alt="Header"
            />
            <div className="text-center mb-18 z-[2] drop-shadow-md">
              <h1 className="text-[2.5rem] lg:text-8xl font-semibold tracking-tight mb-2 text-primaryThin">
                Pilihan Terbaik
              </h1>
              <h1 className="text-[2.5rem] lg:text-8xl font-semibold tracking-tight mb-5 text-thirdyNormal">
                Untuk Fashion Anda
              </h1>
              <h1 className="text-xl lg:text-3xl font-semibold tracking-tight text-thirdyNormal">
                Jangan lewatkan promo-promo menarik!
              </h1>
              <div className="flex gap-5 mt-6 items-center w-full justify-center">
                <Link to={"/login"}>
                  <Button variant="thirdy">Log In</Button>
                </Link>
                {/* <Button variant="secondary">Fashions</Button> */}
              </div>
            </div>
          </div>
        </div>

        {/* FASHION AND FOOD */}
        <div className="w-screen  flex flex-col">
          {/* FASHION */}
          <div className="w-sceem sm:h-[90vh] px-4 sm:px-10 xl:px-52 flex flex-col sm:flex-row gap-0 sm:gap-10 mt-20 sm:mt-32">
            {/* TITTLE MOBILE */}
            <div className="sm:hidden flex items-center gap-5 w-full mb-10">
              <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
              <h1 className=" text-[2.5rem] font-semibold text-primaryNormal drop-shadow-md">
                Fashion
              </h1>
              <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
            </div>

            {/* IMAGE */}
            <div className="h-auto relative sm:w-[50%] lg:w-[40%] aspect-square sm:aspect-[9/16] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl group hover:scale-95 transition-all duration-500 flex items-end ">
              <img
                src="LandingFashion.jpg"
                className="absolute sm:w-auto aspect-square h-full object-cover  transition-all duration-700 group-hover:scale-105 group-hover:rotate-2"
                alt="LandingFashion"
              />

              {/* TYPOGRAPHY MOBILE */}
              <div className="w-full flex flex-col text-justify group-hover:translate-y-0 translate-y-[28rem] transition-all duration-700 sm:hidden h-auto justify-center relative p-5 bg-[rgba(0,0,0,70%)] rounded-t-sm border-t-4 border-primaryNormal">
                <div className="text-sm text-thirdyThin w-full">
                  <h1 className="indent-20">
                    koleksi fashion hijab di Rumah Atalla adalah manifestasi
                    dari keanggunan dan keindahan. Setiap kain dipilih dengan
                    teliti untuk menciptakan hijab-hijab yang tidak hanya
                    mengikuti tren terkini, tetapi juga menampilkan sentuhan
                    klasik yang timeless.
                  </h1>
                  <ul className="mt-3 ">
                    <li>- Tren Terkini yang Dipadu dengan Sentuhan Klasik</li>
                    <li className="mt-2">- Jahitan Berkualitas Tinggi</li>
                    <li className="mt-2">- Variasi Warna dan Desain</li>
                    <li className="mt-2">- Kenyamanan dan Fungsionalitas</li>
                  </ul>
                  {/* <Button className={"mt-2"} variant="secondary">
                    Lihat
                  </Button> */}
                </div>
              </div>
            </div>

            {/* TYPOGRAPHY */}
            <div className="w-[50%] lg:w-[60%] sm:flex flex-col text-justify h-full justify-center hidden">
              <div className="flex items-center gap-5 w-[70%] mb-4 ">
                <h1 className="text-4xl sm:text-[2.5rem] font-semibold text-primaryNormal drop-shadow-md">
                  Fashions
                </h1>
                <div className="w-full h-[0.15rem] sm:h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
              </div>
              <div className="text-lg lg:text-xl  text-primaryDark w-full">
                <h1 className="indent-20">
                  koleksi fashion hijab di Rumah Atalla adalah manifestasi dari
                  keanggunan dan keindahan. Setiap kain dipilih dengan teliti
                  untuk menciptakan hijab-hijab yang tidak hanya mengikuti tren
                  terkini, tetapi juga menampilkan sentuhan klasik yang
                  timeless. Dari desain yang elegan hingga warna yang memikat,
                  setiap jahitan hijab mencerminkan dedikasi kami dalam
                  menciptakan gaya yang memancarkan pesona.
                </h1>
                <ul className="mt-3 ">
                  <li>- Tren Terkini yang Dipadu dengan Sentuhan Klasik</li>
                  <li className="mt-2">- Jahitan Berkualitas Tinggi</li>
                  <li className="mt-2">- Variasi Warna dan Desain</li>
                  <li className="mt-2">- Kenyamanan dan Fungsionalitas</li>
                </ul>
                {/* <Button className={"mt-7"} variant="secondary">
                  Lihat
                </Button> */}
              </div>
            </div>
          </div>

          {/* FOOD */}
          <div className="w-screen sm:h-[90vh] px-4 sm:px-10 xl:px-52 flex flex-col sm:flex-row gap-0 sm:gap-10 mt-20 sm:mt-32">
            {/* TYPOGRAPHY */}
            <div className="w-[50%] lg:w-[60%] sm:flex flex-col text-justify h-full justify-center hidden">
              <div className="flex items-center gap-5 w-[70%] mb-4 ">
                <h1 className="text-4xl sm:text-[2.5rem] font-semibold text-primaryNormal drop-shadow-md">
                  Foods
                </h1>
                <div className="w-full h-[0.15rem] sm:h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
              </div>
              <div className="text-lg lg:text-xl  text-primaryDark w-full">
                <h1 className="indent-20">
                  Selain itu, Rumah Atalla juga mengundang Anda untuk menikmati
                  petualangan kuliner yang menggoda. Dari hidangan khas yang
                  autentik hingga minuman yang menyegarkan, pengalaman
                  gastronomi kami dirancang untuk memuaskan setiap selera. Dapur
                  kami merupakan tempat di mana inovasi dan tradisi bertemu,
                  menghasilkan hidangan-hidangan yang tidak hanya mengundang
                  selera, tetapi juga mengundang Anda untuk menjelajahi
                  rasa-rasa baru yang memikat.
                </h1>
                <ul className="mt-3 ">
                  <li>- Keaslian Rasa yang Mendalam</li>
                  <li className="mt-2">
                    - Inovasi Kuliner yang Menggugah Selera
                  </li>
                  <li className="mt-2">
                    - Teladan Kualitas Bahan Baku yang Teliti
                  </li>
                  <li className="mt-2">- Diversity Menu yang Mengagumkan</li>
                </ul>
                {/* <Button className={"mt-7"}>Lihat</Button> */}
              </div>
            </div>

            {/* TITTLE MOBILE */}
            <div className="sm:hidden flex items-center gap-5 w-full mb-10">
              <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
              <h1 className=" text-[2.5rem] font-semibold text-primaryNormal drop-shadow-md">
                Foods
              </h1>
              <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
            </div>

            {/* IMAGE */}
            <div className="h-auto w-full relative sm:w-[50%] lg:w-[40%] aspect-square sm:aspect-[9/16] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl group hover:scale-95 transition-all duration-500 flex items-end ">
              <img
                src="LandingFood.jpg"
                className="absolute sm:w-auto aspect-square h-full object-cover  transition-all duration-700 group-hover:scale-105 group-hover:rotate-2"
                alt="LandingFashion"
              />

              {/* TYPOGRAPHY MOBILE */}
              <div className="w-full flex flex-col text-justify group-hover:translate-y-0 translate-y-[28rem] transition-all duration-700 sm:hidden h-auto justify-center relative p-5 bg-[rgba(0,0,0,70%)] rounded-t-sm border-t-4 border-primaryNormal">
                <div className="text-sm text-thirdyThin w-full">
                  <h1 className="indent-20">
                    Selain itu, Rumah Atalla juga mengundang Anda untuk
                    menikmati petualangan kuliner yang menggoda. Dari hidangan
                    khas yang autentik hingga minuman yang menyegarkan,
                    pengalaman gastronomi kami dirancang untuk memuaskan setiap
                    selera.
                  </h1>
                  <ul className="mt-3 ">
                    <li>- Keaslian Rasa yang Mendalam</li>
                    <li className="mt-2">
                      - Inovasi Kuliner yang Menggugah Selera
                    </li>
                    <li className="mt-2">
                      - Teladan Kualitas Bahan Baku yang Teliti
                    </li>
                    <li className="mt-2">- Diversity Menu yang Mengagumkan</li>
                  </ul>
                  {/* <Button className={"mt-2"}>Lihat</Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KELEBIHAN */}
        <div className="w-screen mt-44 sm:mt-64 relative">
          <div className="w-screen h-56 sm:h-72 bg-secondary shadow-md absolute z-[-1] -top-20 sm:-top-32"></div>

          <section className="text-primaryDark body-font z-[10] items-center w-screen justify-center xl:px-32 mt-20">
            <div className="flex flex-wrap ">
              {[...Array(4)].map((i) => (
                <div key={i} className="p-5 h-min-72 w-screen sm:w-1/2">
                  <div className="w-full drop-shadow-md hover:drop-shadow-xl group hover:scale-[1.02] transition-all duration-300 bg-white pb-5 rounded-2xl border-2 border-primaryVeryThin h-full relative">
                    <div className="p-5 lg:p-10 z-[10] flex">
                      <div className="w-10 h-10 px-3 hidden sm:inline-flex items-center justify-center rounded-full bg-primaryThin text-thirdyThin group-hover:bg-secondary mb-4 transition-all duration-300">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-6 h-6 drop-shadow-xl"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                      </div>
                      <div className="ml-5 ">
                        <div className="w-full items-center flex justify-center ">
                          <div className="w-10 h-10 px-3 sm:hidden inline-flex items-center justify-center rounded-full bg-primaryThin text-thirdyThin group-hover:bg-secondary transition-all duration-300">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-6 h-6 drop-shadow-xl"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                          </div>
                        </div>
                        <h2 className=" text-2xl sm:text-left text-center text-primaryDark font-medium title-font mb-1 group-hover:text-secondary drop-shadow-sm transition-all duration-300">
                          Shooting Stars
                        </h2>
                        <p className="leading-relaxed text-sm sm:text-base text-primaryDark transition-all duration-500 text-justify">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Et fugiat repellat cupiditate vitae in, amet
                          nihil ipsum nostrum ea quos fuga iste suscipit ex,
                          corrupti saepe! Adipisci rem quidem quaerat! Lorem
                          ipsum dolor, sit amet consectetur adipisicing elit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* KUTIPAN */}
        <div>
          <section className="text-primaryDark body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className=" sm:w-4/5 lg:w-3/5 w-full mx-auto text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="inline-block w-8 h-8 text-primaryNormal mb-8"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed text-sm sm:text-lg">
                  Dalam perjalanan kecantikan dan cita rasa, terdapat perjumpaan
                  yang magis di setiap langkah. Di Rumah Atalla, kami memahami
                  bahwa keindahan tak hanya terletak pada jalinan kain yang
                  elegan, melainkan juga dalam sentuhan-sentuhan rasa yang
                  menggetarkan. Di sini, fashion hijab menjadi ungkapan dari
                  keanggunan yang tak terucapkan, sementara makanan dan minuman
                  menjadi cinta yang menyentuh jiwa. Kami memahami bahwa
                  keindahan bukanlah sekadar penampilan luar, tetapi juga sebuah
                  pengalaman yang meresap dalam hati. Di Rumah Atalla, kami
                  mengajak Anda untuk menemukan harmoni antara gaya dan
                  kenikmatan, menciptakan cerita indah dalam setiap detik yang
                  kami bagi bersama Anda.
                </p>
                <div className="inline-block h-1 w-20 rounded bg-secondary mt-8 mb-6"></div>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  RAFFI ATALLA
                </h2>
                <p className="text-gray-500">CEO</p>
              </div>
            </div>
          </section>
        </div>

        {/* FOTO FOTO */}
        <div className="w-screen min-h-screen h-[200vh] sm:h-screen text-thirdyNormal mt-10 shadow-md">
          <div className="grid grid-cols-2 grid-rows-4 sm:grid-cols-4 sm:grid-rows-2 h-full w-full">
            {/* 1 */}
            <div className=" col-span-2 row-span-2  relative overflow-hidden h-screen w-screen sm:h-full sm:w-full group ">
              <div className="h-28 sm:h-36 w-56 sm:w-72 absolute bottom-20 left-0 z-10 bg-secondary shadow-md rounded-2xl p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-semibold drop-shadow-md tracking-tight">
                  Diskon 10%
                </h1>
                <h1 className="text-sm text-justify mt-1 sm:mt-2">
                  Untuk pengguna baru yang membeli di website ini
                </h1>
              </div>

              <img
                src="LandingFashion2.jpg"
                className="object-cover h-full sm:w-auto w-full absolute group-hover:scale-[1.1] group-hover:rotate-2 transition-all duration-1000"
                alt=""
              />
            </div>
            {/* 2 */}
            <div className="bg-primaryNormal h-full flex items-center justify-center">
              <h1 className="lg:text-6xl text-4xl text-center font-semibold drop-shadow-md">
                Fashion <br /> Trendy
              </h1>
            </div>
            {/* 3 */}
            <div className="h-full group relative overflow-hidden">
              <img
                src="LandingFashion3.jpg"
                className="object-cover h-full absolute group-hover:scale-[1.15] scale-[1.05] group-hover:rotate-2 transition-all duration-1000"
                alt=""
              />
            </div>
            {/* 4 */}
            <div className="h-full group relative overflow-hidden">
              <img
                src="LandingFashion4.jpg"
                className="object-cover h-full absolute group-hover:scale-[1.15] scale-[1.05] group-hover:rotate-2 transition-all duration-1000"
                alt=""
              />
            </div>
            {/* 5 */}
            <div className="bg-primaryNormal h-full flex items-center justify-center">
              {" "}
              <h1 className="lg:text-6xl text-4xl text-center font-semibold drop-shadow-md">
                Promo <br /> Menarik
              </h1>
            </div>
          </div>
        </div>

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
export default function Products() {
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
    {
      id: 7,
      imageSrc:
        "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
      imageAlt: "Product 7",
      href: "#",
      name: "Jumpsuit Casual",
      color: "Hijau",
      price: "$37.99",
    },
    {
      id: 8,
      imageSrc:
        "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
      imageAlt: "Product 8",
      href: "#",
      name: "Blouse Kemeja",
      color: "Abu-abu",
      price: "$31.99",
    },
    {
      id: 9,
      imageSrc:
        "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
      imageAlt: "Product 9",
      href: "#",
      name: "Celana Panjang",
      color: "Cokelat",
      price: "$44.99",
    },
    {
      id: 10,
      imageSrc:
        "https://fitinline.com/data/article/20211206/Baju-Kerja-Wanita-006.jpg",
      imageAlt: "Product 10",
      href: "#",
      name: "Blouse Pattern",
      color: "Kuning",
      price: "$26.99",
    },
  ];

  return (
    <div className="bg-thirdyThin min-w-fit min-h-screen text-gray-600">
      {/* CONTENT */}
      <div className="mx-4 sm:mx-6 lg:mx-32 p-5">
        <div className="flex gap-5 my-5 ">
          {/* FILTER */}
          <div className="h-[100rem] lg:w-[18rem] w-[15rem] bg-white rounded-sm drop-shadow-sm hover:drop-shadow-md p-3">
            <h1 className="text-2xl font-semibold">Filter</h1>
          </div>
          <div>
            {/* TOP TITTLE */}
            <div className="flex items-center gap-5 w-full mb-10">
              <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
              <h1 className=" text-[2.5rem] text-center font-semibold text-primaryNormal drop-shadow-md">
                Top
              </h1>
              <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
            </div>

            {/* TOP */}
            <div></div>

            {/* PRODUCT TITTLE */}
            <div className="flex items-center gap-5 w-full mb-10">
              <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
              <h1 className=" text-[2.5rem] text-center font-semibold text-primaryNormal drop-shadow-md">
                Fashions
              </h1>
              <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
            </div>

            {/* PRODUCT */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-10 lg:grid-cols-3 xl:gap-x-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white drop-shadow-sm group hover:drop-shadow-md transition-all rounded-sm"
                >
                  <div className=" w-full overflow-hidden rounded-sm bg-gray-200 group-hover:opacity-[0.85] transition-all aspect-square">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="my-2 mx-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <p className="text-sm font-medium ">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

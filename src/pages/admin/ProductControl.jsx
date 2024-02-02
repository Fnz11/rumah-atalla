/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FashionProductSection from "../../components/ProductController/FashionProductSection";
import FashionProductPopover from "../../components/ProductController/FashionProductPopover";
import axios from "axios";
import FoodsProductSection from "../../components/ProductController/FoodsProductSection";
import FoodsProductPopover from "../../components/ProductController/FoodsProductPopover";
import { AnimatePresence, motion } from "framer-motion";
import Title from "../../components/Title";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../../components/CustomToast";

export default function ProductControl() {
  // const Products = [
  //   {
  //     store: "tokopedia",
  //     name: "Cardigan panjang",
  //     date: "2023-04-21",
  //     _id: "u8dy2rn3y432yd23yr8y98dry8j93",
  //     stock: 45,
  //     imageUrl:
  //       "https://images.tokopedia.net/blog-tokopedia-com/uploads/2018/01/tren-busana-muslim-1.jpg",
  //     status: "Public",
  //     price: 90000,
  //   },
  //   {
  //     store: "shopee",
  //     name: "Gamis",
  //     date: "2023-05-15",
  //     _id: "32nrd7923ydr9y32y79r9d23rj9d2",
  //     stock: 60,
  //     imageUrl:
  //       "https://asset-a.grid.id/crop/0x0:0x0/945x630/photo/2022/04/08/zd2-horzjpg-20220408101235.jpg",
  //     status: "Archive",
  //     price: 56000,
  //   },
  //   {
  //     store: "tokopedia",
  //     name: "Cadar Putih",
  //     date: "2023-07-12",
  //     _id: "328dr8023yrjd208r8238j0drj2j",
  //     stock: 40,
  //     imageUrl:
  //       "https://i.pinimg.com/736x/e6/a3/dd/e6a3dd3d091edd5f1b8f41e4a19b2ba9.jpg",
  //     status: "Archive",
  //     price: 18000,
  //   },
  //   {
  //     store: "shopee",
  //     name: "Hijab",
  //     date: "2023-08-29",
  //     _id: "2d8rn89y23dj9r3drj239ydu23rj",
  //     stock: 55,
  //     imageUrl:
  //       "https://cdn0-production-images-kly.akamaized.net/e8HQ3WFRqJWdcqPZT49iPkJEnsg=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2513779/original/049144000_1543820131-Laudya_Cynthia_Bella__10_.jpg",
  //     status: "Public",
  //     price: 22000,
  //   },
  //   {
  //     store: "tokopedia",
  //     name: "Pakaian Muslim",
  //     date: "2023-10-18",
  //     _id: "283d408234j3j482d349d28304fw",
  //     stock: 50,
  //     imageUrl:
  //       "https://ds393qgzrxwzn.cloudfront.net/cat1/img/images/0/8OLcsd3R1s.jpg",
  //     status: "Public",
  //     price: 89000,
  //   },
  //   {
  //     store: "shopee",
  //     name: "Gamis Muda",
  //     date: "2023-11-02",
  //     _id: "wefuuhwe9fhwef9uhwefiwehfuwhfh",
  //     stock: 35,
  //     imageUrl:
  //       "https://thumb.viva.co.id/media/frontend/thumbs3/2023/09/16/6505d3ec9ef15-ilustrasi-fashion-muslim_665_374.jpeg",
  //     status: "Archive",
  //     price: 50000,
  //   },
  //   {
  //     store: "tokopedia",
  //     name: "Gamis Polos",
  //     date: "2024-01-20",
  //     _id: "wefuuhwe9fhwef9uhwefiwehfuwhfh",
  //     stock: 48,
  //     imageUrl:
  //       "https://s4.bukalapak.com/img/98007502003/s-463-463/data.jpeg.webp",
  //     status: "Archive",
  //     price: 98000,
  //   },
  // ];

  // PAGE
  const [page, setPage] = useState("fashions");

  // FETCH
  // FETCH PRODUCTS
  const [fashionProducts, setFashionProducts] = useState([]);
  const [webFashionProducts, setWebFashionProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchWebProducts = async () => {
    await axios
      .get("http://localhost:3000/api/products/")
      .then((res) => {
        setWebFashionProducts(res.data);
        setFashionProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // FETCH FOODS
  const [foodsProducts, setFoodsProducts] = useState([]);
  const fetchFoodsProducts = async () => {
    console.log("FEETTTTTTTFOOODD");
    await axios
      .get("http://localhost:3000/api/foods")
      .then((res) => {
        setFoodsProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchWebProducts();
    fetchFoodsProducts();
  }, []);

  useEffect(() => {
    console.log(fashionProducts, webFashionProducts, foodsProducts);
    if (
      fashionProducts.length > 0 &&
      webFashionProducts.length > 0 &&
      foodsProducts.length > 0
    ) {
      setIsLoading(false);
    }
  }, [fashionProducts, webFashionProducts, foodsProducts]);

  //   FILTER
  const [searchValue, setSearchValue] = useState("");
  const [idValue, setidValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // FILTER FASHIONS
  const [storeFilters, setStoreFilters] = useState({
    tokopedia: true,
    shopee: true,
    web: true,
  });
  const handleStoreFilterChange = (store) => {
    setStoreFilters((prevFilters) => ({
      ...prevFilters,
      [store]: !prevFilters[store],
    }));
  };

  // FILTER FOODS
  const [foodsType, setFoodsType] = useState({
    foods: true,
    drinks: true,
  });
  const handleFoodsTypeFilterChange = (type) => {
    setFoodsType((prevFilters) => ({
      ...prevFilters,
      [type]: !prevFilters[type],
    }));
  };

  useEffect(() => {
    if (page === "fashions") {
      setFilteredProducts(
        fashionProducts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            (storeFilters[item.store] || false) &&
            (item._id
              .toString()
              .toLowerCase()
              .includes(idValue.toLowerCase()) ||
              false)
        )
      );
    } else {
      setFilteredProducts(
        foodsProducts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            (foodsType[item.type] || false) &&
            (item._id
              .toString()
              .toLowerCase()
              .includes(idValue.toLowerCase()) ||
              false)
        )
      );
    }
  }, [
    page,
    searchValue,
    idValue,
    storeFilters,
    foodsType,
    foodsProducts,
    fashionProducts,
  ]);

  // POPOVER
  const [showPopover, setShowPopover] = useState("");
  const [popoverType, setPopoverType] = useState("");
  const [dataPopover, setDataPopover] = useState({});
  const togglePopover = ({ param, item, type }) => {
    console.log(param, item, type);
    setPopoverType(type);
    setDataPopover(item);
    setShowPopover(param);
  };

  // DOWNLOAD DATA
  const handleDownload = async () => {
    try {
      const downloadUrl =
        page === "foods"
          ? "http://localhost:3000/api/foods/data/download"
          : "http://localhost:3000/api/products/data/download";
      const response = await axios.get(downloadUrl, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const a = document.createElement("a");
      a.href = url;

      if (page === "foods") {
        a.download = "Food Products Data.xlsx";
      } else {
        a.download = "Fashion Products Data.xlsx";
      }
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      toast.custom((t) => (
        <CustomToast t={t} message="Download successed" type="success" />
      ));
    } catch (error) {
      console.error("Error downloading data:", error);
      toast.custom((t) => (
        <CustomToast t={t} message="Download failed" type="failed" />
      ));
    }
  };

  return (
    <>
      <Toaster />
      <AnimatePresence>
        {/* POPOVER */}
        {page === "fashions" ? (
          <FashionProductPopover
            data={dataPopover}
            togglePopover={togglePopover}
            showPopover={showPopover}
            popoverType={popoverType}
            refetch={() => fetchWebProducts()}
          />
        ) : (
          <FoodsProductPopover
            data={dataPopover}
            togglePopover={togglePopover}
            showPopover={showPopover}
            popoverType={popoverType}
            refetch={() => fetchFoodsProducts()}
          />
        )}

        <div className="w-full pl-12 pr-2 sm:px-20 lg:px-32 pb-20 pt-10 bg-thirdyThin">
          <div>
            {/* FILTER */}
            <div className="h-auto  w-full bg-white rounded-2xl shadow-lg p-7 ">
              <div className="flex flex-col gap-4">
                {/* TOP */}
                <div className="w-full flex flex-col">
                  {/* TOP */}
                  <div className="flex justify-between mb-2 ">
                    {/* TOP */}
                    <div className="flex mb-2 ">
                      <h1 className="text-3xl mb-1 drop-shadow-sm h-full font-semibold text-primaryNormal">
                        Filter
                      </h1>
                    </div>
                  </div>

                  <div className="flex w-full gap-3">
                    <div className="w-full">
                      {/* MIDDLE */}
                      <div className="flex flex-col sm:flex-row gap-3 w-full mb-2 justify-between">
                        {/* STORE */}
                        {page === "fashions" && (
                          <div className="flex gap-5 items-center sm:w-auto w-full justify-center capitalize">
                            {Object.keys(storeFilters).map((store) => (
                              <div className="flex items-center" key={store}>
                                <input
                                  id={`store-checkbox-${store}`}
                                  type="checkbox"
                                  checked={storeFilters[store]}
                                  onChange={() =>
                                    handleStoreFilterChange(store)
                                  }
                                  className="w-4 h-4 text-secondary "
                                />
                                <label
                                  htmlFor={`store-checkbox-${store}`}
                                  className="ms-2 text-sm font-medium text-gray-600"
                                >
                                  {store}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* FOODS / DRINKS */}
                        {page === "foods" && (
                          <div className="flex gap-5 items-center sm:w-auto w-full justify-center capitalize">
                            {Object.keys(foodsType).map((type) => (
                              <div className="flex items-center" key={type}>
                                <input
                                  id={`store-checkbox-${type}`}
                                  type="checkbox"
                                  checked={foodsType[type]}
                                  onChange={() =>
                                    handleFoodsTypeFilterChange(type)
                                  }
                                  className="w-4 h-4 text-secondary "
                                />
                                <label
                                  htmlFor={`store-checkbox-${type}`}
                                  className="ms-2 text-sm font-medium text-gray-600"
                                >
                                  {type}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="w-full flex gap-2">
                        {/* SEARCH */}
                        <div className="flex flex-col sm:flex-row w-full gap-2">
                          {/* SEARCH BY NAME*/}
                          <div className="relative shadow-sm w-full">
                            <div className="absolute  w-auto inset-y-0 left-0 bottom-1 flex items-center jus pl-3 pointer-events-none">
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                            <input
                              type="text"
                              className="block w-full placeholder:text-gray-600 bg-[#F6FAF2] focus:outline-white p-3 pl-10 text-[0.7rem] sm:text-sm text-gray-600 border rounded-lg "
                              placeholder="Search by name..."
                              value={searchValue}
                              onChange={(e) => setSearchValue(e.target.value)}
                            />
                          </div>

                          {/* SEARCH BY ID*/}
                          <div className="relative shadow-sm w-full">
                            <div className="absolute  w-auto inset-y-0 left-0 bottom-1 flex items-center jus pl-3 pointer-events-none">
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                            <input
                              type="text"
                              className="block w-full placeholder:text-gray-600 bg-[#F6FAF2] focus:outline-white p-3 pl-10 text-[0.7rem] sm:text-sm text-gray-600 border rounded-lg "
                              placeholder="Search by ID..."
                              value={idValue}
                              onChange={(e) => setidValue(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="w-[6rem] sm:hidden">
                          <button
                            onClick={() =>
                              togglePopover({
                                param: "add",
                                item: null,
                                type:
                                  page === "fashions" ? "fashions" : "foods",
                              })
                            }
                            className={`bg-secondary hover:bg-transparent hover:text-secondary text-white ml-auto h-[6rem] xl:h-[5rem] border-2 border-secondary  hover:scale-[1.05] hover:drop-shadow-lg transition-all duration-300  font-bold p-2 rounded-2xl aspect-square justify-center flex items-center`}
                          >
                            <i className="fa-solid fa-plus fa-lg"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* RIGHT */}
                    <div className="w-[6rem] max-sm:hidden">
                      <button
                        onClick={handleDownload}
                        className={`bg-green-500 hover:bg-transparent hover:text-green-500 text-white ml-auto h-[5rem] border-2 border-green-500  hover:scale-[1.05] hover:drop-shadow-lg transition-all duration-300  font-bold p-2 rounded-2xl aspect-square justify-center flex items-center`}
                      >
                        <i className="fa-solid fa-file-arrow-down fa-lg"></i>
                      </button>
                    </div>
                    {/* RIGHT */}
                    <div className="w-[6rem] max-sm:hidden">
                      <button
                        onClick={() =>
                          togglePopover({
                            param: "add",
                            item: null,
                            type: page === "fashions" ? "fashions" : "foods",
                          })
                        }
                        className={`bg-secondary hover:bg-transparent hover:text-secondary text-white ml-auto h-[5rem] border-2 border-secondary  hover:scale-[1.05] hover:drop-shadow-lg transition-all duration-300  font-bold p-2 rounded-2xl aspect-square justify-center flex items-center`}
                      >
                        <i className="fa-solid fa-plus fa-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* BOTTOM */}
                <div className="w-full flex max-sm:flex-col items-center gap-2">
                  <button
                    onClick={() => setPage("foods")}
                    className={`relative w-[100%] h-[10rem] rounded-2xl overflow-hidden group flex items-center justify-center drop-shadow-sm`}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl6SzfGl7TUhR-NEd2sL_rwbaBq-7dRG2Cxg&usqp=CAU"
                      className={`absolute w-full z-[0] h-full object-cover  transition-all duration-700  ${
                        page === "foods"
                          ? "scale-[1.2] rotate-3 group-hover:scale-[1] group-hover:rotate-0"
                          : "group-hover:scale-[1.2] group-hover:rotate-3"
                      }`}
                      alt="LandingFashion"
                    />
                    <div
                      className={`absolute   ${
                        page === "foods"
                          ? "opacity-[0.7] bg-[rgba(255,255,255,0.2)]"
                          : "group-hover:opacity-[0.7] bg-[rgba(0,0,0,0.7)] group-hover:bg-[rgba(255,255,255,0.2)]"
                      } w-full h-full z-[1]  transition-all duration-300`}
                    ></div>
                    <h1
                      className={`text-3xl z-[2] relative text-white font-medium ${
                        page === "foods"
                          ? "scale-[1.05] group-hover:scale-[1]"
                          : "group-hover:scale-[1.05]"
                      } transition-all duration-300`}
                    >
                      Foods
                    </h1>
                  </button>
                  <button
                    onClick={() => setPage("fashions")}
                    className={`relative w-[100%] h-[10rem] rounded-2xl overflow-hidden group flex items-center justify-center drop-shadow-sm`}
                  >
                    <img
                      src="https://img.freepik.com/premium-photo/group-young-beautiful-muslim-women-fashionable-dress-with-hijab-using-mobile-phone-while-taking-selfie-picture-front-black-chalkboard-representing-modern-islam-fashion-technology-ramad_530697-51545.jpg"
                      className={`absolute w-full z-[0] h-full object-cover  transition-all duration-700  ${
                        page === "fashions"
                          ? "scale-[1.2] rotate-3 group-hover:scale-[1] group-hover:rotate-0"
                          : "group-hover:scale-[1.2] group-hover:rotate-3"
                      }`}
                      alt="LandingFashion"
                    />
                    <div
                      className={`absolute   ${
                        page === "fashions"
                          ? "opacity-[0.7] bg-[rgba(255,255,255,0.2)]"
                          : "group-hover:opacity-[0.7] bg-[rgba(0,0,0,0.7)] group-hover:bg-[rgba(255,255,255,0.2)]"
                      } w-full h-full z-[1]  transition-all duration-300`}
                    ></div>
                    <h1
                      className={`text-3xl z-[2] relative text-white font-medium ${
                        page === "fashions"
                          ? "scale-[1.05] group-hover:scale-[1]"
                          : "group-hover:scale-[1.05]"
                      } transition-all duration-300`}
                    >
                      Fashions
                    </h1>
                  </button>
                </div>
              </div>
            </div>

            {/* TITTLE */}
            <Title title={"Fashions"} />

            {/* FASHIONS PROFDUCTS */}
            {page === "fashions" && (
              <div className="w-full  text-base sm:text-lg  h-auto mb-10">
                {/* HEAD */}
                <div className="w-full rounded-2xl bg-secondary font-semibold flex items-center text-sm sm:text-lg shadow-lg px-3">
                  <h1 className="text-center text-white w-[35%] sm:w-[20%] py-6">
                    Image
                  </h1>
                  <h1 className="text-center text-white w-[60%] sm:w-[45%] py-6 ">
                    Name & Product ID
                  </h1>
                  <h1 className="text-center text-white py-6 max-sm:hidden w-[25%] sm:block hidden">
                    Variant
                  </h1>
                  <h1 className="text-center text-white w-[10%] sm:w-[10%] py-6">
                    <i className="fa-solid fa-store"></i>
                  </h1>
                </div>

                {isLoading &&
                  [...Array(10)].map((i) => (
                    <div
                      key={i}
                      className={`cursor-pointer group hover:shadow-xl hover:inset-0 transition-all duration-300 rounded-2xl  w-full relative  bg-white text-gray-600 text-[0.7rem] leading-5 sm:leading-normal md:text-base shadow-md border-b-2 inset-[0.2rem] mt-2 p-3`}
                    >
                      <div className="flex items-center z-[10] relative">
                        <h1 className="flex items-center justify-center  sm:w-[20%] aspect-square w-[35%]">
                          <div className="bg-gray-400 rounded-2xl animate-pulse w-full h-full aspect-square"></div>
                        </h1>
                        <h1 className="items-center flex flex-col gap-2 w-[65%] sm:w-[45%] py-6 break-all ">
                          <div className="bg-gray-400 rounded-2xl animate-pulse h-3 w-[40%]"></div>
                          <div className="bg-gray-400 rounded-2xl animate-pulse h-3 w-[50%]"></div>
                          <div className="bg-gray-400 rounded-2xl animate-pulse h-3 w-[40%]"></div>
                        </h1>
                        <h1 className="max-sm:hidden w-[25%] py-6 gap-2 flex flex-col items-center">
                          <div className="bg-gray-400 rounded-2xl animate-pulse h-3 w-[15%]"></div>
                          <div className="bg-gray-400 rounded-2xl animate-pulse h-3 w-[50%]"></div>
                          <div className="bg-gray-400 rounded-2xl animate-pulse h-3 w-[50%]"></div>
                        </h1>
                        <h1 className="flex items-center justify-center  w-[10%] sm:w-[10%] py-6">
                          {" "}
                          <div className="bg-gray-400 rounded-full animate-pulse h-7 w-7"></div>
                        </h1>
                      </div>
                    </div>
                  ))}
                <div>
                  {filteredProducts.map((item, i) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      key={item.id}
                      className="my-2"
                    >
                      <FashionProductSection
                        number={i + 1}
                        data={item}
                        handlePopover={togglePopover}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* FOODS PRODUCTS */}
            {page === "foods" && (
              <div className="w-full  text-base sm:text-lg  h-auto mb-10">
                {/* HEAD */}
                <div className="w-full rounded-2xl bg-secondary font-semibold flex items-center text-sm sm:text-lg shadow-md">
                  <h1 className="text-center text-white w-[35%] sm:w-[20%] py-6">
                    Image
                  </h1>
                  <h1 className="text-center text-white w-[65%] sm:w-[45%] py-6 ">
                    Name & ID Product
                  </h1>
                  <h1 className="text-center text-white py-6 w-[10%] sm:block hidden">
                    Stock
                  </h1>
                  <h1 className="text-center text-white py-6 sm:block hidden w-[25%]">
                    Price
                  </h1>
                </div>

                <div>
                  {filteredProducts.map((item, i) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      key={item.id}
                      className="my-2"
                    >
                      <FoodsProductSection
                        number={i + 1}
                        data={item}
                        handlePopover={togglePopover}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatePresence>
    </>
  );
}

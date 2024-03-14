/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FashionProductSection from "../../components/ProductController/FashionProductSection";
import FashionProductPopover from "../../components/ProductController/FashionProductPopover";
import axios from "axios";
import FoodsProductSection from "../../components/ProductController/FoodsProductSection";
import FoodsProductPopover from "../../components/ProductController/FoodsProductPopover";
import { AnimatePresence, motion } from "framer-motion";
import Title from "../../components/Title";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import Button from "../../components/Button";
import Title2 from "../../components/Title2";
import FashionProductSectionSkeleton from "../../components/ProductController/FashionProductSectionSkeleton";
import SearchBar from "../../components/SearchBar";
import ChangePageButton from "../../components/ChangePageButton";
import FashionHeadSection from "../../components/ProductController/FashionHeadSection";
import FoodHeadSection from "../../components/ProductController/FoodsHeadSection";
import Checkbox from "../../components/Checkbox";
import Empty from "../../components/Empty";

export default function ProductControl() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;

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
      .get(DBURL + "/products/")
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
      .get(DBURL + "/foods")
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
      const BEURL =
        page === "foods"
          ? DBURL + "/foods/data/download"
          : DBURL + "/products/data/download";
      // Making a GET request to download the file
      const response = await axios.get(BEURL, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      // Creating a blob URL from the response data
      const downloadUrl = response.data.fileUrl;

      // Creating an <a> element to trigger the download
      const a = document.createElement("a");
      a.href = downloadUrl;

      // Setting the file name for download

      const fileName =
        page === "foods" ? "FoodsProducts.xlsx" : "FashionProducts.xlsx";
      console.log("LINK", response);
      a.download = fileName;

      // Appending the <a> element to the document body, triggering the download, and removing the element
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.custom((t) => (
        <CustomToast t={t} message="Download succeed" type="success" />
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

        <div className="w-full  pb-20 pt-10 ">
          {/* FILTER */}
          <div className="h-auto  w-full bg-section-rainbow flex flex-col rounded-2xl shadow-lg p-7 ">
            {/* TOP */}
            <Title2 title={"Filter"} />

            <div className="flex flex-col w-full gap-3 mb-3">
              <div className="flex flex-col sm:flex-row w-full gap-2 max-sm:gap-4">
                {/* STORE */}
                {page === "fashions" && (
                  <div className="flex flex-row gap-2 w-full">
                    {Object.keys(storeFilters).map((store) => {
                      return (
                        <Button
                          key={store}
                          onClick={() => handleStoreFilterChange(store)}
                          variant={
                            storeFilters[store] ? "secondary" : "transparent"
                          }
                          className={
                            "capitalize max-sm:rounded-xl h-12 sm:rounded-xl"
                          }
                        >
                          {store === "shopee" ? (
                            <img
                              src="/Shopee.png"
                              className={`w-6 mr-2 ${
                                !storeFilters[store]
                                  ? "bg-secondary"
                                  : "bg-white"
                              } rounded-full p-1 scale-[1.2]`}
                              alt=""
                            />
                          ) : store === "tokopedia" ? (
                            <img
                              src="/Tokopedia.png"
                              className={`w-6 mr-2  rounded-full p-1 scale-[1.2] ${
                                !storeFilters[store]
                                  ? "bg-secondary"
                                  : "bg-white"
                              }  `}
                              alt=""
                            />
                          ) : (
                            <div
                              className={`aspect-square mr-2 ${
                                !storeFilters[store]
                                  ? "bg-secondary text-white"
                                  : "bg-white text-secondary"
                              } rounded-full p-1 flex items-center justify-center `}
                            >
                              <i
                                className={` scale-[0.8]  fa-solid fa-store fa-lg`}
                              ></i>
                            </div>
                          )}
                          {store}
                        </Button>
                      );
                    })}
                  </div>
                )}

                {/* FOODS / DRINKS */}
                {page === "foods" && (
                  <div className="flex flex-row gap-2 w-full">
                    {Object.keys(foodsType).map((type) => (
                      <Button
                        key={type}
                        onClick={() => handleFoodsTypeFilterChange(type)}
                        variant={foodsType[type] ? "secondary" : "transparent"}
                        className={
                          "capitalize max-sm:rounded-xl h-12 sm:rounded-xl"
                        }
                      >
                        {type === "drinks" ? (
                          <div
                            className={`aspect-square mr-2 ${
                              !foodsType[type]
                                ? "bg-secondary text-white"
                                : "bg-white text-secondary"
                            } rounded-full p-1 flex items-center justify-center `}
                          >
                            <i
                              className={`   fa-solid fa-mug-saucer scale-[0.8] fa-lg`}
                            ></i>
                          </div>
                        ) : (
                          <div
                            className={`aspect-square mr-2 ${
                              !foodsType[type]
                                ? "bg-secondary text-white"
                                : "bg-white text-secondary"
                            } rounded-full p-1 flex items-center justify-center `}
                          >
                            <i
                              className={`   fa-solid fa-bowl-food scale-[0.8] fa-lg`}
                            ></i>
                          </div>
                        )}
                        {type}
                      </Button>
                    ))}
                  </div>
                )}
                {/* RIGHT */}
                <div className="flex max-sm:flex-col gap-1 ">
                  <Button
                    variant="green"
                    className={"max-sm:min-w-[3rem]"}
                    onClick={handleDownload}
                  >
                    <i className="fa-solid fa-file-arrow-down mr-2"></i>
                    <span className="max-sm:hidden">Download</span>
                  </Button>
                  <Button
                    variant="secondary"
                    className={"max-sm:min-w-[3rem]"}
                    onClick={() =>
                      togglePopover({
                        param: "add",
                        item: null,
                        type: page === "fashions" ? "fashions" : "foods",
                      })
                    }
                  >
                    <i className="fa-solid fa-plus mr-2"></i>
                    <span className="max-sm:hidden">Add</span>
                  </Button>
                </div>
              </div>

              <div className="w-full flex gap-2">
                {/* SEARCH */}
                {/* SEARCH BY NAME*/}
                <SearchBar
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  placeholder="Search by name..."
                />

                {/* SEARCH BY ID*/}
                <SearchBar
                  onChange={(e) => setidValue(e.target.value)}
                  value={idValue}
                  placeholder="Search by ID..."
                />
              </div>
            </div>

            {/* BOTTOM */}
            <div className="w-full flex max-sm:flex-col items-center gap-2">
              <ChangePageButton
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl6SzfGl7TUhR-NEd2sL_rwbaBq-7dRG2Cxg&usqp=CAU"
                setPage={() => setPage("foods")}
                height={"10rem"}
                page={page}
                text={"foods"}
              />
              <ChangePageButton
                image="https://img.freepik.com/premium-photo/group-young-beautiful-muslim-women-fashionable-dress-with-hijab-using-mobile-phone-while-taking-selfie-picture-front-black-chalkboard-representing-modern-islam-fashion-technology-ramad_530697-51545.jpg"
                setPage={() => setPage("fashions")}
                height={"10rem"}
                page={page}
                text={"fashions"}
              />
            </div>
          </div>

          {/* TITTLE */}
          <Title title={"Fashions"} />

          {filteredProducts?.length > 0 ? (
            <>
              <div className="w-full min-h-screen text-base sm:text-lg  h-auto mb-10">
                {/* FASHIONS PROFDUCTS */}
                {page === "fashions" && (
                  <>
                    {/* HEAD */}
                    <FashionHeadSection />
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
                  </>
                )}

                {/* FOODS PRODUCTS */}
                {page === "foods" && (
                  <>
                    {/* HEAD */}
                    <FoodHeadSection />
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
                  </>
                )}
              </div>
            </>
          ) : filteredProducts?.length === 0 && isLoading ? (
            <>
              {[...Array(10)].map((i) => (
                <>
                  <FashionProductSectionSkeleton />
                </>
              ))}
            </>
          ) : (
            <Empty />
          )}
        </div>
      </AnimatePresence>
    </>
  );
}

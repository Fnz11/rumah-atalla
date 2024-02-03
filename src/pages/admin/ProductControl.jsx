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
import Button from "../../components/Button";
import Title2 from "../../components/Title2";
import FashionProductSectionSkeleton from "../../components/ProductController/FashionProductSectionSkeleton";
import SearchBar from "../../components/SearchBar";
import ChangePageButton from "../../components/ChangePageButton";
import FashionHeadSection from "../../components/ProductController/FashionHeadSection";
import FoodHeadSection from "../../components/ProductController/FoodsHeadSection";
import Checkbox from "../../components/Checkbox";

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
          {/* FILTER */}
          <div className="h-auto  w-full bg-white flex flex-col rounded-2xl shadow-lg p-7 ">
            {/* TOP */}
            <Title2 title={"Filter"} />

            <div className="flex flex-col w-full gap-3 mb-3">
              {/* STORE */}
              {page === "fashions" && (
                <div className="flex gap-5 items-center sm:w-full w-full justify-between capitalize">
                  {Object.keys(storeFilters).map((store) => (
                    <Checkbox
                      key={store}
                      checked={storeFilters[store]}
                      onChange={() => handleStoreFilterChange(store)}
                      id={"store-checkbox-" + store}
                      name={store}
                    />
                  ))}
                </div>
              )}

              {/* FOODS / DRINKS */}
              {page === "foods" && (
                <div className="flex gap-5 items-center sm:w-full w-full justify-between capitalize">
                  {Object.keys(foodsType).map((type) => (
                    <Checkbox
                      key={type}
                      checked={foodsType[type]}
                      onChange={() => handleFoodsTypeFilterChange(type)}
                      id={"type-checkbox-" + type}
                      name={type}
                    />
                  ))}
                </div>
              )}

              <div className="w-full flex gap-2">
                {/* SEARCH */}
                <div className="flex flex-col sm:flex-row w-full gap-2 max-sm:gap-4">
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

                {/* RIGHT */}
                <div className="flex max-sm:flex-col gap-1 ">
                  <Button
                    className="min-w-[2rem] w-[3rem] scale-[0.95] max-sm:-mt-1"
                    variant={"green"}
                    onClick={() => handleDownload()}
                  >
                    <i className="fa-solid fa-file-arrow-down fa-lg"></i>
                  </Button>
                  <Button
                    className="min-w-[2rem] w-[3rem] scale-[0.95] pl-[0.9rem]"
                    onClick={() =>
                      togglePopover({
                        param: "add",
                        item: null,
                        type: page === "fashions" ? "fashions" : "foods",
                      })
                    }
                  >
                    <i className="fa-solid fa-plus fa-lg"></i>
                  </Button>
                </div>
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

          {/* FASHIONS PROFDUCTS */}
          {page === "fashions" && (
            <div className="w-full  text-base sm:text-lg  h-auto mb-10">
              {/* HEAD */}
              <FashionHeadSection />

              {isLoading &&
                [...Array(10)].map((i) => (
                  <>
                    <FashionProductSectionSkeleton />
                  </>
                ))}
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
          )}

          {/* FOODS PRODUCTS */}
          {page === "foods" && (
            <div className="w-full  text-base sm:text-lg  h-auto mb-10">
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
            </div>
          )}
        </div>
      </AnimatePresence>
    </>
  );
}
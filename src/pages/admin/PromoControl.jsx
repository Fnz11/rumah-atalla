/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PromoSection from "../../components/Promo/PromoSection";
import PromoPopover from "../../components/Promo/PromoPopover";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Title from "../../components/Title";
import Title2 from "../../components/Title2";
import PromoSectionSkeleton from "../../components/Promo/PromoSectionSkeleton";
import Button from "../../components/Button";
import ChangePageButton from "../../components/ChangePageButton";
import SearchBar from "../../components/SearchBar";
import Checkbox from "../../components/Checkbox";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import Empty from "../../components/Empty";

export default function PromoControl() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;
  console.log(DBURL + "/promos/");

  // OWNER
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("user")).role;
  useEffect(() => {
    if (userRole !== "owner") {
      navigate("/admin/account");
    }
  }, [userRole]);

  // PAGE
  const [page, setPage] = useState("fashions");

  // FETCH
  const [Promos, setPromos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchPromos = async () => {
    await axios
      .get(DBURL + "/promos/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPromos(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchPromos();
  }, []);

  //   FILTER
  const [searchValue, setSearchValue] = useState("");
  const [filteredFashionPromos, setFilteredFashionPromos] = useState([]);
  const [filteredFoodPromos, setFilteredFoodPromos] = useState([]);
  const [typeFilters, setTypeFilters] = useState({
    "diskon persentase": true,
    "cashback persentase": true,
    "cashback nominal": true,
    "diskon nominal": true,
  });
  const handleTypeFilterChange = (type) => {
    setTypeFilters((prevFilters) => ({
      ...prevFilters,
      [type]: !prevFilters[type],
    }));
  };

  useEffect(() => {
    if (page === "fashions") {
      setFilteredFashionPromos(
        Promos.filter(
          (item) =>
            item.for == "fashions" &&
            item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            (typeFilters[item.type] || false)
        )
      );
    } else {
      setFilteredFoodPromos(
        Promos.filter(
          (item) =>
            item.for == "foods" &&
            item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            (typeFilters[item.type] || false)
        )
      );
    }
  }, [page, searchValue, typeFilters, Promos]);

  // POPOVER
  const [showPopover, setShowPopover] = useState("");
  const [popoverData, setPopoverData] = useState(null);
  const [popoverType, setPopoverType] = useState("");
  const togglePopover = ({ param, item, type }) => {
    setPopoverType(type);
    setShowPopover(param);
    setPopoverData(item);
  };

  // DOWNLOAD DATA
  const handleDownload = async () => {
    try {
      const BEURL =
        page === "foods"
          ? DBURL + "/promos/foods/download"
          : DBURL + "/promos/fashions/download";
      // Making a GET request to download the file
      const response = await axios.get(BEURL, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      // Creating a blob URL from the response data
      const downloadUrl = response.data.fileUrl;

      const a = document.createElement("a");
      a.href = downloadUrl;

      const fileName =
        page === "foods" ? "FoodsPromos.xlsx" : "FashionsPromos.xlsx";

      a.download = fileName;
      console.log("LINK", response);
      // Appending the <a> element to the document body, triggering the download, and removing the element
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.custom((t) => (
        <CustomToast t={t} message="Download succeed" type="success" />
      ));
    } catch (error) {
      toast.custom((t) => (
        <CustomToast t={t} message="Download failed" type="failed" />
      ));
      console.error("Error downloading data:", error);
    }
  };

  return (
    <>
      {/* POPOVER */}
      <PromoPopover
        data={popoverData}
        type={popoverType}
        togglePopover={togglePopover}
        showPopover={showPopover}
        refetch={fetchPromos}
      />

      <div className="w-full  pb-20 pt-10 bg-transparent">
        {/* FILTER */}
        <div className="h-auto  w-full bg-section-rainbow rounded-2xl shadow-lg p-7 ">
          {/* TOP */}
          <Title2 title={"Filter"} />

          <div className="flex flex-col w-full mb-2">
            {/* TYPE */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 sm:w-auto w-full justify-center capitalize pb-3">
              {Object.keys(typeFilters).map((type) => (
                <Button
                  key={type}
                  onClick={() => handleTypeFilterChange(type)}
                  variant={typeFilters[type] ? "secondary" : "transparent"}
                  className={"capitalize max-sm:rounded-xl h-12 sm:rounded-xl"}
                >
                  {type}
                  {type === "diskon persentase" ||
                  type === "cashback persentase"
                    ? " (%)"
                    : " (Rp)"}
                </Button>
              ))}
            </div>

            {/* SEARCH */}
            <div className="flex w-full gap-2">
              {/* SEARCH BY NAME*/}
              <SearchBar
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                placeholder="Search by name..."
              />
              {/* DOWNLOAD  */}
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
        <Title title={page === "fasions" ? "Fashions" : "Foods"} />

        {/* PROMOS */}
        <div className="rounded-2xl w-full text-base sm:text-lg h-auto mb-10">
          {/* HEAD */}
          <div className="w-full  bg-secondary relative inset-[0.2rem] font-semibold flex items-center text-sm sm:text-lg shadow-lg rounded-2xl">
            <h1 className="text-center text-white w-[35%] sm:w-[10%] py-6 ">
              Image
            </h1>
            <h1 className="text-center text-white w-[65%] sm:w-[45%] py-6 ">
              Nama
            </h1>
            <h1 className="text-center text-white py-6 w-[45%] max-sm:hidden">
              Tipe
            </h1>
          </div>
          <AnimatePresence>
            {filteredFashionPromos?.length > 0 ? (
              <div className="w-full min-h-screen">
                {page === "fashions" ? (
                  <>
                    {filteredFashionPromos.map((item) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        key={item.id}
                        className="my-2"
                      >
                        <PromoSection
                          item={item}
                          handlePopover={togglePopover}
                          type={"fashions"}
                        />
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <>
                    {filteredFoodPromos.map((item) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        key={item.id}
                        className="my-2"
                      >
                        <PromoSection
                          item={item}
                          handlePopover={togglePopover}
                          type={"foods"}
                        />
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            ) : filteredFashionPromos?.length === 0 && isLoading ? (
              <>
                {[...Array(10)].map((i) => (
                  <>
                    <PromoSectionSkeleton />
                  </>
                ))}
              </>
            ) : (
              <Empty />
            )}
          </AnimatePresence>

          <div></div>
        </div>
      </div>
    </>
  );
}

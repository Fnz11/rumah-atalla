/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PromoSection from "../../components/Promo/PromoSection";
import PromoPopover from "../../components/Promo/PromoPopover";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Title from "../../components/Title";

export default function PromoControl() {
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
      .get("http://localhost:3000/api/promos/", {
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
      const downloadUrl =
        page === "foods"
          ? "http://localhost:3000/api/promos/foods/download"
          : "http://localhost:3000/api/promos/fashions/download";
      const response = await axios.get(downloadUrl, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const a = document.createElement("a");
      a.href = url;

      if (page === "foods") {
        a.download = "Food Promos.xlsx";
      } else {
        a.download = "Fashion Promos.xlsx";
      }
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
    } catch (error) {
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

      <div className="w-full pl-12 pr-2 sm:px-20 lg:px-32 pb-20 pt-10 bg-thirdyThin">
        <div>
          {/* FILTER */}
          <div className="h-auto  w-full bg-white rounded-2xl shadow-lg p-7 ">
            <div className="flex flex-col gap-4">
              {/* TOP */}
              <div className="w-full">
                {/* TOP */}
                <div className="flex mb-2 ">
                  <h1 className="text-3xl mb-1 drop-shadow-sm h-full font-semibold text-primaryNormal">
                    Filter
                  </h1>
                </div>

                <div className="flex w-full gap-3">
                  {/* LEFT */}
                  <div className="w-full">
                    {/* MIDDLE */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full mb-2 justify-between">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 sm:w-auto w-full justify-center capitalize">
                        {Object.keys(typeFilters).map((type) => (
                          <div className="flex items-center" key={type}>
                            <input
                              id={`store-checkbox-${type}`}
                              type="checkbox"
                              checked={typeFilters[type]}
                              onChange={() => handleTypeFilterChange(type)}
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
                    </div>

                    {/* SEARCH */}
                    <div className="flex w-full gap-2">
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
                      <button
                        onClick={() =>
                          togglePopover({
                            param: "add",
                            item: null,
                            type: page === "fashions" ? "fashions" : "foods",
                          })
                        }
                        className={`bg-secondary sm:hidden hover:bg-transparent hover:text-secondary text-white ml-auto h-full border-2 border-secondary  hover:scale-[1.05] hover:drop-shadow-lg transition-all duration-300  font-bold p-[0.7rem] rounded-lg aspect-square justify-center flex items-center`}
                      >
                        <i className="fa-solid fa-plus fa-lg"></i>
                      </button>
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
                  <div className="w-[5rem] max-sm:hidden">
                    <button
                      onClick={() =>
                        togglePopover({
                          param: "add",
                          item: null,
                          type: page === "fashions" ? "fashions" : "foods",
                        })
                      }
                      className={`bg-secondary hover:bg-transparent hover:text-secondary text-white ml-auto h-[6rem] xl:h-[5rem] border-2 border-secondary  hover:scale-[1.05] hover:drop-shadow-lg transition-all duration-300  font-bold p-2 rounded-2xl aspect-square justify-center flex items-center`}
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
            {isLoading &&
              [...Array(10)].map((i) => (
                <>
                  <div className="my-2 opacity-[0.5] cursor-pointer w-full relative bg-white animate-pulse p-2 shadow-sm border-b-2 inset-[0.2rem]">
                    <div className="w-full bg-thirdyNormal shadow-md z-[0] opacity-0 transition-all duration-100 -m-2 absolute h-full "></div>
                    <div className="flex items-center z-[10] relative w-full">
                      <h1 className="text-center w-[10%] ">
                        <div
                          className="bg-gray-400 rounded-2xl w-full aspect-square animate-pulse"
                          alt=""
                        />
                      </h1>
                      <h1 className="items-center justify-center flex flex-col w-[45%] gap-2">
                        <div className="font-semibold w-[13rem] bg-gray-400 rounded-2xl h-3 animate-pulse"></div>
                        <div className="font-semibold w-[8rem] bg-gray-400 rounded-2xl h-3 animate-pulse"></div>
                        <div className="font-semibold w-[9rem] bg-gray-400 rounded-2xl h-3 animate-pulse"></div>
                      </h1>
                      <h1 className="items-center justify-center flex flex-col gap-2 w-[45%] font-semibold">
                        <div className="font-semibold w-[9rem] bg-gray-400 rounded-2xl h-3 animate-pulse"></div>
                        <div className="font-semibold w-[5rem] bg-gray-400 rounded-2xl h-3 animate-pulse"></div>
                      </h1>
                    </div>
                  </div>
                </>
              ))}
            <AnimatePresence>
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
            </AnimatePresence>

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

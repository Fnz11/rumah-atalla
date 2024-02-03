/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import UserControllerSection from "../../components/UserController/UserControllerSection";
import UserControllerPopover from "../../components/UserController/UserControllerPopover";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Button from "../../components/Button";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import Title from "../../components/Title";
import UserControllerSectionSkeleton from "../../components/UserController/UserControllerSectionSkeleton";
import Title2 from "../../components/Title2";

export default function UserControl() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;

  // OWNER
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("user")).role;
  useEffect(() => {
    if (userRole !== "owner") {
      navigate("/admin/account");
    }
  }, [userRole]);

  // FETCH
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const fetchUser = async () => {
    await axios
      .get(DBURL + "/users/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  //   FILTER
  const [searchValue, setSearchValue] = useState("");
  // const [filteredUsers, setFilteredUsers] = useState([]);
  const filteredUsers = userData.filter((item) =>
    item.username.toLowerCase().includes(searchValue.toLowerCase())
  );

  // POPOVER
  const [showPopover, setShowPopover] = useState("");
  const [dataPopover, setDataPopover] = useState({});
  const togglePopover = ({ param, item }) => {
    setDataPopover(item);
    setShowPopover(param);
  };

  // CHART
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    function groupDataByDateRange(data) {
      const groupedData = data.reduce((result, item) => {
        if (!result[item.username]) {
          result[item.username] = {
            Pending: item?.transactions?.pending,
            Successed: item?.transactions?.successed,
            Canceled: item?.transactions?.canceled,
            Total:
              item?.transactions?.pending +
              item?.transactions?.successed +
              item?.transactions?.canceled,
          };
        }
        // if (!result[dateRange]) {
        //   result[dateRange] = {
        //     transaction: [],
        //     Pending: 0,
        //     Successed: 0,
        //     Canceled: 0,
        //     Total: 0,
        //   };
        // }
        // result[dateRange].transaction.push(item);
        return result;
      }, {});
      return groupedData;
    }

    const groupedByWeek = groupDataByDateRange(userData);
    const chartDataValues = Object.entries(groupedByWeek)?.map(
      ([dateRange, data]) => ({
        date: dateRange,
        ...data,
      })
    );

    setChartData(chartDataValues);
  }, [userData]);
  useEffect(() => {
    console.log("CHART DATA", chartData);
  }, [chartData]);

  // DOWNLOAD DATA
  const handleDownload = async () => {
    try {
      const response = await axios.get(DBURL + "/users/data/download/", {
        responseType: "blob",
      });

      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const a = document.createElement("a");
      a.href = url;
      a.download = "Users Data.xlsx";
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
      <UserControllerPopover
        data={dataPopover}
        togglePopover={togglePopover}
        showPopover={showPopover}
        refetch={() => fetchUser()}
      />

      <div className="w-full pl-12 pr-2 sm:px-20 lg:px-32 pb-20 pt-10 bg-thirdyThin">
        <div>
          {/* CHART */}
          <div className="w-full h-auto bg-white rounded-2xl shadow-lg p-7 mb-10">
            {/* TOP */}
            <Title2 title="Chart" />

            {/* CHART */}
            <ResponsiveContainer
              width="100%"
              height={300}
              className="drop-shadow-sm w-full flex items-center justify-center text-sm"
            >
              <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  content={({ payload, label }) => {
                    const total = payload.reduce(
                      (accumulator, { value }) => accumulator + value,
                      0
                    );

                    // Menghitung jumlah pending, successed, dan canceled
                    const pending =
                      payload.find((item) => item.dataKey === "Pending")
                        ?.value || 0;
                    const successed =
                      payload.find((item) => item.dataKey === "Successed")
                        ?.value || 0;
                    const canceled =
                      payload.find((item) => item.dataKey === "Canceled")
                        ?.value || 0;

                    return (
                      <div className="bg-section-dark font-semibold py-9 px-9 rounded-2xl drop-shadow-md text-white flex flex-col gap-2 text-sm">
                        <p className="flex items-center gap-2">
                          <i className="fa-solid fa-user mb-1 fa-lg scale-[0.9]"></i>
                          {label}
                        </p>
                        <p className="text-yellow-400 flex items-center gap-2">
                          <i className="fa-solid fa-clock mb-1 fa-lg "></i>
                          Pending: {pending}
                        </p>
                        <p className="text-green-400 flex items-center gap-2">
                          <i className="fa-solid fa-circle-check mb-1 fa-lg"></i>
                          Successed: {successed}
                        </p>
                        <p className="text-red-400 flex items-center gap-2">
                          <i className="fa-solid fa-circle-exclamation mb-1 fa-lg"></i>
                          Canceled: {canceled}
                        </p>
                        <p className="mt-2">Total: {total}</p>
                      </div>
                    );
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconSize={10}
                  iconType="square"
                  height={36}
                />
                <Bar dataKey="Pending" fill="rgb(250 204 21)" />
                <Bar dataKey="Successed" fill="rgb(74 222 128)" />
                <Bar dataKey="Canceled" fill="rgb(248 113 113)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* FILTER */}
          <div className="h-auto  w-full bg-white rounded-2xl shadow-lg p-7">
            {/* TOP */}
            <Title2 title="Filter" />
            <div className="flex gap-3">
              {/* SEARCH */}
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
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
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
                onClick={() => setShowPopover("add")}
              >
                <i className="fa-solid fa-plus mr-2"></i>
                <span className="max-sm:hidden">Add</span>
              </Button>
            </div>
          </div>

          {/* TITTLE */}
          <Title title={"User"} />

          {/* TRANSACTIONS */}
          <div className="rounded-2xl  w-full text-base sm:text-lg h-auto ">
            {/* HEAD */}
            <div className="w-full rounded-2xl max-sm:px-3 shadow-lg bg-secondary font-semibold flex items-center text-sm sm:text-lg">
              <h1 className="text-center text-white w-[10%] py-6 ">No</h1>
              <h1 className="text-left text-white w-[50%] py-6 ">Nama</h1>
              <h1 className=" text-white py-6 w-[40%] text-center">
                Transaksi
              </h1>
              {/* <h1 className="text-center text-white w-[15%] py-6">Status</h1> */}
            </div>

            {isLoading &&
              [...Array(10)].map((i) => (
                <>
                  <UserControllerSectionSkeleton />
                </>
              ))}

            {filteredUsers.map((item, i) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                key={item._id}
                className="my-2"
              >
                <UserControllerSection
                  number={i + 1}
                  handlePopover={togglePopover}
                  item={item}
                />
              </motion.div>
            ))}

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

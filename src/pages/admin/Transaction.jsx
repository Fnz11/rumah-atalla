/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FashionTransactionSection from "../../components/Transaction/FashionTransactionSection";
import axios from "axios";
import TransactionPopover from "../../components/Transaction/TransactionPopover";
import FoodTransactionSection from "../../components/Transaction/FoodTransactionSection";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import Button from "../../components/Button";
import Title from "../../components/Title";

export default function Transactions() {
  // OWNER
  const user = JSON.parse(localStorage.getItem("user"));

  const transactions = [
    {
      kasir: "mamaraffi",
      id: 1,
      store: "web",
      buyer: "John Doe",
      products: [
        { productId: "657aba8acb516d87717e8170", qty: 2, price: 10000 },
      ],
      _id: "293R92ND938N2DRNUR000000001",
      qty: 3,
      status: "successed",
      totalAmount: "150000",
    },
    {
      kasir: "mamaraffi",

      id: 2,
      store: "shopee",
      buyer: "Alice Smith",
      products: [
        { productId: "657aba8acb516d87717e8170", qty: 2, price: 10000 },
      ],
      _id: "293R92ND938N2DRNUR000000002",
      qty: 3,
      status: "pending",
      totalAmount: "90000",
    },
    {
      kasir: "mamaraffi",

      id: 3,
      store: "tokopedia",
      buyer: "Bob Johnson",
      products: [
        { productId: "657aba8acb516d87717e8170", qty: 2, price: 10000 },
      ],
      _id: "293R92ND938N2DRNUR000000003",
      qty: 3,
      status: "canceled",
      totalAmount: "210000",
    },
    {
      kasir: "mamaraffi",

      id: 4,
      store: "web",
      buyer: "Eva Brown",
      products: [
        { productId: "657aba8acb516d87717e8170", qty: 2, price: 10000 },
      ],
      _id: "293R92ND938N2DRNUR000000004",
      qty: 3,
      status: "pending",
      totalAmount: "75000",
    },
    {
      kasir: "mamaraffi",

      id: 5,
      store: "shopee",
      buyer: "Michael Davis",
      products: [
        { productId: "657aba8acb516d87717e8170", qty: 2, price: 10000 },
      ],
      _id: "293R92ND938N2DRNUR000000005",
      qty: 3,
      status: "pending",
      totalAmount: "130005",
    },
    {
      kasir: "mamaraffi",

      id: 6,
      store: "tokopedia",
      buyer: "Olivia Wilson",
      products: [
        { productId: "657aba8acb516d87717e8170", qty: 2, price: 10000 },
      ],
      _id: "293R92ND938N2DRNUR000000006",
      qty: 3,
      status: "pending",
      totalAmount: "180000",
    },
    {
      kasir: "mamaraffi",

      id: 7,
      store: "web",
      buyer: "Sophia Martinez",
      products: [
        { productId: "657aba8acb516d87717e8170", qty: 2, price: 10000 },
      ],
      _id: "293R92ND938N2DRNUR000000007",
      qty: 3,
      status: "successed",
      totalAmount: "160005",
    },
    {
      kasir: "mamaraffi",

      id: 8,
      store: "shopee",
      buyer: "William Anderson",
      products: [
        { productId: "657aba8acb516d87717e8170", qty: 2, price: 10000 },
      ],
      _id: "293R92ND938N2DRNUR000000008",
      qty: 3,
      status: "canceled",
      totalAmount: "100005",
    },
    {
      kasir: "mamaraffi",

      id: 9,
      store: "tokopedia",
      buyer: "Emma Garcia",
      products: [
        { productId: "657aba8acb516d87717e8170", qty: 2, price: 10000 },
      ],
      _id: "293R92ND938N2DRNUR000000009",
      qty: 3,
      status: "successed",
      totalAmount: "240000",
    },
    {
      kasir: "mamaraffi",

      id: 10,
      store: "web",
      buyer: "Isabella Thompson",
      products: [
        { productId: "657aba8acb516d87717e8170", qty: 2, price: 10000 },
      ],
      _id: "293R92ND938N2DRNUR000000010",
      qty: 3,
      status: "pending",
      totalAmount: "120000",
    },
  ];

  // PAGE
  const [page, setPage] = useState("fashions");

  // FETCH KASIR
  const [kasir, setKasir] = useState([]);
  const fetchKasir = async () => {
    await axios
      .get("http://localhost:3000/api/users/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        let kasirName = [];
        res.data.map((kasir) => {
          kasirName.push(kasir.username);
        });
        setKasir(kasirName);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchKasir();
  }, []);

  // FETCH PRODUCTS
  const [filteredFashionTransaction, setFilteredFashionTransaction] = useState(
    []
  );

  // FETCH PRODUCT FASHION
  const [allProducts, setAllProducts] = useState([]);
  // WEB
  const [webProductsData, setWebProductsData] = useState([]);
  const fetchWebProducts = async () => {
    await axios
      .get("http://localhost:3000/api/products/")
      .then((res) => {
        setWebProductsData(res.data);
        setAllProducts((prevData) => [...prevData, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchWebProducts();
  }, []);

  // FETCH TRANSACTIONS
  const [transactionsData, setTransactionsData] = useState([...transactions]);
  const [transactionsWeb, setTransactionsWeb] = useState([]);
  const token = localStorage.getItem("token");
  const fetchTransactions = async () => {
    await axios
      .get("http://localhost:3000/api/transactions/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setTransactionsWeb(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // FETCH PROMO
  const [promos, setPromos] = useState([]);
  const fetchPromos = async () => {
    await axios
      .get("http://localhost:3000/api/promos/", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPromos(res.data.filter((item) => item.for === "fashions"));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchPromos();
    fetchTransactions();
  }, []);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    let allTransactions = [...transactions, ...transactionsWeb];
    if (startDate && endDate) {
      allTransactions = allTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        return (
          transactionDate >= new Date(startDate) &&
          transactionDate <= new Date(endDate + "T23:59:59")
        );
      });
    }
    if (user?.role === "admin") {
      setTransactionsData(
        allTransactions.filter((item) => item.kasir === user.username)
      );
    } else {
      setTransactionsData(allTransactions);
    }
  }, [transactionsWeb, startDate, endDate]);

  //   FILTER
  const [selectedKasir, setSelectedKasir] = useState("");

  const handleKasirFilterChange = (selected) => {
    setSelectedKasir(selected);
  };

  const [searchValue, setSearchValue] = useState("");
  const [idValue, setidValue] = useState("");

  const [storeFilters, setStoreFilters] = useState({
    tokopedia: true,
    shopee: true,
    web: true,
  });
  const [statusFilters, setStatusFilters] = useState({
    pending: true,
    successed: true,
    canceled: true,
  });

  const handleStoreFilterChange = (store) => {
    setStoreFilters((prevFilters) => ({
      ...prevFilters,
      [store]: !prevFilters[store],
    }));
  };
  const handleStatusFilterChange = (status) => {
    setStatusFilters((prevFilters) => ({
      ...prevFilters,
      [status]: !prevFilters[status],
    }));
  };
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [totalCanceledTransactions, setTotalCanceledTransactions] = useState(0);
  const [totalSuccededTransactions, setTotalSuccededTransactions] = useState(0);
  const [totalPendingTransactions, setTotalPendingTransactions] = useState(0);
  useEffect(() => {
    setSortedTransactions(
      transactionsData.map(
        (_, index) => transactionsData[transactionsData.length - index - 1]
      )
    );
  }, [transactionsData]);

  useEffect(() => {
    if (page === "fashions") {
      setFilteredFashionTransaction(
        sortedTransactions.filter(
          (item) =>
            item.type === "fashions" &&
            item.buyer?.toLowerCase().includes(searchValue?.toLowerCase()) &&
            (storeFilters[item.store] || false) &&
            (statusFilters[item.status] || false) &&
            (selectedKasir === "" || selectedKasir === item.kasir) &&
            (item._id
              .toString()
              .toLowerCase()
              .includes(idValue.toLowerCase()) ||
              false)
        )
      );

      setTotalCanceledTransactions(
        transactionsData.filter(
          (item) =>
            item.status === "canceled" &&
            item.type != "foods" &&
            (storeFilters[item.store] || false)
        ).length
      );
      setTotalSuccededTransactions(
        transactionsData.filter(
          (item) =>
            item.status === "successed" &&
            item.type != "foods" &&
            (storeFilters[item.store] || false)
        ).length
      );
      setTotalPendingTransactions(
        transactionsData.filter(
          (item) =>
            item.status === "pending" &&
            item.type != "foods" &&
            (storeFilters[item.store] || false)
        ).length
      );
    } else {
      setFilteredFashionTransaction(
        sortedTransactions.filter(
          (item) =>
            item.type === "foods" &&
            item.buyer?.toLowerCase().includes(searchValue?.toLowerCase()) &&
            (statusFilters[item.status] || false) &&
            (selectedKasir === "" || selectedKasir === item.kasir) &&
            (storeFilters[item.store] || false) &&
            (item._id
              .toString()
              .toLowerCase()
              .includes(idValue.toLowerCase()) ||
              false)
        )
      );

      setTotalCanceledTransactions(
        transactionsData.filter(
          (item) =>
            item.status === "canceled" &&
            item.type === "foods" &&
            (storeFilters[item.store] || false)
        ).length
      );
      setTotalSuccededTransactions(
        transactionsData.filter(
          (item) =>
            item.status === "successed" &&
            item.type === "foods" &&
            (storeFilters[item.store] || false)
        ).length
      );
      setTotalPendingTransactions(
        transactionsData.filter(
          (item) =>
            item.status === "pending" &&
            item.type === "foods" &&
            (storeFilters[item.store] || false)
        ).length
      );
    }
  }, [
    page,
    searchValue,
    idValue,
    storeFilters,
    transactionsData,
    sortedTransactions,
    statusFilters,
    selectedKasir,
  ]);

  // POPOVER
  const [showPopover, setShowPopover] = useState(false);
  const [dataPopover, setDataPopover] = useState({});
  const togglePopover = ({ item }) => {
    setDataPopover(item);
    setShowPopover(!showPopover);
  };

  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    function groupDataByDateRange(data) {
      const groupedData = data.reduce((result, item) => {
        if (item?.type === page) {
          const createdAt = new Date(item.createdAt);
          const startDate = new Date(
            createdAt.getFullYear(),
            createdAt.getMonth(),
            createdAt.getDate() - createdAt.getDay() + 1
          );
          const endDate = new Date(
            createdAt.getFullYear(),
            createdAt.getMonth(),
            createdAt.getDate() - createdAt.getDay() + 7
          );

          const startDateString = startDate.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          const endDateString = endDate.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          const dateRange = `${startDateString} - ${endDateString}`;

          if (!result[dateRange]) {
            result[dateRange] = {
              transaction: [],
              Pending: 0,
              Successed: 0,
              Canceled: 0,
              Total: 0,
            };
          }

          if (item.status === "pending") {
            result[dateRange].Pending += 1;
          } else if (item.status === "successed") {
            result[dateRange].Successed += 1;
          } else if (item.status === "canceled") {
            result[dateRange].Canceled += 1;
          }
          result[dateRange].Total += 1;
          result[dateRange].transaction.push(item);
        }
        return result;
      }, {});
      return groupedData;
    }

    const groupedByWeek = groupDataByDateRange(transactionsData);
    const chartDataValues = Object.entries(groupedByWeek)?.map(
      ([dateRange, data]) => ({
        date: dateRange,
        ...data,
      })
    );

    setChartData(chartDataValues);
  }, [transactionsData, page]);

  // DOWNLOAD DATA
  const handleDownload = async () => {
    try {
      const downloadUrl =
        page === "foods"
          ? "http://localhost:3000/api/transactions/foods/download"
          : "http://localhost:3000/api/transactions/fashions/download";
      const response = await axios.get(downloadUrl, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const a = document.createElement("a");
      a.href = url;

      if (page === "foods") {
        a.download = "Foods Transactions.xlsx";
      } else {
        a.download = "Fashions Transactions.xlsx";
      }
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading data:", error);
    }
  };

  // ISADMIN
  const User = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* POPOVER */}
      <TransactionPopover
        promos={promos}
        data={dataPopover}
        togglePopover={togglePopover}
        showPopover={showPopover}
        refetch={() => fetchTransactions()}
        products={filteredFashionTransaction}
      />

      {/* CONTENT */}
      <div className="w-full min-h-screen pl-12 pr-2 sm:px-20 lg:px-32 pb-20 pt-10 bg-thirdyThin">
        <div>
          {/* CHART */}
          <div className="w-full h-auto bg-white rounded-2xl shadow-lg p-7 mb-10">
            {/* TOP */}
            <div className="flex justify-between mb-2 ">
              <h1 className="text-2xl mb-1 drop-shadow-sm h-full font-semibold text-primaryNormal">
                Chart
              </h1>
            </div>

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
                isAnimationActive
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
                      <div className="bg-white font-semibold py-4 px-6 rounded-2xl drop-shadow-md text-gray-600 flex flex-col gap-2 text-sm">
                        <p className="flex items-center gap-2">
                          <i className="fa-regular fa-calendar-days mb-1 fa-lg"></i>
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
          <div className="h-auto  w-full bg-white rounded-2xl shadow-lg p-7 ">
            <div className="flex flex-col xl:flex-row gap-4">
              {/* TOP */}
              <div className="xl:w-[75%] w-full">
                {/* TOP */}
                <div className="flex mb-2 ">
                  <h1 className="text-3xl mb-1 drop-shadow-sm h-full font-semibold text-primaryNormal">
                    Filter
                  </h1>
                </div>

                {/* MIDDLE */}
                <div className="flex flex-col sm:flex-row gap-3 w-full mb-2 justify-between">
                  {/* STORE */}
                  {page === "fashions" && (
                    <div className="flex gap-5 items-center text-sm sm:w-auto w-full justify-center ">
                      {user?.role === "owner" && (
                        <>
                          {Object.keys(storeFilters).map((store) => (
                            <div className="flex items-center" key={store}>
                              <input
                                id={`store-checkbox-${store}`}
                                type="checkbox"
                                checked={storeFilters[store]}
                                onChange={() => handleStoreFilterChange(store)}
                                className="w-4 h-4 text-secondary "
                              />
                              <label
                                htmlFor={`store-checkbox-${store}`}
                                className="ms-2 text-sm font-semibold text-gray-600 capitalize"
                              >
                                {store}
                              </label>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}

                  {/* DOWNLOAD */}
                  {User?.role === "owner" && (
                    <div className={`${page === "foods" && "ml-auto"}`}>
                      <Button variant="green" onClick={handleDownload}>
                        <i className="fa-solid fa-file-arrow-down mr-2"></i>
                        Donwload
                      </Button>
                    </div>
                  )}
                </div>

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
                      className="block w-full placeholder:text-gray-600 bg-[#F6FAF2] focus:outline-white p-3 pl-10 text-sm text-gray-600 border rounded-lg "
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
                      className="block w-full placeholder:text-gray-600 bg-[#F6FAF2] focus:outline-white p-3 pl-10 text-sm text-gray-600 border rounded-lg "
                      placeholder="Search by ID..."
                      value={idValue}
                      onChange={(e) => setidValue(e.target.value)}
                    />
                  </div>
                </div>

                {/* STATUS */}
                <div className="flex flex-col sm:flex-row w-full  justify-between mt-4 font-semibold">
                  <h1>Total: {filteredFashionTransaction.length}</h1>
                  {Object.keys(statusFilters).map((status) => (
                    <div className="flex items-center " key={status}>
                      <input
                        id={`status-checkbox-${status}`}
                        type="checkbox"
                        checked={statusFilters[status]}
                        onChange={() => handleStatusFilterChange(status)}
                        className="w-4 h-4 text-secondary "
                      />
                      <label
                        htmlFor={`store-checkbox-${status}`}
                        className={`ms-2 text-sm font-semibold drop-shadow-sm ${
                          status === "canceled"
                            ? "text-red-400"
                            : status === "successed"
                            ? "text-green-400"
                            : "text-yellow-400"
                        } capitalize flex`}
                      >
                        <h1 className="mr-1">
                          {status === "canceled"
                            ? totalCanceledTransactions
                            : status === "successed"
                            ? totalSuccededTransactions
                            : totalPendingTransactions}
                        </h1>
                        {status}
                      </label>
                    </div>
                  ))}
                </div>

                {/* DATE */}
                <div className="flex flex-col sm:flex-row w-full justify-between mt-4 gap-3">
                  {user?.role === "owner" && (
                    <div className="">
                      <select
                        id="kasir"
                        name="kasir"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={selectedKasir}
                        onChange={(e) => setSelectedKasir(e.target.value)}
                      >
                        <option value="">Select Kasir</option>
                        {kasir.map((kasirName) => (
                          <option key={kasirName} value={kasirName}>
                            {kasirName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label htmlFor="startDate">Dari:</label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate">Sampai:</label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="xl:w-[25%] w-full flex flex-col items-center gap-2">
                <button
                  onClick={() => setPage("foods")}
                  className={`relative w-[100%] h-[7.1rem] rounded-2xl overflow-hidden group flex items-center justify-center drop-shadow-sm`}
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
                  className={`relative w-[100%] h-[7.1rem] rounded-2xl overflow-hidden group flex items-center justify-center drop-shadow-sm`}
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
          <Title title={page === "fashion" ? "Fashions" : "Foods"} />

          {/* TRANSACTIONS */}
          <div className="rounded-2xl w-full text-base sm:text-lg h-auto mb-10 ">
            {page === "fashions" ? (
              <>
                {/* HEAD */}
                <div className="w-full shadow-lg bg-secondary font-semibold flex items-center text-sm sm:text-lg rounded-2xl">
                  <h1 className="text-center text-white w-[35%] lg:w-[25%] py-6 ">
                    Kasir
                  </h1>
                  <h1 className="text-center text-white w-[10%] lg:w-[5%] py-6">
                    {" "}
                    <i className="fa-solid fa-store"></i>
                  </h1>
                  <h1 className="text-center text-white w-[65%] lg:w-[30%] py-6 ">
                    Nama & Transaksi
                  </h1>
                  <h1 className="text-center text-white py-6 w-[25%] lg:block hidden">
                    Total
                  </h1>
                  <h1 className="text-center text-white w-[15%]  py-6">
                    Status
                  </h1>
                </div>

                <div>
                  <AnimatePresence>
                    {filteredFashionTransaction.length > 0 &&
                      filteredFashionTransaction.map((item) => (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          key={item.id}
                          className="my-2"
                        >
                          <FashionTransactionSection
                            data={item}
                            handlePopover={togglePopover}
                          />
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                {/* HEAD */}
                <div className="w-full shadow-md bg-secondary font-semibold flex items-center text-sm sm:text-lg rounded-2xl">
                  <h1 className="text-center text-white w-[30%] lg:w-[15%] py-6 ">
                    Kasir
                  </h1>
                  <h1 className="text-center text-white w-[75%] lg:w-[50%] py-6 ">
                    Nama & Transaksi
                  </h1>
                  <h1 className="text-center text-white py-6 w-[25%] lg:block hidden">
                    Total
                  </h1>
                  <h1 className="text-center text-white w-[15%]  py-6">
                    Status
                  </h1>
                </div>

                <div>
                  {filteredFashionTransaction.length > 0 &&
                    filteredFashionTransaction.map((item) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        key={item.id}
                        className="my-2"
                      >
                        <FoodTransactionSection
                          data={item}
                          handlePopover={togglePopover}
                        />
                      </motion.div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

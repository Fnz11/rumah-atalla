/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../../components/Title";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Account() {
  const [userData, setUserData] = useState([]);

  const User = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const fetchUserData = async () => {
    await axios
      .get("http://localhost:3000/api/users/" + User?.userId)
      .then((res) => {
        console.log("USERDATA", res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [transactionsData, setTransactionsData] = useState([]);
  const fetchTransactions = async () => {
    await axios
      .get("http://localhost:3000/api/transactions/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setTransactionsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUserData();
    fetchTransactions();
  }, []);

  // CHART
  const [weeklyChartData, setWeeklyChartData] = useState([]);
  const [monthlyChartData, setMonthlyChartData] = useState([]);
  function groupDataByDateRange(data) {
    let username;
    if (userData?.role === "owner") {
      username = null;
    } else if (userData?.username) {
      username = userData?.username;
    } else {
      username = User?.username;
    }

    const groupedData = data.reduce((result, item) => {
      if (username ? item?.kasir === username : true) {
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

  function groupDataByMonth(data) {
    const groupedData = data.reduce((result, item) => {
      if (item.status === "successed") {
        const createdAt = new Date(item.createdAt);
        const startOfMonth = new Date(
          createdAt.getFullYear(),
          createdAt.getMonth(),
          1
        );

        const startOfMonthString = startOfMonth.toLocaleDateString("id-ID", {
          month: "long",
          year: "numeric",
        });

        const monthRange = `${startOfMonthString}`;

        if (!result[monthRange]) {
          result[monthRange] = {
            Shopee: 0,
            Tokopedia: 0,
            Web: 0,
            Total: 0,
          };
        }
        let price;
        if (item.totalWithDiscount) {
          price = item.totalWithDiscount;
        } else if (item.totalPrice) {
          price = item.totalPrice;
        } else {
          price = 0;
        }

        if (item.store === "web") {
          result[monthRange].Web += price;
        } else if (item.store === "tokopedia") {
          result[monthRange].Tokopedia += price;
        } else if (item.store === "shopee") {
          result[monthRange].Shopee += price;
        }
        result[monthRange].Total += price;
      }
      return result;
    }, {});

    return groupedData;
  }

  useEffect(() => {
    const groupedByWeek = groupDataByDateRange(transactionsData);
    const chartDataValues = Object.entries(groupedByWeek)?.map(
      ([dateRange, data]) => ({
        date: dateRange,
        ...data,
      })
    );

    setWeeklyChartData(chartDataValues);

    const groupedByMonth = groupDataByMonth(transactionsData);
    const monthlyChartDataValues = Object.entries(groupedByMonth)?.map(
      ([monthRange, data]) => ({
        month: monthRange,
        ...data,
      })
    );

    setMonthlyChartData(monthlyChartDataValues);
  }, [transactionsData, userData]);

  return (
    <>
      <div className="w-full pl-12 pr-2 sm:px-8 lg:px-16 pb-20 pt-10 bg-thirdyThin">
        {/* TITTLE */}
        <Title title={"Dashboard"} className={"mt-0"} />

        {/* CONTENT */}
        <div className="w-full gap- text-gray-600 text-sm gap-5 flex flex-col">
          {/* TOP */}
          <div className="flex max-sm:flex-col w-full gap-5">
            {/* LEFT */}
            <div className="flex flex-col w-full sm:w-[40%] h-[29rem]  bg-white rounded-2xl shadow-lg gap-5 p-7 items-center justify-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <div className="relative w-[80%] flex group rounded-full drop-shadow-lg shadow-lg hover:shadow-xl overflow-hidden">
                <img
                  src={userData?.imageUrl ? userData?.imageUrl : "/Profile.png"}
                  alt=""
                  className="w-full object-cover aspect-square "
                />
                <div className="absolute flex items-center  opacity-0  group-hover:opacity-[100] duration-300 transition-all justify-center bottom-0 right-0 w-full h-full bg-[rgba(255,255,255,0.7)]">
                  <h1 className="text-center text-xl font-semibold drop-shadow-lg text-secondary scale-0 group-hover:scale-[1] duration-100 transition-all">
                    Click to change
                  </h1>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="gap-3 flex flex-col text-end ">
                  <h1>Nama</h1>
                  <h1>Email</h1>
                  <h1>Password</h1>
                  <h1>No Telpon</h1>
                  <h1>Role</h1>
                </div>
                <div className="gap-3 flex flex-col">
                  <h1>: {userData?.username}</h1>
                  <h1>: {userData?.email}</h1>
                  <h1>: ********</h1>
                  <h1>: {userData?.number}</h1>
                  <h1 className="capitalize">
                    : <b>{userData?.role}</b>
                  </h1>
                </div>
              </div>
            </div>

            {/* MIDDLE */}
            <div className="w-full h-[29rem] overflow-hidden flex flex-col justify-center gap-5 items-center bg-white rounded-2xl  shadow-lg p-7">
              <h1 className="text-2xl font-semibold">
                Weekly Transaction Chart
              </h1>

              {/* CHART */}
              <ResponsiveContainer
                width="100%"
                height={350}
                className="w-full flex items-center justify-center text-sm drop-shadow-lg"
              >
                <BarChart
                  width={500}
                  height={300}
                  data={weeklyChartData}
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

            {/* RIGHT */}
            <div className="flex flex-col w-full sm:w-[25%] h-[10rem] sm:h-[29rem] bg-white rounded-2xl shadow-lg gap-5 p-4 items-center justify-center">
              <h1 className="text-2xl font-semibold">Transaction</h1>
              <div className="flex sm:flex-col  gap-3">
                <div className="flex items-center justify-center text-center drop-shadow-lg text-white font-semibold bg-green-400 w-full aspect-[12/10] relative rounded-2xl shadow-lg p-3">
                  Successed: {userData?.transactions?.successed}
                </div>
                <div className="flex items-center justify-center text-center drop-shadow-lg text-white font-semibold bg-red-400 w-full aspect-[12/10] relative rounded-2xl shadow-lg p-3">
                  Canceled: {userData?.transactions?.canceled}
                </div>
                <div className="flex items-center justify-center text-center drop-shadow-lg text-white font-semibold bg-yellow-400 w-full aspect-[12/10] relative rounded-2xl shadow-lg p-3">
                  Pending: {userData?.transactions?.pending}
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          {userData?.role == "owner" && (
            <div className="flex w-full gap-5 ">
              <div className="w-full h-[29rem] flex flex-col justify-center gap-5 items-center bg-white rounded-2xl overflow-hidden shadow-lg p-7">
                <h1 className="text-2xl font-semibold">
                  Monthly Transaction Chart
                </h1>
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  className="w-full flex items-center justify-center text-sm drop-shadow-lg"
                >
                  <LineChart
                    width={500}
                    height={300}
                    data={monthlyChartData}
                    margin={{
                      top: 20,
                      right: 50,
                      left: 20,
                      bottom: 5,
                    }}
                    className=""
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      content={({ payload, label }) => {
                        // Menghitung jumlah pending, successed, dan canceled
                        const Shopee =
                          payload.find((item) => item.dataKey === "Shopee")
                            ?.value || 0;
                        const Tokopedia =
                          payload.find((item) => item.dataKey === "Tokopedia")
                            ?.value || 0;
                        const Web =
                          payload.find((item) => item.dataKey === "Web")
                            ?.value || 0;
                        const Total =
                          payload.find((item) => item.dataKey === "Total")
                            ?.value || 0;

                        return (
                          <div className="bg-white py-4 px-6 rounded-2xl drop-shadow-md text-gray-600 flex flex-col gap-2 text-sm font-semibold">
                            <p className="">{label}</p>
                            <p className="text-[#EF5336] flex gap-2 items-center">
                              <img
                                className="h-5 mb-1"
                                src="/Shopee.png"
                                alt=""
                              />
                              Shopee: Rp. {Shopee?.toLocaleString()}
                            </p>
                            <p className="text-[#509F4E] flex gap-2 items-center">
                              <img
                                className="h-5 mb-1"
                                src="/Tokopedia.png"
                                alt=""
                              />
                              Tokopedia: Rp. {Tokopedia?.toLocaleString()}
                            </p>
                            <p className="text-secondary flex gap-2 items-center ">
                              <i className="fa-solid fa-store scale-[1.1] mb-1  mx-[0.2rem]"></i>
                              Web: Rp. {Web?.toLocaleString()}
                            </p>
                            <p className="text-gray-600 mt-2">
                              Total: Rp. {Total?.toLocaleString()}
                            </p>
                          </div>
                        );
                      }}
                    />
                    <Legend />
                    <ReferenceLine
                      x="Page C"
                      stroke="red"
                      label="Max PV PAGE"
                    />
                    <ReferenceLine y={9800} label="Max" stroke="red" />
                    <Line type="monotone" dataKey="Shopee" stroke="#EF5336" />
                    <Line
                      type="monotone"
                      dataKey="Tokopedia"
                      stroke="##509F4E"
                    />
                    <Line type="monotone" dataKey="Web" stroke="#7E6363" />
                    <Line type="monotone" dataKey="Total" stroke="#6B7280" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
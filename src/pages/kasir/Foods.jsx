/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FoodsKasirPopover from "../../components/Kasir/FoodsKasirPopover";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import Title from "../../components/Title";
import Button from "../../components/Button";

export default function FoodsKasir() {
  // FETCHHHH
  const [isLoadingFetch, setIsLoadingFetch] = useState(true);
  // FETCH FOODS
  const [foodsProducts, setFoodsProducts] = useState([]);
  const [triger, setTriger] = useState(1);
  const fetchFoodsProducts = async () => {
    await axios.get("http://localhost:3000/api/foods").then((res) => {
      if (foodsProducts.length === 0) {
        setFoodsProducts(res.data);
      }
      setTriger((prevData) => prevData + 1);
      setIsLoadingFetch(false);
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
        if (promos.length === 0) {
          setPromos(res.data.filter((item) => item.for === "foods"));
        }
      });
  };
  // FETCH TRANSACTIONS
  const [transactionsData, setTransactionsData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchTransactions = async () => {
    await axios
      .get("http://localhost:3000/api/transactions/", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        let successed = 0;
        let pending = 0;
        let canceled = 0;
        const data = res.data.filter(
          (transaction) => transaction.kasir === user.username
        );
        data.map((transaction) => {
          if (transaction.status === "successed") {
            successed += 1;
          } else if (transaction.status === "pending") {
            pending += 1;
          } else if (transaction.status === "canceled") {
            canceled += 1;
          }
        });
        setTransactionsData({
          successed: successed,
          pending: pending,
          canceled: canceled,
        });
      });
  };

  useEffect(() => {
    if (promos.length === 0) {
      fetchPromos();
    }
    if (transactionsData.length === 0) {
      fetchTransactions();
    }
    if (foodsProducts.length === 0) {
      fetchFoodsProducts();
    }
  }, []);

  // FOODS / DRINK
  const [total, setTotal] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);
  const [totalCashback, setTotalCashback] = useState(0);
  const [page, setPage] = useState("foods");

  // CART
  const [productsSelected, setProductsSelected] = useState([]);
  const [productsForm, setProductsForm] = useState([]);
  const [foodsCartItems, setFoodsCartItems] = useState([]);
  const [drinksCartItems, setDrinksCartItems] = useState([]);
  const addToCart = (item, type) => {
    if (type === "foods") {
      if (foodsCartItems.includes(item)) {
        const updatedFoodsCartItems = foodsCartItems.filter((i) => i !== item);
        setFoodsCartItems(updatedFoodsCartItems);
        return;
      }
      setFoodsCartItems([...foodsCartItems, item]);
    } else {
      if (drinksCartItems.includes(item)) {
        const updatedDrinkCartItems = drinksCartItems.filter((i) => i !== item);
        setDrinksCartItems(updatedDrinkCartItems);
        return;
      }
      setDrinksCartItems([...drinksCartItems, item]);
    }
  };

  // HANDLE BUY
  const [buyer, setBuyer] = useState("");
  // LOADING
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = async () => {
    console.log("DIUPDATEE", transactionsData);
    await axios
      .patch(
        `http://localhost:3000/api/users/` + user.userId,
        { transactions: transactionsData },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("INI RESSS", res.data);
      })
      .catch((err) => {
        console.log("INI EEEERR", err);
      });
  };

  const [formData, setFormData] = useState({
    buyer: "",
    kasir: "",
    type: "foods",
    store: "web",
    products: [],
    totalAmount: 0,
    qty: 0,
    status: "pending",
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      products: productsForm,
      buyer: buyer,
      kasir: user?.username,
      totalAmount: total,
      totalWithDiscount: totalWithDiscount,
      totalCashback: totalCashback,
    }));
  }, [productsForm, buyer, totalWithDiscount]);

  const handleBuy = async () => {
    setIsLoading(true);
    await axios
      .post("http://localhost:3000/api/transactions", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        updateUser();
        toast.custom((t) => (
          <CustomToast t={t} message="Transaction successed" type="success" />
        ));
        togglePopover();
      })
      .catch((error) => {
        toast.custom((t) => (
          <CustomToast t={t} message="Transaction failed" type="failed" />
        ));
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //   POPOVER
  const [showPopover, setShowPopover] = useState(false);
  const [drinksPop, setDrinksPop] = useState([]);
  const [foodsPop, setFoodsPop] = useState([]);
  const togglePopover = () => {
    if (!showPopover) {
      const drinksClicked = foodsProducts.filter(
        (item) =>
          item.type === "drinks" &&
          drinksCartItems.includes(item._id.toString())
      );
      const foodsClicked = foodsProducts.filter(
        (item) =>
          item.type === "foods" && foodsCartItems.includes(item._id.toString())
      );
      setDrinksPop(drinksClicked);
      setFoodsPop(foodsClicked);
    }
    setShowPopover(!showPopover);
  };

  useEffect(() => {
    if (showPopover === false) {
      const drinksClicked = foodsProducts.filter(
        (item) =>
          item.type === "drinks" &&
          drinksCartItems.includes(item._id.toString())
      );
      const foodsClicked = foodsProducts.filter(
        (item) =>
          item.type === "drinks" && foodsCartItems.includes(item._id.toString())
      );
      setDrinksPop(drinksClicked);
      setFoodsPop(foodsClicked);
    }
  }, [foodsCartItems, drinksCartItems, foodsProducts]);

  useEffect(() => {
    setProductsSelected([...foodsPop, ...drinksPop]);
  }, [foodsPop, drinksPop]);

  // useEffect(() => {
  //   console.log("ANUNBAUFENOFE", foodsProducts)
  // })

  // TOTAL
  const updateProductQty = ({
    productId,
    qty,
    price,
    discount,
    cashback,
    name,
  }) => {
    const isExist = (id) => {
      return productsForm.some((item) => item.productId === id);
    };
    if (isExist(productId)) {
      setProductsForm((prevData) =>
        prevData.map((item) =>
          item.productId === productId
            ? {
                ...item,
                qty: qty,
                price: price * qty,
                discount: discount * qty,
                cashback: cashback * qty,
              }
            : item
        )
      );
    } else {
      setProductsForm((prevData) => [
        ...prevData,
        {
          productId: productId,
          name: name,
          qty: qty,
          discount: discount * qty,
          cashback: cashback * qty,
          price: price * qty,
        },
      ]);
    }
  };
  useEffect(() => {
    const updatedFoods = foodsProducts.map((product) => {
      let discount = product.price;
      let cashback = 0;
      // console.log("INI PRODUCRT", product)

      promos.forEach((promo) => {
        if (promo.products.includes(product._id.toString())) {
          if (promo.type === "diskon persentase") {
            discount -= (discount * promo.value) / 100;
          } else if (promo.type === "diskon nominal") {
            discount -= promo.value;
          } else if (promo.type === "cashback nominal") {
            cashback += promo.value;
          } else {
            cashback += (product.price * promo.value) / 100;
          }
        }
      });

      return {
        ...product,
        discount: discount,
        cashback: cashback,
      };
    });
    console.log("INI BARU", foodsProducts);
    setFoodsProducts(updatedFoods);
  }, [promos, triger]);

  useEffect(() => {
    setProductsForm([]);
    productsSelected.forEach((item) => {
      let discountValue = item.price;
      let cashbackValue = 0;
      let promoInclude = [];
      promos.map((promo) => {
        if (promo.products.includes(item._id.toString())) {
          promoInclude.push(promo._id.toString());
          if (promo.type === "diskon persentase") {
            discountValue -= (discountValue * promo.value) / 100;
          } else if (promo.type === "diskon nominal") {
            discountValue -= promo.value;
          } else if (promo.type === "cashback nominal") {
            cashbackValue += promo.value;
          } else {
            cashbackValue += (item.price * promo.value) / 100;
          }
        }
      });
      setProductsForm((prevData) => [
        ...prevData,
        {
          productId: item._id.toString(),
          name: item.name,
          qty: 1,
          discount: discountValue,
          cashback: cashbackValue,
          promo: promoInclude,
          price: item.price,
        },
      ]);
    });
  }, [productsSelected]);

  useEffect(() => {
    const totalPrice = productsForm.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price;
    }, 0);
    const totalDiscount = productsForm.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.discount;
    }, 0);
    const totalCashback = productsForm.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.cashback;
    }, 0);
    setTotal(totalPrice);
    setTotalWithDiscount(totalDiscount);
    setTotalCashback(totalCashback);
  }, [productsForm]);

  //   FILTER
  const [searchValue, setSearchValue] = useState("");
  const filteredFoods = foodsProducts.filter(
    (item) =>
      item.type === "foods" &&
      item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredDrinks = foodsProducts.filter(
    (item) =>
      item.type === "drinks" &&
      item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      {/* POPOVER */}
      <AnimatePresence>
        {showPopover && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => togglePopover()}
              className={` ${
                isLoading && "pointer-events-none"
              } w-screen h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm absolute`}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={` ${
                isLoading && "pointer-events-none"
              } relative overflow-hidden bg-thirdyThin  w-[40rem] h-[47rem] max-h-[98%] p-5 z-[1] rounded-2xl shadow-md `}
            >
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute w-full h-full top-0 z-[100] left-0 flex items-center justify-center"
                >
                  <div className="w-full h-full bg-[rgba(255,255,255,0.4)] absolute top-0 left-0 scale-[1.2]"></div>
                  <div className="relative flex w-full h-full items-center justify-center">
                    <motion.img
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      src="/loading.png"
                      className="h-14 opacity-[0.7] animate-spin"
                      alt=""
                    />
                  </div>
                </motion.div>
              )}

              {/* LOGO */}
              <div className="flex w-full -ml-2 justify-center drop-shadow items-center pointer-events-none">
                <img
                  src="/LogoGreen.png"
                  className="scale-[2.3] w-[8rem] h-[8rem] aspect-square"
                  alt="Logo"
                />
                <div className="uppercase ml-1 text-[2.8rem] leading-[3rem] mb-[0.5rem] text-primaryNormal hidden sm:block">
                  <h1 className="-mb-[0.4rem]">Rumah</h1>
                  <h1 className="font-bold">Atalla</h1>
                  <div className="w-[120%] h-[0.3rem] -my-[0.15rem] rounded-md bg-primaryNormal" />
                </div>
              </div>

              {/* FORM */}
              <form action="" className="flex flex-col gap-5">
                <div>
                  <label
                    className="text-base sm:text-lg drop-shadow-sm font-semibold text-primaryNormal"
                    htmlFor="name"
                  >
                    Atas nama
                  </label>
                  <input
                    type="text"
                    name="buyer"
                    placeholder="example"
                    value={buyer}
                    onChange={(e) => setBuyer(e.target.value)}
                    className="block w-full placeholder:text-gray-600 bg-white mb-3 focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                  />
                </div>
              </form>

              {/* ITEM */}
              <div className="w-full h-[60%] overflow-y-scroll overflow-x-hidden">
                {foodsPop.length > 0 && (
                  <>
                    <div className="flex items-center gap-5 w-full mb-2 ">
                      <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
                      <h1 className=" text-[2rem] text-center font-semibold text-primaryNormal drop-shadow-md">
                        Foods
                      </h1>
                      <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
                    </div>
                    <div className="flex w-full bg-secondary h-[3rem] font-semibold shadow-lg inset-[0.2rem] relative text-white items-center rounded-2xl px-2">
                      <div className="w-[50%]">Nama Barang </div>
                      <div className="w-[15%]">Harga</div>
                      <div className="w-[15%]">Jumlah</div>
                      <div className="w-[20%]">QTY</div>
                    </div>

                    {foodsPop.map((item) => (
                      <div key={item._id.toString()}>
                        <FoodsKasirPopover
                          handleTotal={updateProductQty}
                          item={item}
                          productsForm={productsForm}
                          promos={promos}
                        />
                      </div>
                    ))}
                  </>
                )}

                {drinksPop.length > 0 && (
                  <>
                    <div className="flex items-center gap-5 w-full mb-2  mt-5">
                      <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
                      <h1 className=" text-[2rem] text-center font-semibold text-primaryNormal drop-shadow-md ">
                        Drinks
                      </h1>
                      <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
                    </div>
                    <div className="flex w-full bg-secondary h-[3rem] font-semibold shadow-md inset-[0.2rem] relative text-white items-center rounded-2xl px-2">
                      <div className="w-[50%]">Nama Barang </div>
                      <div className="w-[15%]">Harga</div>
                      <div className="w-[15%]">Jumlah</div>
                      <div className="w-[20%]">QTY</div>
                    </div>

                    {drinksPop.map((item) => (
                      <div key={item._id.toString()}>
                        <FoodsKasirPopover
                          handleTotal={updateProductQty}
                          item={item}
                          productsForm={productsForm}
                          promos={promos}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="flex items-center justify-end w-full mt-5 gap-5">
                <div className="w-[12rem] ">
                  <h1 className="h-full items-center flex justify-center text-sm  font-semibold">
                    Total:
                    <div className="flex flex-col text-end ml-2 leading-4">
                      {totalWithDiscount != total && (
                        <span className="text-secondary  ">
                          Rp. {totalWithDiscount?.toLocaleString()}
                        </span>
                      )}
                      <span
                        className={` text-secondary ${
                          total != totalWithDiscount &&
                          "line-through opacity-[0.6] "
                        } w-full  `}
                      >
                        Rp. {total?.toLocaleString()}
                      </span>
                      {totalCashback > 0 && (
                        <span className="text-primaryThin  ">
                          + Rp. {totalCashback?.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </h1>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => handleBuy()}
                  className={"ml-auto"}
                >
                  Buy
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <Toaster />

      <div className="bg-thirdyThin w-full pl-12 pr-2 sm:px-20 lg:px-32 pb-20 pt-10  min-h-screen text-gray-600">
        {/* BUY BUTTON */}
        {(drinksCartItems.length > 0 || foodsCartItems.length > 0) && (
          <button
            onClick={() => togglePopover()}
            className="bg-primaryThin drop-shadow-xl z-[10]  text-thirdyThin rounded-full h-16 w-16 fixed bottom-7 right-7"
          >
            <div className="relative">
              <div className="absolute h-16 w-16 bg-primaryVeryThin animate-ping -top-5 scale-[1] rounded-full z-[-10]"></div>
            </div>
            <i className="fa-solid fa-cart-shopping fa-2xl scale-[0.8]"></i>
          </button>
        )}

        {/* CONTENT */}
        <div className="">
          <div className="flex flex-col">
            {/* FILTER */}
            <div className="h-auto  w-full bg-white rounded-2xl shadow-xl p-5">
              {/* TOP */}
              <div className="flex mb-2 ">
                <h1 className="text-3xl mb-1 drop-shadow-sm h-full font-semibold text-primaryNormal">
                  Filter
                </h1>
              </div>
              <div className="flex sm:flex-row flex-col gap-3">
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
                    className="block w-full placeholder:text-gray-600 bg-[#F6FAF2] focus:outline-white p-3 pl-10 text-[0.6rem] sm:text-sm text-gray-600 border rounded-lg "
                    placeholder="Search by name..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                {/* <div className="flex gap-2">
                  <button
                    onClick={() => setPage("foods")}
                    className={`${
                      page === "foods"
                        ? "bg-secondary text-thirdyNormal"
                        : "text-secondary hover:bg-secondary hover:text-thirdyNormal"
                    }  ml-auto border-2 border-secondary  hover:scale-[1.05] hover:drop-shadow-lg transition-all duration-300  font-bold py-2  text-sm sm:text-base px-2 sm:px-4 rounded w-28 sm:w-32 justify-center flex items-center`}
                  >
                    <i className="fa-solid fa-bowl-food mr-2 fa-lg scale-[0.9]"></i>{" "}
                    Foods
                  </button>
                  <button
                    onClick={() => setPage("drinks")}
                    className={`${
                      page === "drinks"
                        ? "bg-secondary text-thirdyNormal"
                        : "text-secondary hover:bg-secondary hover:text-thirdyNormal"
                    }  ml-auto border-2 border-secondary  hover:scale-[1.05] hover:drop-shadow-lg transition-all duration-300  font-bold py-2  text-sm sm:text-base px-2 sm:px-4 rounded w-28 sm:w-32 justify-center flex items-center`}
                  >
                    <i className="fa-solid fa-mug-saucer mr-2 fa-lg scale-[0.9]"></i>{" "}
                    Drinks
                  </button>
                </div> */}
              </div>
              {/* BOTTOM */}
              <div className="w-full flex max-sm:flex-col items-center gap-2 mt-5">
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
                  onClick={() => setPage("drinks")}
                  className={`relative w-[100%] h-[10rem] rounded-2xl overflow-hidden group flex items-center justify-center drop-shadow-sm`}
                >
                  <img
                    src="https://wallpapers.com/images/hd/cocktail-drinks-glasses-on-black-background-7p9nyavhgxq3anzo.jpg"
                    className={`absolute w-full z-[0] h-full object-cover  transition-all duration-700  ${
                      page === "drinks"
                        ? "scale-[1.2] rotate-3 group-hover:scale-[1] group-hover:rotate-0"
                        : "group-hover:scale-[1.2] group-hover:rotate-3"
                    }`}
                    alt="LandingFashion"
                  />
                  <div
                    className={`absolute   ${
                      page === "drinks"
                        ? "opacity-[0.7] bg-[rgba(255,255,255,0.2)]"
                        : "group-hover:opacity-[0.7] bg-[rgba(0,0,0,0.7)] group-hover:bg-[rgba(255,255,255,0.2)]"
                    } w-full h-full z-[1]  transition-all duration-300`}
                  ></div>
                  <h1
                    className={`text-3xl z-[2] relative text-white font-medium ${
                      page === "drinks"
                        ? "scale-[1.05] group-hover:scale-[1]"
                        : "group-hover:scale-[1.05]"
                    } transition-all duration-300`}
                  >
                    Drinks
                  </h1>
                </button>
              </div>
            </div>

            {/* PRODUCT */}
            <div>
              {/* PRODUCT TITTLE */}
              <Title title={page === "foods" ? "Foods" : "Drinks"} />
              {/* PRODUCT */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-10 lg:grid-cols-3 xl:gap-x-4">
                {isLoadingFetch &&
                  [...Array(10)].map((i) => (
                    <div
                      key={i}
                      className={`relative bg-white transition-all shadow-xl animate-pulse rounded-2xl`}
                    >
                      <div className="w-full relative overflow-hidden rounded-2xl bg-gray-300 transition-all aspect-square animate-pulse"></div>
                      <div className="my-2 mx-4 flex flex-col justify-between h-10">
                        <div className="w-1/2 h-2 rounded-2xl bg-gray-300 animate-pulse"></div>
                        <div className="w-full flex justify-between">
                          <div className="w-[10%] h-2 rounded-2xl bg-gray-300 animate-pulse"></div>
                          <div className="w-1/4 h-2 rounded-2xl bg-gray-300 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                {page === "foods" &&
                  filteredFoods.map((product) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => addToCart(product._id.toString(), "foods")}
                      key={product._id.toString()}
                      className={`${
                        foodsCartItems.includes(product._id.toString())
                          ? "border-4  border-primaryThin opacity-[0.6] scale-[0.95] shadow-lg group hover:shadow-xl"
                          : " shadow-lg group hover:shadow-xl "
                      }  group relative bg-white rounded-2xl inset-[0.1rem] hover:inset-0 overflow-hidden transition-all `}
                    >
                      <div className=" w-full overflow-hidden relative  rounded-b-2xl bg-gray-200 group-hover:opacity-[0.85]  transition-all aspect-square">
                        <div className="absolute h-full w-full z-[1] flex items-end">
                          {promos.map((item, index) => {
                            if (
                              item.products.includes(product._id.toString())
                            ) {
                              return (
                                <img
                                  key={index}
                                  src={item.imageUrl}
                                  className="h-6 sm:h-12 mr-1 aspect-square object-cover object-center drop-shadow-xl rounded-sm"
                                  alt=""
                                />
                              );
                            }
                          })}
                        </div>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full absolute object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="my-2 mx-4 flex flex-col justify-between">
                        <div>
                          <h3 className="text-[0.6rem] sm:text-sm text-gray-700">
                            <div>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.name}
                            </div>
                          </h3>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-[0.6rem] sm:text-sm font-medium ">
                            {product.stock}
                          </p>
                          <p className="text-[0.6rem] sm:text-sm font-semibold text-secondary">
                            Rp. {product.price?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                {page === "drinks" &&
                  filteredDrinks.map((product) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() =>
                        addToCart(product._id.toString(), "drinks")
                      }
                      key={product._id.toString()}
                      className={`${
                        drinksCartItems.includes(product._id.toString())
                          ? "border-4 border-primaryThin opacity-[0.6] scale-[0.95] drop-shadow-md group hover:drop-shadow-xl"
                          : " drop-shadow-sm group hover:drop-shadow-md"
                      }  group relative bg-white rounded-2xl transition-all `}
                    >
                      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-200 group-hover:opacity-[0.85] transition-all aspect-square">
                        <div className="absolute h-full w-full z-[1] flex items-end">
                          {promos.map((item, index) => {
                            if (
                              item.products.includes(product._id.toString())
                            ) {
                              return (
                                <img
                                  key={index}
                                  src={item.imageUrl}
                                  className="h-12 mr-1 drop-shadow-xl"
                                  alt=""
                                />
                              );
                            }
                          })}
                        </div>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="my-2 mx-4 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <div>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.name}
                            </div>
                          </h3>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm font-medium ">
                            {product.stock}
                          </p>
                          <p className="text-sm font-semibold text-primaryThin">
                            Rp. {product.price?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

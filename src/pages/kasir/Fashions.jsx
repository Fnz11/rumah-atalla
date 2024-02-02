/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FashionKasirPopover from "../../components/Kasir/FashionKasirPopover";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import Title from "../../components/Title";
import ShowMore from "../../components/Kasir/ShowMore";
import { getToken } from "firebase/messaging";
import messaging from "../../lib/FirebaseConfigure";
import { subscribeToTopic } from "../../lib/FirebaseConfigure";

export default function FashionsKasir() {
  // FETCHHHH
  const [isLoadingFetch, setIsLoadingFetch] = useState(true);
  // FETCH FASHION
  const [fashionProducts, setFashionProducts] = useState([]);
  const [triger, setTriger] = useState(1);

  const fetchFashionProducts = async () => {
    await axios
      .get("http://localhost:3000/api/products/")
      .then((res) => {
        setTriger((prevData) => prevData + 1);
        setFashionProducts(res.data);
        setIsLoadingFetch(false);
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
  // FETCH TRANSACTIONS
  const [transactionsData, setTransactionsData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/transactions/",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const transactions = response.data;
      const initialCounts = { successed: 0, pending: 0, canceled: 0 };

      const { successed, pending, canceled } = transactions.reduce(
        (counts, transaction) => {
          counts[transaction.status] = (counts[transaction.status] || 0) + 1;
          return counts;
        },
        initialCounts
      );

      setTransactionsData({ successed, pending, canceled });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchPromos();
    fetchFashionProducts();
    fetchTransactions();
  }, []);

  // TOTAL
  const [totalPrice, setTotalPrice] = useState({
    normalPrice: 0,
    discountPrice: 0,
    cashbackPrice: 0,
  });

  // CART
  const [productsSelected, setProductsSelected] = useState([]);
  const [productsForm, setProductsForm] = useState([]);
  const [FashionCartItems, setFashionCartItems] = useState([]);
  const addToCart = (item) => {
    const cartIndex = FashionCartItems.findIndex(
      (product) => product?.idOnCart === item?.idOnCart
    );
    let updatedFashionCartItems = [...FashionCartItems];
    if (cartIndex >= 0) {
      updatedFashionCartItems.splice(cartIndex, 1);
      setFashionCartItems(updatedFashionCartItems);
      return;
    }
    setFashionCartItems([...FashionCartItems, item]);
  };

  // HANDLE BUY
  const [buyer, setBuyer] = useState("");
  // LOADING
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = async () => {
    await axios.patch(
      `http://localhost:3000/api/users/` + user.userId,
      { transactions: transactionsData },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  };
  const [formData, setFormData] = useState({
    buyer: "",
    kasir: "",
    type: "fashions",
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
      totalAmount: totalPrice.normalPrice,
      totalWithDiscount: totalPrice.discountPrice,
      totalCashback: totalPrice.cashbackPrice,
    }));
  }, [productsForm, buyer]);

  useEffect(() => {
    // messaging.subscribeToTopic("notifications");
    subscribeToTopic();
  }, []);

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Unable to get permission to notify.");
      }
    });
  }
  const handleBuy = async () => {
    console.log("BUUYY", formData);

    requestPermission();
    // setIsLoading(true);
    // await axios
    //   .post("http://localhost:3000/api/transactions", formData, {
    //     headers: {
    //       Authorization: token,
    //     },
    //   })
    //   .then(async (res) => {
    //     toast.custom((t) => (
    //       <CustomToast t={t} message="Transaction successed" type="success" />
    //     ));
    //     updateUser();
    //     setFormData({
    //       buyer: "",
    //       kasir: "",
    //       type: "fashions",
    //       store: "web",
    //       products: [],
    //       totalAmount: 0,
    //       qty: 0,
    //       status: "pending",
    //     });
    //     setFashionCartItems([]);
    //     setBuyer("");
    //     togglePopover();
    //   })
    //   .catch((error) => {
    //     toast.custom((t) => (
    //       <CustomToast t={t} message="Transaction failed" type="failed" />
    //     ));
    //     console.error(error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  //   POPOVER
  const [showPopover, setShowPopover] = useState(false);
  // const [trigerCart, setTrigerCart] = useState(false);
  const handleChange = (value, type, indexOnCart) => {
    const updatedFashionCartItems = [...FashionCartItems];
    if (type === "qty") {
      console.log(value, FashionCartItems, indexOnCart);
      updatedFashionCartItems[indexOnCart].qty = value.value1;
    } else if (type === "productType") {
      updatedFashionCartItems[indexOnCart].idOnCart = value.value3;

      updatedFashionCartItems[indexOnCart].variant =
        updatedFashionCartItems[indexOnCart].variants[value.value1];

      updatedFashionCartItems[indexOnCart].size =
        updatedFashionCartItems[indexOnCart].variants[value.value1].size[
          value.value2
        ];

      updatedFashionCartItems[indexOnCart].price =
        updatedFashionCartItems[indexOnCart]?.sizes[value.value2]?.price;
      console.log("UPUO", updatedFashionCartItems[indexOnCart]);
    }
    setFashionCartItems(updatedFashionCartItems);
  };

  const converToProductForm = () => {
    let total = 0;
    let discount = 0;
    let cashback = 0;
    FashionCartItems.forEach((item) => {
      total += item?.size?.price * item.qty;
      discount += item?.size?.discountPrice * item.qty;
      cashback += item?.size?.cashBackTotal * item.qty;
    });
    setTotalPrice({
      normalPrice: total,
      discountPrice: discount,
      cashbackPrice: cashback,
    });
    const newFashionCartItems = FashionCartItems.map((item) => {
      const { name, qty, price, size, variant, _id } = item;
      console.log("CONVERTO", item);
      const newName = `${name} - ${variant.name} - ${size.size}`;
      const totalPrice = price * qty;
      const totalDiscount = size.discountPrice * qty;
      const totalCashback = size.cashBackTotal * qty;

      return {
        productId: _id,
        name: newName,
        qty: qty,
        price: totalPrice,
        discount: totalDiscount,
        cashback: totalCashback,
      };
    });
    console.log(newFashionCartItems, FashionCartItems, "BERE");
    setProductsForm(newFashionCartItems);
  };

  useEffect(() => {
    converToProductForm();
  }, [FashionCartItems]);

  useEffect(() => {
    console.log("INIFOROOMMO", productsForm);
  }, [productsForm]);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  useEffect(() => {
    setProductsSelected([...FashionCartItems]);
  }, [FashionCartItems]);

  // TOTAL
  useEffect(() => {
    const newFashionProduct = fashionProducts.map((product) => {
      let discountNominal = 0;
      let discountPersentase = 0;
      let cashbackNominal = 0;
      let cashbackPersentase = 0;
      let productPromos = [];
      promos.map((promo, i) => {
        if (promo.products.includes(product._id.toString())) {
          productPromos.push(promo);
          if (promo.type === "diskon persentase") {
            discountPersentase += promo.value;
          } else if (promo.type === "diskon nominal") {
            discountNominal += promo.value;
          } else if (promo.type === "cashback nominal") {
            cashbackNominal += promo.value;
          } else {
            cashbackPersentase += promo.value;
          }
        }
      });
      const newVariants = product.variants.map((variant) => {
        const newSize = variant?.size?.map((variantSize) => {
          const discountPrice =
            variantSize.price -
            discountNominal -
            (variantSize.price * discountPersentase) / 100;
          const cashBackTotal =
            cashbackNominal + (variantSize.price * cashbackPersentase) / 100;
          return {
            ...variantSize,
            discountPrice: discountPrice,
            cashBackTotal: cashBackTotal,
          };
        });

        return {
          ...variant,
          size: newSize,
        };
      });
      return {
        ...product,
        productPromos: productPromos,
        discountNominal: discountNominal,
        discountPersentase: discountPersentase,
        cashbackNominal: cashbackNominal,
        cashbackPersentase: cashbackPersentase,
        variants: newVariants,
      };
    });
    // console.log("NEPROD", newFashionProduct);
    setFashionProducts(newFashionProduct);
  }, [promos, triger]);

  //   FILTER
  const [searchValue, setSearchValue] = useState("");
  const filteredFashions = fashionProducts.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // showMore
  const [showMore, setShowMore] = useState(false);
  const [showMoreData, setShowMoreData] = useState(null);
  const toggleShowMore = ({ data }) => {
    setShowMore(!showMore);
    if (showMore) {
      setShowMoreData(null);
    } else {
      setShowMoreData(data);
    }
  };

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
              className={`${
                isLoading && "pointer-events-none"
              } w-screen h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm absolute`}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`bg-thirdyThin relative w-[40rem] h-[47rem] max-h-[95%] overflow-hidden p-5 z-[1] rounded-2xl shadow-lg ${
                isLoading && "pointer-events-none"
              } `}
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
              <div className="flex w-full -ml-2 justify-center drop-shadow items-center pointer-events-none select-none">
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
                    className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                  />
                </div>
              </form>

              {/* ITEM */}
              <div className="w-full h-[60%] overflow-y-scroll overflow-x-hidden">
                {FashionCartItems.length > 0 && (
                  <>
                    {/* TITTLE */}
                    <Title title={"Fashions"} className={"my-5"} />
                    {/* TOP */}
                    <div className="flex w-full bg-secondary h-[3rem] font-semibold shadow-lg inset-[0.2rem] relative text-white items-center rounded-2xl px-2">
                      <div className="w-[40%]">Nama Barang </div>
                      <div className="w-[20%]">Harga</div>
                      <div className="w-[20%]">Jumlah</div>
                      <div className="w-[20%]">QTY</div>
                    </div>

                    {FashionCartItems.map((item, index) => (
                      <div key={item._id.toString()}>
                        <FashionKasirPopover
                          item={item}
                          indexOnCart={index}
                          handleChange={handleChange}
                          productsForm={productsForm}
                          FashionCartItems={FashionCartItems}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="flex items-center justify-end w-full mt-5 gap-1">
                <div className="w-[12rem] ">
                  <h1 className="h-full items-center flex justify-center text-sm font-semibold">
                    Total:
                    <div className="flex flex-col leading-4 text-end ml-2">
                      {totalPrice.discountPrice != totalPrice.normalPrice && (
                        <span className="text-secondary ">
                          Rp. {totalPrice.discountPrice.toLocaleString()}
                        </span>
                      )}
                      <span
                        className={`text-secondary ${
                          totalPrice != totalPrice.discountPrice &&
                          "line-through opacity-[0.6] "
                        } w-full`}
                      >
                        Rp. {totalPrice.normalPrice.toLocaleString()}
                      </span>
                      {totalPrice.cashbackPrice > 0 && (
                        <span className="text-primaryThin">
                          + Rp. {totalPrice.cashbackPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </h1>
                </div>

                <Button
                  variant="secondary"
                  onClick={() => handleBuy()}
                  className={`ml-auto`}
                >
                  Buy
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SHOW MORE */}
      <ShowMore
        showPopover={showMore}
        togglePopover={() => toggleShowMore({ data: null })}
        FashionCartItems={FashionCartItems}
        addToCart={addToCart}
        data={showMoreData}
      />

      <Toaster />

      <div className="bg-thirdyThin w-full pl-12 pr-2 sm:px-20 lg:px-32 pb-20 pt-10  min-h-screen text-gray-600">
        {/* BUY BUTTON */}
        {FashionCartItems.length > 0 && (
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
            <div className="h-auto  w-full bg-white rounded-2xl shadow-lg p-5">
              {/* TOP */}
              <div className="flex mb-2 ">
                <h1 className="text-3xl mb-1 drop-shadow-sm h-full font-semibold text-primaryNormal">
                  Filter
                </h1>
              </div>
              <div className="flex gap-3">
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
              </div>
            </div>

            {/* PRODUCT */}
            <div>
              {/* PRODUCT TITTLE */}
              <Title title={"Fashions"} />

              {/* PRODUCT */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-10 lg:grid-cols-3 xl:gap-x-4">
                {isLoadingFetch &&
                  [...Array(10)].map((i) => (
                    <div
                      key={i}
                      className={`relative bg-white transition-all shadow-lg animate-pulse rounded-2xl`}
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
                {filteredFashions.map((product, index) => {
                  // console.log("PENENTIAN", product, index);
                  let priceRange = "";
                  let lowestPrice = Infinity;
                  let highestPrice = -Infinity;
                  product?.variants?.forEach((variant) => {
                    for (let i = 0; i < variant?.size?.length; i++) {
                      const productPrice = variant?.size[i]?.price;
                      if (productPrice < lowestPrice) {
                        lowestPrice = productPrice;
                      }
                      if (productPrice > highestPrice) {
                        highestPrice = productPrice;
                      }
                    }
                  });

                  if (lowestPrice === highestPrice) {
                    priceRange = highestPrice?.toLocaleString();
                  } else {
                    priceRange = `${lowestPrice?.toLocaleString()}`;
                  }
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => {
                        toggleShowMore({
                          data: product,
                        });
                      }}
                      key={product._id.toString()}
                      className={`${
                        FashionCartItems.includes(product._id.toString())
                          ? "border-4 border-primaryThin opacity-[0.6] scale-[0.95] shadow-lg group hover:shadow-xl"
                          : " shadow-lg group hover:shadow-xl"
                      } rounded-2xl m-1 group relative bg-white inset-[0.1rem] hover:inset-0 overflow-hidden transition-all `}
                    >
                      <div className=" w-full relative overflow-hidden rounded-b-2xl bg-gray-200 group-hover:opacity-[0.85]  transition-all aspect-square">
                        <div className="absolute h-full w-full z-[1] flex items-end">
                          {product?.productPromos?.map((item, index) => (
                            <img
                              key={index}
                              src={item.imageUrl}
                              className="h-6 sm:h-12 mr-1 aspect-square object-cover object-center drop-shadow-xl rounded-sm"
                              alt=""
                            />
                          ))}
                        </div>
                        <img
                          src={product?.imageUrl[0]?.url}
                          alt={product.name}
                          className="h-full w-full object-cover absolute object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="my-2 mx-4 flex flex-col justify-between">
                        <div>
                          <h3 className="text-[0.6rem] sm:text-sm text-gray-700">
                            <div className="flex truncate">
                              <h1 className="font-semibold mr-1">
                                {product.name}
                              </h1>
                              - {product.brand}
                            </div>
                          </h3>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-[0.6rem] sm:text-sm font-medium ">
                            {product.stock}
                          </p>
                          <p className="text-[0.6rem] sm:text-sm font-semibold text-secondary">
                            Rp. {priceRange}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

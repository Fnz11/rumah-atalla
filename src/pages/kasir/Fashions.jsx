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
import Title2 from "../../components/Title2";
import FashionKasirSection from "../../components/Kasir/FashionKasirSection";
import FashionKasirSectionSkeleton from "../../components/Kasir/FashionKasirSectionSkeleton";
import FashionHeadPopover from "../../components/Kasir/FashionHeadPopover";
import TextField from "../../components/TextField";
import LogoPopover from "../../components/LogoPopover";
import BlackScreenPopover from "../../components/BlackScreenPopover";
import LoadingPopover from "../../components/LoadingPopover";
import SearchBar from "../../components/SearchBar";
import BuyButton from "../../components/Kasir/BuyButton";

export default function FashionsKasir() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;

  // FETCHHHH
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  // FETCH FASHION
  const [fashionProducts, setFashionProducts] = useState([]);
  const [triger, setTriger] = useState(1);

  const fetchFashionProducts = async () => {
    setIsLoadingFetch(true);
    await axios
      .get(DBURL + "/products/")
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
      .get(DBURL + "/promos/", {
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
      const response = await axios.get(DBURL + "/transactions/", {
        headers: {
          Authorization: token,
        },
      });

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
      DBURL + `/users/` + user.userId,
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
    kasirId: "",
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
      kasirId: user?.userId,
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
    setIsLoading(true);
    await axios
      .post(DBURL + "/transactions", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then(async (res) => {
        toast.custom((t) => (
          <CustomToast t={t} message="Transaction successed" type="success" />
        ));
        updateUser();
        setFormData({ 
          buyer: "",
          kasir: "",
          kasirId: "",
          type: "fashions",
          store: "web",
          products: [],
          totalAmount: 0,
          qty: 0,
          status: "pending",
        });
        fetchFashionProducts();
        setFashionCartItems([]);
        setBuyer("");
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
      const { name, qty, price, size, sizes, variant, variants, _id } = item;
      const newName = `${name} - ${variant.name} - ${size.size}`;
      const totalPrice = price * qty;
      const totalDiscount = size.discountPrice * qty;
      const totalCashback = size.cashBackTotal * qty;

      return {
        variants: variants,
        sizes: sizes,
        productId: _id,
        name: newName,
        indexSize: size.indexSize,
        indexVariant: variant.indexVariant,
        stock: size.stock,
        qty: qty,
        price: totalPrice,
        discount: totalDiscount,
        cashback: totalCashback,
      };
    });
    console.log("NENENENENEW", newFashionCartItems);
    setProductsForm(newFashionCartItems);
  };

  useEffect(() => {
    converToProductForm();
  }, [FashionCartItems]);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

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
            <BlackScreenPopover onClick={togglePopover} isLoading={isLoading} />
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`bg-thirdyThin relative w-[40rem] h-[47rem] max-h-[95%] overflow-hidden pt-0  p-5 z-[1] rounded-2xl shadow-lg ${
                isLoading && "pointer-events-none"
              } `}
            >
              {/* LOADING */}
              {isLoading && <LoadingPopover />}

              {/* LOGO */}
              <LogoPopover />

              {/* FORM */}
              <form action="" className="flex flex-col gap-5">
                <TextField
                  name="buyer"
                  onName={"Atas nama"}
                  placeholder={"example"}
                  value={buyer}
                  onChange={(e) => setBuyer(e.target.value)}
                />
              </form>

              {/* ITEM */}
              <div className="w-full h-[60%] overflow-y-scroll overflow-x-hidden">
                {FashionCartItems.length > 0 && (
                  <>
                    {/* TITTLE */}
                    <Title title={"Fashions"} className={"my-5"} />
                    {/* TOP */}
                    <FashionHeadPopover />

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

      <div className=" w-full  pb-20 pt-10  min-h-screen text-primaryDark">
        {/* BUY BUTTON */}
        <BuyButton
          onClick={() => togglePopover()}
          isShow={FashionCartItems.length > 0}
        />

        {/* CONTENT */}
        <div className="">
          <div className="flex flex-col">
            {/* FILTER */}
            <div className="h-auto  w-full bg-section-rainbow rounded-2xl shadow-lg p-5">
              {/* TOP */}
              <Title2 title="Filter" />

              <div className="flex gap-3">
                {/* SEARCH BY NAME*/}
                <SearchBar
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search by name..."
                />
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
                    <>
                      <FashionKasirSectionSkeleton />
                    </>
                  ))}
                {filteredFashions.map((product, index) => (
                  <FashionKasirSection
                    props={product}
                    key={index}
                    FashionCartItems={FashionCartItems}
                    toggleShowMore={toggleShowMore}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

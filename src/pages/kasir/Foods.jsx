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
import Title2 from "../../components/Title2";
import BlackScreenPopover from "../../components/BlackScreenPopover";
import LoadingPopover from "../../components/LoadingPopover";
import LogoPopover from "../../components/LogoPopover";
import TextField from "../../components/TextField";
import FoodsHeadPopover from "../../components/Kasir/FoodsHeadPopover";
import BuyButton from "../../components/Kasir/BuyButton";
import SearchBar from "../../components/SearchBar";
import FashionKasirSectionSkeleton from "../../components/Kasir/FashionKasirSectionSkeleton";
import FoodsKasirSection from "../../components/Kasir/FoodsKasirSection";
import ChangePageButton from "../../components/ChangePageButton";

export default function FoodsKasir() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;

  // FETCHHHH
  const [isLoadingFetch, setIsLoadingFetch] = useState(true);
  // FETCH FOODS
  const [foodsProducts, setFoodsProducts] = useState([]);
  const [triger, setTriger] = useState(1);
  const fetchFoodsProducts = async () => {
    await axios.get(DBURL + "/foods").then((res) => {
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
      .get(DBURL + "/promos/", {
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
      .get(DBURL + "/transactions/", {
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
        DBURL + `/users/` + user.userId,
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
      .post(DBURL + "/transactions", formData, {
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
            <BlackScreenPopover
              onClick={() => togglePopover()}
              isLoading={isLoading}
            />
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={` ${
                isLoading && "pointer-events-none"
              } relative overflow-hidden bg-thirdyThin  w-[40rem] h-[47rem] max-h-[98%] p-5 pt-0 z-[1] rounded-2xl shadow-md `}
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
                {foodsPop.length > 0 && (
                  <>
                    {/* TITLE */}
                    <Title className={"my-3"} title="Foods" />
                    {/* TOP */}
                    <FoodsHeadPopover />

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
                    {/* TITLE */}
                    <Title className={"my-3"} title="Drinks" />
                    {/* TOP */}
                    <FoodsHeadPopover />

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

      <div className=" w-full  pb-20 pt-10  min-h-screen text-gray-600">
        {/* BUY BUTTON */}
        <BuyButton
          onClick={() => togglePopover()}
          isShow={drinksCartItems.length > 0 || foodsCartItems.length > 0}
        />

        {/* CONTENT */}
        <div className="flex flex-col">
          {/* FILTER */}
          <div className="h-auto  w-full bg-section-rainbow rounded-2xl shadow-xl p-5">
            {/* TOP */}
            <Title2 title="Filter" />
            <div className="flex sm:flex-row flex-col gap-3">
              {/* SEARCH BY NAME*/}
              <SearchBar
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search by name..."
              />
            </div>
            {/* BOTTOM */}
            <div className="w-full flex max-sm:flex-col items-center gap-2 mt-5">
              <ChangePageButton
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl6SzfGl7TUhR-NEd2sL_rwbaBq-7dRG2Cxg&usqp=CAU"
                setPage={() => setPage("foods")}
                page={page}
                text={"Foods"}
              />
              <ChangePageButton
                image="https://wallpapers.com/images/hd/cocktail-drinks-glasses-on-black-background-7p9nyavhgxq3anzo.jpg"
                setPage={() => setPage("drinks")}
                page={page}
                text={"Drinks"}
              />
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
                  <>
                    <FashionKasirSectionSkeleton />
                  </>
                ))}
              {page === "foods" &&
                filteredFoods.map((product) => (
                  <FoodsKasirSection
                    key={product._id.toString()}
                    props={product}
                    addToCart={addToCart}
                    CartItems={foodsCartItems}
                    promos={promos}
                    type={"foods"}
                  />
                ))}
              {page === "drinks" &&
                filteredDrinks.map((product) => (
                  <FoodsKasirSection
                    key={product._id.toString()}
                    props={product}
                    addToCart={addToCart}
                    CartItems={drinksCartItems}
                    promos={promos}
                    type={"drinks"}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

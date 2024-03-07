/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FoodsKasirPopover from "../../components/Kasir/FoodsKasirPopover";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
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
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (promos.length === 0) {
      fetchPromos();
    }
    if (foodsProducts.length === 0) {
      fetchFoodsProducts();
    }
  }, []);

  // FOODS / DRINK
  const [totalPrice, setTotalPrice] = useState({
    normalPrice: 0,
    discountPrice: 0,
    cashbackPrice: 0,
  });
  const [page, setPage] = useState("foods");

  // CART
  const [productsForm, setProductsForm] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (productsForm.length <= 0 && showPopover) {
      togglePopover();
    }
  }, [productsForm]);

  const addToCart = (item, value = null) => {
    //  ITEM IS PRODUCT DATA, VALUE IS QTY VALUE
    console.log("ITEMMMM", item, value);

    // FIND THE PRODUCT IN CARTITEMS
    const itemOnCartIndex = cartItems.findIndex(
      (product) => product?._id === item?._id
    );

    // MAKE UPDATED CART ITEMS
    let updatedCartItems = [...cartItems];

    // CHECK IF THE PRODUCT IS EXIST ON THE CART OR NOT, IF YES THEN
    if (itemOnCartIndex >= 0) {
      // CHECK VALUE PARAM, IF THE VALUE IS 0 THEN REMOVE IT ON THE CART ITEMS
      if (value === 0) {
        updatedCartItems[itemOnCartIndex].qty = 0;
        updatedCartItems.splice(itemOnCartIndex, 1);
        setCartItems(updatedCartItems);
        return;
      }

      // IF NOT, THEN CHANGE THE QTY VALUE OF THE ITEM ON CART
      updatedCartItems[itemOnCartIndex].qty = value;
      setCartItems(updatedCartItems);
      return;
    }

    // IF THE PRODUCT DOESNT EXIST ON THE CART, THEN ADD IT INTO THE CART
    setCartItems([...cartItems, item]);
  };

  console.log(cartItems);

  // HANDLE BUY
  const [buyer, setBuyer] = useState("");

  // LOADING
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    buyer: "",
    kasir: "",
    kasirId: "",
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
      kasirId: user?.userId,
      totalAmount: totalPrice.normalPrice,
      totalWithDiscount: totalPrice.discountPrice,
      totalCashback: totalPrice.totalCashback,
    }));
  }, [productsForm, buyer, totalPrice]);

  const handleBuy = async () => {
    console.log("BUYBUY", formData, totalPrice);
    setIsLoading(true);
    await axios
      .post(DBURL + "/transactions", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // updateUser();
        toast.custom((t) => (
          <CustomToast t={t} message="Transaction successed" type="success" />
        ));
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
        fetchFoodsProducts();
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

  useEffect(() => {
    if (cartItems.length <= 0 && showPopover) {
      togglePopover();
    }
  }, [cartItems]);

  //   POPOVER
  const [showPopover, setShowPopover] = useState(false);
  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  useEffect(() => {
    const newFoodsProducts = foodsProducts.map((product) => {
      let discountNominal = 0;
      let discountPersentase = 0;
      let cashbackNominal = 0;
      let cashbackPersentase = 0;
      let discountPrice = 0;
      let cashBackTotal = 0;
      let productPromos = [];
      promos.map((promo, i) => {
        let included = false;
        const currentDate = new Date();

        if (
          promo.products.includes(product._id) &&
          new Date(promo.date.startDate) < currentDate &&
          new Date(promo.date.endDate) > currentDate
        ) {
          included = true;
        }
        console.log("INCLUD KAHH" + promo.name, included);
        if (included) {
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
        discountPrice =
          product.price -
          discountNominal -
          (product.price * discountPersentase) / 100;
        cashBackTotal =
          cashbackNominal + (product.price * cashbackPersentase) / 100;
      });
      return {
        ...product,
        discountPrice,
        cashBackTotal,
        productPromos: productPromos,
        discountNominal: discountNominal,
        discountPersentase: discountPersentase,
        cashbackNominal: cashbackNominal,
        cashbackPersentase: cashbackPersentase,
      };
    });
    setFoodsProducts(newFoodsProducts);
  }, [promos, triger]);

  useEffect(() => {
    let newProductForm = [];
    cartItems.map((product) => {
      const newProduct = {
        productId: product._id,
        name: product.name,
        qty: product.qty,
        stock: product.stock,
        price: product.price * product.qty,
        cashback: product.cashbackNominal * product.qty,
        discount: product.discountNominal * product.qty,
        promo: product.productPromos,
      };
      newProductForm.push(newProduct);
    });
    setProductsForm(newProductForm);
  }, [cartItems]);

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
    setTotalPrice({
      normalPrice: totalPrice,
      discountPrice: totalDiscount,
      totalCashback: totalCashback,
    });
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
                {cartItems.length > 0 && (
                  <>
                    {cartItems.findIndex((item) => item.type == "foods") >=
                      0 && (
                      <>
                        {/* TITLE */}
                        <Title className={"my-3"} title="Foods" />
                        {/* TOP */}
                        <FoodsHeadPopover />

                        {cartItems.map((item, index) => {
                          if (item.type == "drinks") return;
                          return (
                            <div key={item._id}>
                              <FoodsKasirPopover
                                indexOnCart={index}
                                addToCart={addToCart}
                                setCartItems={setCartItems}
                                item={item}
                                productsForm={productsForm}
                                cartItems={cartItems}
                                promos={promos}
                              />
                            </div>
                          );
                        })}
                      </>
                    )}
                    {cartItems.findIndex((item) => item.type == "drinks") >=
                      0 && (
                      <>
                        {/* TITLE */}
                        <Title className={"my-3"} title="Drinks" />
                        {/* TOP */}
                        <FoodsHeadPopover />

                        {cartItems.map((item, index) => {
                          if (item.type == "foods") return;
                          return (
                            <div key={item._id}>
                              <FoodsKasirPopover
                                indexOnCart={index}
                                setQty={setCartItems}
                                item={item}
                                productsForm={productsForm}
                                cartItems={cartItems}
                                promos={promos}
                              />
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-center justify-end w-full mt-5 gap-5">
                <div className="w-[12rem] ">
                  <h1 className="h-full items-center flex justify-center text-sm  font-semibold">
                    Total:
                    <div className="flex flex-col text-end ml-2 leading-4">
                      {totalPrice.discountPrice != totalPrice.normalPrice && (
                        <span className="text-purple  ">
                          Rp. {totalPrice.discountPrice?.toLocaleString()}
                        </span>
                      )}
                      <span
                        className={` text-secondary ${
                          totalPrice.normalPrice != totalPrice.discountPrice &&
                          "line-through opacity-[0.6] "
                        } w-full  `}
                      >
                        Rp. {totalPrice.normalPrice?.toLocaleString()}
                      </span>
                      {totalPrice.cashbackPrice > 0 && (
                        <span className="text-orange  ">
                          + Rp. {totalPrice.cashbackPrice?.toLocaleString()}
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
      <div className=" w-full  pb-20 pt-10  min-h-screen text-primaryDark">
        {/* BUY BUTTON */}
        <BuyButton
          onClick={() => togglePopover()}
          isShow={cartItems.length > 0}
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
                text={"foods"}
              />
              <ChangePageButton
                image="https://wallpapers.com/images/hd/cocktail-drinks-glasses-on-black-background-7p9nyavhgxq3anzo.jpg"
                setPage={() => setPage("drinks")}
                page={page}
                text={"drinks"}
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
                    CartItems={cartItems}
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
                    CartItems={cartItems}
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import BlackScreenPopover from "../components/BlackScreenPopover";
import LoadingPopover from "../components/LoadingPopover";
import LogoPopover from "../components/LogoPopover";
import TextField from "../components/TextField";
import Title from "../components/Title";
import FashionHeadPopover from "../components/Kasir/FashionHeadPopover";
import FashionKasirPopover from "../components/Kasir/FashionKasirPopover";
import Button from "../components/Button";
import ShowMore from "../components/Kasir/ShowMore";
import BuyButton from "../components/Kasir/BuyButton";
import Title2 from "../components/Title2";
import SearchBar from "../components/SearchBar";
import FashionKasirSectionSkeleton from "../components/Kasir/FashionKasirSectionSkeleton";
import FashionKasirSection from "../components/Kasir/FashionKasirSection";

export default function FashionProducts() {
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

  useEffect(() => {
    fetchPromos();
    fetchFashionProducts();
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
  const handleFashionCartItems = (item) => {
    addToCart(item);
  };
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

  const [formData, setFormData] = useState({
    buyer: "",
    products: [],
    totalAmount: 0,
    createdAt: Date.now(),
  });
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      products: productsForm,
      buyer: buyer,
      totalAmount: totalPrice.normalPrice,
      totalWithDiscount: totalPrice.discountPrice,
      totalCashback: totalPrice.cashbackPrice,
    }));
  }, [productsForm, buyer]);

  const handleBuy = async () => {
    // setIsLoading(true);
    console.log("BUUYY", formData);
    const whatsappNumber = "+6282138540196";
    let message = `Halo, Saya ${formData.buyer} ingin memesan produk sebagai berikut:\n`;
    formData.products.forEach((product, index) => {
      let isDiscount = product.price !== product.discount;
      let isCashback = product.cashback !== 0;
      let price = product.price / product.qty;
      let discount = (product.discount - product.price) / product.qty;
      let cashback = product.cashback / product.qty;
      if (isDiscount) {
        price = product.discount / product.qty;
      }
      message += `\n${index + 1}. ${
        product.name
      } - Rp ${price.toLocaleString()}${
        isDiscount ? " (Diskon Rp " + discount.toLocaleString() + ")" : ""
      }${
        isCashback ? " (Cashback +Rp " + cashback.toLocaleString() + ")" : ""
      }, Qty: ${product.qty}, *Total: Rp ${(
        price * product.qty
      ).toLocaleString()}*\n`;
    });
    if (formData.totalCashback > 0) {
      message += `\nCashback: +Rp ${formData.totalCashback.toLocaleString()}\n`;
    }
    if (formData.totalDiscount > 0) {
      message += `\nDiskon: -Rp ${(
        formData.totalDiscount - formData.totalAmount
      ).toLocaleString()}\n`;
      message += `\nNormal: Rp ${formData.totalAmount.toLocaleString()}\n`;
    }
    message += `\n*Total: Rp ${formData.totalWithDiscount.toLocaleString()}*\n`;
    console.log("MESMES", message);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
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

  useEffect(() => {
    if (FashionCartItems.length <= 0 && showPopover) {
      togglePopover();
    }
  }, [FashionCartItems]);

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
        let included = false;
        const currentDate = new Date();

        if (
          promo.products.includes(product._id.toString()) &&
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
  useEffect(() => {
    // get from params
    const getSearchValue = new URLSearchParams(window.location.search).get(
      "search"
    );
    if (getSearchValue) {
      setSearchValue(getSearchValue);
    }
  }, []);
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
    <div className="flex items-center justify-center pt-20 w-full">
      <div className="w-[93%] lg:w-[80%] flex flex-col items-center justify-center">
        {/* POPOVER */}
        <AnimatePresence>
          {showPopover && (
            <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
              <BlackScreenPopover
                onClick={togglePopover}
                isLoading={isLoading}
              />
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className={`bg-thirdyThin relative w-[40rem] h-[80vh] sm:h-[47rem] max-h-[95%] overflow-hidden pt-0  p-5 z-[1] rounded-2xl shadow-lg ${
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
                <div className="w-full h-[55%] sm:h-[60%] overflow-y-scroll overflow-x-hidden">
                  {FashionCartItems.length > 0 && (
                    <>
                      {/* TITTLE */}
                      <Title title={"Fashions"} className={"my-5"} />
                      {/* TOP */}
                      <FashionHeadPopover />

                      {FashionCartItems.map((item, index) => (
                        <div key={item?._id}>
                          <FashionKasirPopover
                            item={item}
                            indexOnCart={index}
                            handleChange={handleChange}
                            productsForm={productsForm}
                            FashionCartItems={FashionCartItems}
                            handleFashionCartItems={handleFashionCartItems}
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
                          <span className="text-purple ">
                            Rp. {totalPrice.discountPrice.toLocaleString()}
                          </span>
                        )}
                        <span
                          className={`text-secondary ${
                            totalPrice.discountPrice !=
                              totalPrice.normalPrice &&
                            "line-through opacity-[0.6] "
                          } w-full`}
                        >
                          Rp. {totalPrice.normalPrice.toLocaleString()}
                        </span>
                        {totalPrice.cashbackPrice > 0 && (
                          <span className="text-orange">
                            + Rp. {totalPrice.cashbackPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </h1>
                  </div>
                  <Button
                    variant={"red"}
                    onClick={togglePopover}
                    className={"flex items-center justify-center ml-auto"}
                  >
                    <i className="fa-solid fa-angle-left mr-2"></i>
                    Back
                  </Button>
                  <Button
                    onClick={() => handleBuy()}
                    className={"flex items-center justify-center"}
                  >
                    <i className="fa-solid fa-cart-shopping mr-2"></i>
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
      </div>
    </div>
  );
}

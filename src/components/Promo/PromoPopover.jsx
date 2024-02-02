/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../../components/CustomToast";

/* eslint-disable react/prop-types */
export default function PromoPopover(props) {
  // PAGE
  const [page, setPage] = useState(1);
  const [tipe, setTipe] = useState("fashions");
  useEffect(() => {
    if (props.type === "foods") {
      setTipe("foods");
    }
  }, [props]);

  // FETCHHHH
  const [products, setProducts] = useState([]);
  const fetchFashionProducts = async () => {
    await axios
      .get("http://localhost:3000/api/products/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchFoodProducts = async () => {
    await axios
      .get("http://localhost:3000/api/foods")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setProducts([]);
    if (props.type === "fashions") {
      fetchFashionProducts();
    } else if (props.type === "foods") {
      fetchFoodProducts();
    }
  }, [props]);

  // OUT POPOVER
  const handleOutPopover = () => {
    setFashionSelected([]);
    setPage(1);
    setEndDate("");
    setStartDate("");
    setFormData({
      name: "",
      imageUrl: "",
      type: "",
      value: null,
      date: {
        startDate: "",
        endDate: "",
      },
      products: [],
      description: "",
      for: "fashions",
    });
    props.togglePopover("", null);
  };

  const [fashionSelected, setFashionSelected] = useState([]);
  const addToCart = (item) => {
    if (fashionSelected.includes(item)) {
      const updatedFashionSelects = fashionSelected.filter((i) => i !== item);
      setFashionSelected(updatedFashionSelects);
      return;
    }
    setFashionSelected([...fashionSelected, item]);
  };

  //   FILTER
  const [searchValue, setSearchValue] = useState("");
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const type = {
    "diskon persentase": true,
    "cashback persentase": true,
    "cashback nominal": true,
    "diskon nominal": true,
  };

  // HANDLE POST
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    type: "",
    value: null,
    date: {
      startDate: "",
      endDate: "",
    },
    products: [],
    description: "",
    for: "fashions",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    if (props.data) {
      if (props.data.date) {
        setStartDate(
          new Date(props.data?.date?.startDate).toISOString().split("T")[0]
        );
        setEndDate(
          new Date(props.data?.date?.endDate).toISOString().split("T")[0]
        );
      }
      setFormData({
        name: props?.data?.name,
        imageUrl: props?.data?.imageUrl,
        type: props?.data?.type,
        value: props?.data?.value,
        date: {
          startDate,
          endDate,
        },
        products: props?.data?.products,
        description: props?.data?.description,
        for: props?.data?.for,
      });
      setSelectedType(props.data.type);
      setFashionSelected(props.data.products);
    }
  }, [props, startDate, endDate]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate" || name === "endDate") {
      setFormData((prevData) => ({
        ...prevData,
        date: {
          ...prevData.date,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("INI IMAGE", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      type: selectedType,
      products: [...fashionSelected],
      for: tipe,
    }));
  }, [fashionSelected, selectedType, tipe]);

  // LOADING
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async () => {
    console.log("LIHATLAH INI", formData);
    setIsLoading(true);

    await axios
      .post("http://localhost:3000/api/promos", formData, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("BERHASIL UPPPPP", res.data);
        props.refetch();
        toast.custom((t) => (
          <CustomToast t={t} message="Add promo successed" type="success" />
        ));
        handleOutPopover();
      })
      .catch((err) => {
        console.log(err);
        toast.custom((t) => (
          <CustomToast t={t} message="Add promo failed" type="failed" />
        ));
        setPage(1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handlePatch = async () => {
    setIsLoading(true);

    await axios
      .patch(
        "http://localhost:3000/api/promos/" + props.data?._id?.toString(),
        formData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("BERHASIL PAAATTTT", res.data);
        props.refetch();
        toast.custom((t) => (
          <CustomToast t={t} message="Edit promo successed" type="success" />
        ));
        handleOutPopover();
      })
      .catch((err) => {
        console.log(err);
        toast.custom((t) => (
          <CustomToast t={t} message="Edit promo successed" type="failed" />
        ));
        setPage(1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleDelete = async () => {
    setIsLoading(true);

    await axios
      .delete(
        "http://localhost:3000/api/promos/" + props.data?._id?.toString(),
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("BERHASIL DELEEETT", res.data);
        props.refetch();
        toast.custom((t) => (
          <CustomToast t={t} message="Delete promo successed" type="success" />
        ));
        handleOutPopover();
      })
      .catch((err) => {
        console.log(err);
        toast.custom((t) => (
          <CustomToast t={t} message="Delete promo failed" type="failed" />
        ));
        setPage(1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function addDotsToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <>
      <Toaster />
      <AnimatePresence>
        {(props.showPopover === "add" || props.showPopover === "edit") && (
          <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleOutPopover()}
              className={` ${
                isLoading && "pointer-events-none"
              } w-screen h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm absolute`}
            ></motion.div>
            {(page === 1 || page === 2) && (
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -1000 }}
                transition={{ duration: 0.1 }}
                className={`${
                  isLoading && "pointer-events-none"
                } relative overflow-hidden bg-thirdyThin  w-[24rem] px-7 sm:px-10 sm:w-[40rem] mx-10 ${
                  page === 1 ? "h-[40rem] sm:h-[36rem]" : "h-[95%]"
                } transition-all duration-300 p-5 z-[1] rounded-2xl shadow-md`}
              >
                {/* LOADING */}
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
                <div className="flex w-full -ml-2 justify-center drop-shadow items-center ">
                  <img
                    src="/LogoGreen.png"
                    className="scale-[2.3] pointer-events-none w-[8rem] h-[8rem] aspect-square"
                    alt="Logo"
                  />
                  <div className="uppercase ml-1 text-[2.8rem] leading-[3rem] mb-[0.5rem] text-primaryNormal hidden sm:block">
                    <h1 className="-mb-[0.4rem]">Rumah</h1>
                    <h1 className="font-bold">Atalla</h1>
                    <div className="w-[120%] h-[0.3rem] -my-[0.15rem] rounded-md bg-primaryNormal" />
                  </div>
                </div>

                {page === 1 && (
                  <>
                    {/* TITTLE */}
                    <div className="flex items-center gap-3 w-full mb-2">
                      <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
                      <h1 className="w-[47rem] sm:w-[45rem] text-[1.6rem] sm:text-[2rem] text-center font-semibold text-primaryNormal drop-shadow-md">
                        {props.showPopover === "add"
                          ? "Add Promo"
                          : "Edit Promo"}
                      </h1>
                      <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
                    </div>

                    {/* FORM */}
                    <form action="" className="flex flex-col gap-3">
                      <div className="flex gap-3">
                        {/* LEFT */}
                        <div className="w-full gap-3 flex flex-col">
                          <div>
                            <label
                              className="text-base drop-shadow-sm font-semibold text-primaryNormal"
                              htmlFor="name"
                            >
                              Nama
                            </label>
                            <input
                              type="text"
                              name="name"
                              placeholder="example"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                            />
                          </div>

                          <div className="w-full flex gap-3">
                            {/* TYPE */}
                            <div className="max-sm:hidden w-[50%] ml-auto flex flex-col justify-left  text-primaryNormal font-semibold ">
                              <label>Tipe</label>
                              <select
                                id="promoType"
                                name="type"
                                className="py-[0.87rem] bg-white drop-shadow-sm outline-gray-200 text-gray-600 outline-[0.1px] border-none px-2 font-medium rounded-md text-base"
                                value={formData.type}
                                onChange={(e) =>
                                  setSelectedType(e.target.value)
                                }
                              >
                                {Object.keys(type).map((type) => (
                                  <option
                                    className="text-gray-600 capitalize"
                                    key={type}
                                    value={type}
                                  >
                                    {type
                                      .split(" ")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1)
                                      )
                                      .join(" ")}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {/* VALUE */}
                            <div className="flex flex-col w-full sm:w-[50%]">
                              <label
                                className="text-base drop-shadow-sm font-semibold text-primaryNormal"
                                htmlFor="text"
                              >
                                Value
                              </label>
                              <input
                                type="text"
                                name="value"
                                placeholder="promo value"
                                value={formData.value}
                                onChange={handleInputChange}
                                className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                              />
                            </div>
                          </div>
                          <div className="flex gap-3 w-full max-sm:hidden">
                            {/* START DATE */}
                            <div className="w-full">
                              <label
                                className="text-base drop-shadow-sm font-semibold text-primaryNormal"
                                htmlFor="start-date"
                              >
                                Tanggal Mulai
                              </label>
                              <input
                                type="date"
                                name="startDate"
                                id="start-date"
                                value={formData.date.startDate}
                                onChange={handleInputChange}
                                className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                              />
                            </div>
                            {/* END DATE */}
                            <div className="w-full">
                              <label
                                className="text-base drop-shadow-sm font-semibold text-primaryNormal"
                                htmlFor="end-date"
                              >
                                Tanggal Berakhir
                              </label>
                              <input
                                type="date"
                                id="end-date"
                                name="endDate"
                                value={formData.date.endDate}
                                onChange={handleInputChange}
                                className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                              />
                            </div>
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="gap-3 flex flex-col">
                          {/* IMAGE */}
                          <div>
                            <label
                              className="text-base  drop-shadow-sm font-semibold text-primaryNormal ml-2"
                              htmlFor="name"
                            >
                              Image
                            </label>
                            <div className="w-[7.3rem] sm:w-[13.2rem] relative cursor-pointer aspect-square flex flex-col justify-center items-center border-2 border-dashed border-blue-400 bg-white rounded-2xl overflow-hidden">
                              <input
                                type="file"
                                accept="image/*"
                                name="imageFile"
                                onChange={handleImageUpload}
                                className="w-full opacity-0 absolute h-full cursor-pointer"
                                // className="block w-full bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg"
                              />
                              {formData.imageUrl ? (
                                <img
                                  src={formData.imageUrl}
                                  alt="Image Preview"
                                  className="block h-full w-full object-cover "
                                />
                              ) : (
                                <div className="flex flex-col gap-5 mt-2 items-center justify-center ">
                                  <i className="fa-solid fa-cloud-arrow-up fa-2xl text-blue-400"></i>
                                  <h1 className="text-sm text-gray-600">
                                    Upload Image 4x4 Here
                                  </h1>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 sm:hidden">
                        {/* START DATE */}
                        <div className="w-full">
                          <label
                            className="text-base drop-shadow-sm font-semibold text-primaryNormal"
                            htmlFor="start-date"
                          >
                            Tanggal Mulai
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            id="start-date"
                            value={formData.date.startDate}
                            onChange={handleInputChange}
                            className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                          />
                        </div>
                        {/* END DATE */}
                        <div className="w-full">
                          <label
                            className="text-base drop-shadow-sm font-semibold text-primaryNormal"
                            htmlFor="end-date"
                          >
                            Tanggal Berakhir
                          </label>
                          <input
                            type="date"
                            id="end-date"
                            name="endDate"
                            value={formData.date.endDate}
                            onChange={handleInputChange}
                            className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                          />
                        </div>
                      </div>
                      {/* TYPE */}
                      <div className="sm:hidden w-[48%] ml-auto flex flex-col justify-left  text-primaryNormal font-semibold ">
                        <label>Tipe</label>
                        <select
                          id="promoType"
                          name="type"
                          className="py-[0.87rem] bg-white drop-shadow-sm outline-gray-200 text-gray-600 outline-[0.1px] border-none px-2 font-medium rounded-md text-base"
                          value={formData.type}
                          onChange={(e) => setSelectedType(e.target.value)}
                        >
                          {Object.keys(type).map((type) => (
                            <option
                              className="text-gray-600 capitalize"
                              key={type}
                              value={type}
                            >
                              {type
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-3 mt-3">
                        {props.showPopover === "edit" && (
                          <>
                            <Button
                              variant="red"
                              onClick={() => handleDelete()}
                              className={"ml-auto"}
                            >
                              <i className="fa-solid fa-trash mr-2 scale-[0.95] fa-lg"></i>{" "}
                              Delete
                            </Button>
                          </>
                        )}
                        <Button
                          variant="secondary"
                          onClick={() => setPage(2)}
                          className={`${
                            props.showPopover === "add" && "ml-auto"
                          }`}
                        >
                          Next
                          <i className="fa-solid fa-arrow-right ml-2 fa-lg"></i>
                        </Button>
                      </div>
                    </form>
                  </>
                )}
                {page === 2 && (
                  <>
                    {/* FILTER */}
                    <div className="h-auto  w-full bg-white shadow-md mb-4 py-3 px-5 rounded-2xl p-2">
                      <h1 className=" mb-1 drop-shadow-sm h-full font-semibold text-primaryNormal">
                        Search
                      </h1>
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
                            className="block w-full placeholder:text-gray-300 bg-[#F6FAF2] focus:outline-white p-3 pl-10 text-sm text-gray-600 border rounded-lg "
                            placeholder="Search..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="w-full h-[55%] overflow-y-scroll overflow-x-hidden text-sm sm:text-base rounded-2xl">
                      <div className="flex w-full bg-secondary h-[3rem] font-semibold shadow-md inset-[0.2rem]  relative text-white items-center rounded-2xl px-2">
                        <div className="w-[20%]">Image</div>
                        <div className="w-[60%]">Nama Barang</div>
                        <div className="w-[20%]">Harga</div>
                      </div>
                      <div>
                        {filteredProducts.map((product) => (
                          <div
                            onClick={() => addToCart(product?._id?.toString())}
                            className={` ${
                              fashionSelected.includes(product._id?.toString())
                                ? "border-[4px] border-secondary opacity-[0.8] shadow-md  inset-0"
                                : "bg-white border-y-[1px] shadow-sm hover:shadow-md inset-[0.2rem]  hover:inset-0"
                            } cursor-pointer group flex w-full bg-white my-2 shadow-sm py-2 min-h-[3rem] text-gray-600 items-center rounded-2xl px-2 relative duration-200 transition-all `}
                            key={product._id?.toString()}
                          >
                            {/* IMAGE */}
                            <div className="w-[20%]">
                              <img
                                src={product.imageUrl}
                                alt={product.imageAlt}
                                className="w-[90%] aspect-square rounded-2xl"
                              />
                            </div>

                            {/* NAME */}
                            <div className="flex flex-col h-full justify-center w-[55%]">
                              <p className="-mb-1 font-semibold">
                                {product.name}
                              </p>
                              <p className="text-gray-600">{product.stock}</p>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex flex-col items-center justify-center w-[25%]">
                              <h1
                                className={` font-base font-semibold text-primaryNormal drop-shadow-sm`}
                              >
                                Rp. {addDotsToNumber(product.price)}
                              </h1>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BOTTOM */}
                    <div className="flex gap-3 mt-3">
                      <Button
                        variant="secondary"
                        onClick={() => setPage(1)}
                        className={`ml-auto`}
                      >
                        <i className="fa-solid fa-arrow-left mr-2 fa-lg"></i>
                        Prev
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={
                          props.showPopover === "add"
                            ? () => handlePost()
                            : () => handlePatch()
                        }
                      >
                        <i className="fa-solid fa-pen mr-2 scale-[0.95] fa-lg"></i>{" "}
                        {props.showPopover === "add" ? "Add" : "Edit"}
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../../components/CustomToast";

/* eslint-disable react/prop-types */
export default function FoodsProductPopover(props) {
  // PREV DATA
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    type: "drinks",
    description: "",
    stock: "",
    price: "",
  });

  useEffect(() => {
    if (props.data) {
      setFormData({
        name: props.data.name,
        imageUrl: props.data.imageUrl,
        type: props.data.type,
        description: props.data.description,
        stock: props.data.stock,
        price: props.data.price,
      });
    }
  }, [props]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "price" || name === "stock" ? parseInt(value, 10) || 0 : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log("INI IMAGE", file, reader);
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // POST
  const token = localStorage.getItem("token");
  const id = props.data?._id;
  // LOADING
  const [isLoading, setIsLoading] = useState(false);
  const postData = async () => {
    setIsLoading(true);
    await axios
      .post("http://localhost:3000/api/foods/", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        props.refetch();
        toast.custom((t) => (
          <CustomToast t={t} message="Add product successed" type="success" />
        ));
        setFormData({
          name: "",
          imageUrl: "",
          description: "",
          stock: "",
          status: "",
          store: "web",
          price: 0,
        });
        props.togglePopover("", null);
      })
      .catch((error) => {
        toast.custom((t) => (
          <CustomToast t={t} message="Add product failed" type="failed" />
        ));
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const patchData = async () => {
    setIsLoading(true);
    await axios
      .patch("http://localhost:3000/api/foods/" + id.toString(), formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("INI PATCH", response.data);
        props.refetch();
        toast.custom((t) => (
          <CustomToast t={t} message="Edit product successed" type="success" />
        ));
        setFormData({
          name: "",
          imageUrl: "",
          description: "",
          stock: "",
          status: "",
          store: "web",
          price: 0,
        });
        props.togglePopover("", null);
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Edit product failed" type="failed" />
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Fungsi untuk mengirim data setelah form di-submit
  const handleSubmit = async () => {
    console.log("LIHATLAH INI", formData);
    if (props.showPopover === "add") {
      postData();
    } else if (props.showPopover === "edit") {
      patchData();
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await axios
      .delete("http://localhost:3000/api/foods/" + id.toString(), {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        props.refetch();
        toast.custom((t) => (
          <CustomToast
            t={t}
            message="Delete product successed"
            type="success"
          />
        ));
        props.togglePopover("", null);
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Delete product failed" type="failed" />
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <AnimatePresence>
        {(props.showPopover === "add" || props.showPopover === "edit") &&
          props.popoverType === "foods" && (
            <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  props.togglePopover("", null);
                  setFormData({
                    name: "",
                    imageUrl: "",
                    type: "",
                    description: "",
                    stock: "",
                    price: "",
                  });
                }}
                className={` ${
                  isLoading && "pointer-events-none"
                } w-screen h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm absolute`}
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.3 }}
                className={` ${
                  isLoading && "pointer-events-none"
                } relative overflow-hidden bg-thirdyThin  w-[24rem] px-7 sm:px-10 sm:w-[40rem] mx-10 h-[39rem] sm:h-[42rem] p-5 z-[1] rounded-2xl shadow-md`}
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

                <div className="flex items-center gap-3 w-full mb-2">
                  <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
                  <h1 className="w-[37rem] sm:w-[35rem] text-[1.6rem] sm:text-[2rem] text-center font-semibold text-primaryNormal drop-shadow-md">
                    {props.showPopover === "add" ? "Add Foods" : "Edit Foods"}
                  </h1>
                  <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
                </div>

                {/* FORM */}
                <form action="" className="flex flex-col gap-3">
                  <div className="flex w-full gap-3">
                    {/* LEFT */}
                    <div className="w-full">
                      <label
                        className="text-base  drop-shadow-sm font-semibold text-primaryNormal"
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
                      {/* DESC */}
                      <div>
                        <label
                          className="text-base  drop-shadow-sm font-semibold text-primaryNormal"
                          htmlFor="description"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          placeholder="example"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="block w-full h-[8.6rem] sm:h-[10rem] placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                          style={{ resize: "none" }}
                        />
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
                        <div className="w-[8rem] sm:w-[14.5rem] relative cursor-pointer aspect-square flex flex-col justify-center items-center border-2 border-dashed border-blue-400 bg-white rounded-2xl overflow-hidden">
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
                      {/* TYPE */}
                      <div className="w-full sm:hidden">
                        <label
                          className="text-base drop-shadow-sm font-semibold text-primaryNormal"
                          htmlFor="type"
                        >
                          Type
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="block w-full bg-white focus:outline-white p-3 text-sm text-gray-600 rounded-lg"
                        >
                          <option value="drinks">Drinks</option>
                          <option value="foods">Foods</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full">
                    {/* PRICE */}
                    <div className="w-[75%] sm:w-[50%]">
                      <label
                        className="text-base  drop-shadow-sm font-semibold text-primaryNormal"
                        htmlFor="password"
                      >
                        Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        placeholder="90000"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                      />
                    </div>

                    {/* STOCK */}
                    <div className="w-[50%] sm:w-[20%]">
                      <label
                        className="text-base  drop-shadow-sm font-semibold text-primaryNormal"
                        htmlFor="email"
                      >
                        Stock
                      </label>
                      <input
                        type="text"
                        name="stock"
                        placeholder="100"
                        value={formData.stock}
                        onChange={handleInputChange}
                        className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                      />
                    </div>

                    {/* TYPE */}
                    <div className="w-[25%] sm:w-[30%] max-sm:hidden">
                      <label
                        className="text-base drop-shadow-sm font-semibold text-primaryNormal"
                        htmlFor="type"
                      >
                        Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="block w-full bg-white focus:outline-white p-3 text-sm text-gray-600 rounded-lg"
                      >
                        <option value="drinks">Drinks</option>
                        <option value="foods">Foods</option>
                      </select>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <div className="flex gap-3 mt-2 max-sm:justify-center">
                    {props.showPopover === "edit" && (
                      <Button
                        variant="red"
                        onClick={() => handleDelete()}
                        className={`ml-auto`}
                      >
                        <i className="fa-solid fa-trash mr-2 scale-[0.95] fa-lg"></i>{" "}
                        Delete
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      onClick={() => handleSubmit()}
                      className={`${props.showPopover === "add" && "ml-auto"}`}
                    >
                      <i className="fa-solid fa-pen mr-2 scale-[0.95] fa-lg"></i>{" "}
                      {props.showPopover === "add"
                        ? "Add Product"
                        : "Edit Product"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
      </AnimatePresence>
    </>
  );
}

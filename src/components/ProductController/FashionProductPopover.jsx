/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../../components/CustomToast";
import { Swiper, SwiperSlide } from "swiper/react";
import ReadMoreDescription from "./components/ReadMoreDescription";

/* eslint-disable react/prop-types */
export default function FashionProductPopover(props) {
  // console.log(props)
  // PREV DATA
  const [formData, setFormData] = useState({
    name: "",
    productId: "",
    brand: "",
    imageUrl: [],
    description: "",
    category: "",
    variants: [
      {
        name: "",
        description: "",
        size: [
          {
            size: "",
            price: 0,
            stock: 0,
          },
        ],
      },
    ],
    store: "web",
  });

  useEffect(() => {
    if (props.data && props.showPopover === "edit") {
      setFormData({
        name: props.data.name,
        productId: props.data.productId,
        category: props.data.category,
        imageUrl: props.data.imageUrl,
        description: props.data.description,
        variants: props.data.variants,
        brand: props.data.brand,
        store: "web",
      });
      setVariantsData(
        props?.data?.variants || [
          {
            name: "",
            description: "",
            size: [
              {
                size: "",
                price: 0,
                stock: 0,
              },
            ],
          },
        ]
      );
      setUploadedImages(props?.data?.imageUrl || []);
      setImages(props?.data?.imageUrl || []);
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
  const [uploadedImages, setUploadedImages] = useState([]);
  const [images, setImages] = useState([]);
  const onSelectFiles = (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    const reader = new FileReader();

    reader.onloadend = () => {
      const url = reader.result;

      files.forEach((file) => {
        formData.append("images", file);
      });

      const filesArray = files.map((file) => ({
        name: file.name,
        size: Math.round(file.size / 1024),
        url: url,
        progress: 0,
      }));

      setImages((prevImages) => [...prevImages, ...filesArray]);
    };

    files.forEach((file) => {
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (images.length == 0) return;
    const newImages = images.map((image) => {
      return {
        name: image.name,
        url: image.url,
      };
    });
    setUploadedImages(newImages);
  }, [images]);

  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // VARIANTS
  const [variantsData, setVariantsData] = useState([
    {
      name: "",
      description: "",
      size: [
        {
          size: "",
          price: 0,
          stock: 0,
        },
      ],
    },
  ]);
  const handleVariantTotal = (e) => {
    const newVariantCount = parseInt(e.target.value); // Ambil nilai baru untuk jumlah varian
    setVariantsData((prevData) => {
      const newData = [...prevData];
      // Sesuaikan panjang array varian dengan nilai yang dipilih
      while (newData.length < newVariantCount) {
        newData.push({
          name: "",
          description: "",
          size: [
            {
              size: "",
              price: 0,
              stock: 0,
            },
          ],
        });
      }
      // Jika jumlah varian berkurang, potong array varian sesuai dengan nilai yang dipilih
      if (newData.length > newVariantCount) {
        newData.splice(newVariantCount);
      }
      return newData;
    });
  };

  const handleVariantsChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "price" || name === "stock" ? parseInt(value, 10) || 0 : value;

    const indexVariant = page - 4;

    if (indexVariant >= 0 && indexVariant < variantsData.length) {
      setVariantsData((prevData) => {
        const newData = [...prevData];
        const variantToUpdate = newData[indexVariant];

        if (variantToUpdate) {
          // Perbarui nilai yang sesuai, termasuk untuk nama dan deskripsi
          newData[indexVariant] = {
            ...variantToUpdate,
            [name]: newValue,
          };
        }

        return newData;
      });
    }
  };

  const handleSizeTotal = (e, variantIndex) => {
    const newSizeCount = parseInt(e.target.value);
    setVariantsData((prevData) => {
      const newData = [...prevData];
      console.log(newSizeCount, newData[variantIndex].size?.length);
      if (newSizeCount > newData[variantIndex].size?.length) {
        for (
          let i = newData[variantIndex].size?.length;
          i <= newSizeCount;
          i++
        ) {
          newData[variantIndex].size.push({
            size: "",
            price: 0,
            stock: 0,
          });
        }
        return newData;
      } else {
        newData[variantIndex].size.splice(newSizeCount);
        return newData;
      }
    });
  };

  const handleSizeChange = (e, variantIndex, sizeIndex, field) => {
    const { value } = e.target;
    setVariantsData((prevData) => {
      const newData = [...prevData];
      newData[variantIndex].size = newData[variantIndex].size.map(
        (item, index) => {
          if (index === sizeIndex) {
            return {
              ...item,
              [field]:
                field === "price" || field === "stock"
                  ? parseInt(value, 10) || 0
                  : value,
            };
          }
          return item;
        }
      );
      return newData;
    });
  };
  const [page, setPage] = useState(1);

  const failedToastField = () =>
    toast.custom((t) => (
      <CustomToast
        t={t}
        message="Please fill in all required fields"
        type="failed"
      />
    ));

  const handlePageChange = (newPage) => {
    if (page === 1) {
      if (!formData.name || !formData.category || !formData.brand) {
        failedToastField();
        return;
      }
    } else if (page === 3) {
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: uploadedImages,
      }));
      if (uploadedImages?.length === 0) {
        failedToastField();
        return;
      }
    } else if (page > 3) {
      const i = page - 4;
      for (var j = 0; j < variantsData[i]?.size?.length; j++) {
        if (
          !variantsData[i]?.size[j]?.size ||
          !variantsData[i]?.size[j]?.price ||
          !variantsData[i]?.size[j]?.stock
        ) {
          failedToastField();
          return;
        }
      }
      if (!variantsData[i]?.name) {
        failedToastField();
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        variants: variantsData,
      }));
    }
    setPage(newPage);
  };

  const [readMore, setReadMore] = useState(false);
  const closePopover = () => {
    props.togglePopover("", null);
    setFormData({
      name: "",
      imageUrl: [],
      description: "",
      variants: [
        {
          size: "",
          price: 0,
          stock: 0,
        },
      ],
      store: "web",
    });
    setPage(1);
    setUploadedImages([]);
    setVariantsData([
      {
        name: "",
        description: "",
        size: [
          {
            size: "",
            price: 0,
            stock: 0,
          },
        ],
      },
    ]);
  };

  // POST
  const token = localStorage.getItem("token");
  const id = props.data?._id;
  // LOADING
  const [isLoading, setIsLoading] = useState(false);
  const postData = async () => {
    setIsLoading(true);

    await axios
      .post("http://localhost:3000/api/products/", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        props.refetch();
        toast.custom((t) => (
          <CustomToast t={t} message="Add product successed" type="success" />
        ));
        props.togglePopover("", null);
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Add product failed" type="failed" />
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // console.log(formData);

  const patchData = async () => {
    setIsLoading(true);

    await axios
      .patch("http://localhost:3000/api/products/" + id?.toString(), formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        props.refetch();
        closePopover();
        toast.custom((t) => (
          <CustomToast t={t} message="Edit product successed" type="success" />
        ));
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

  const handleSubmit = async () => {
    if (props.showPopover === "add") {
      postData();
    } else if (props.showPopover === "edit") {
      patchData();
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await axios
      .delete("http://localhost:3000/api/products/" + id?.toString(), {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        props.refetch();
        closePopover();
        toast.custom((t) => (
          <CustomToast
            t={t}
            message="Delete product successed"
            type="success"
          />
        ));
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
      <Toaster />
      <AnimatePresence>
        {(props.showPopover === "add" || props.showPopover === "edit") &&
          props.popoverType === "fashions" && (
            <div className="fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  closePopover();
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
                } relative overflow-hidden bg-thirdyThin w-[24rem] px-4 sm:px-10 ${
                  page === 1
                    ? "h-[40rem] sm:h-[40rem]"
                    : page === 2
                    ? "h-[39rem] sm:h-[42rem]"
                    : page === 3
                    ? "h-[48rem] sm:h-[48rem]"
                    : page === 4 + variantsData.length
                    ? "h-[49rem] sm:h-[48rem]"
                    : page > 3 && "h-[40rem] sm:h-[48rem]"
                } transition-all duration-300 max-h-[95vh] sm:w-[40rem] mx-2 sm:mx-10  p-5 z-[1] rounded-2xl shadow-md`}
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
                <div className="flex w-full h-fit -ml-2 justify-center drop-shadow items-center ">
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

                <div className="flex items-center h-fit gap-3 w-full mb-2">
                  <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
                  <h1 className="w-[47rem] sm:w-[50rem] text-[1.6rem] sm:text-[2rem] text-center font-semibold text-primaryNormal drop-shadow-md">
                    {props.showPopover === "add"
                      ? "Add Fashions"
                      : "Edit Fashions"}
                  </h1>
                  <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
                </div>

                {/* FORM */}
                <div className="flex flex-col  gap-4 h-[62%] sm:h-[70%] pb-4 w-full justify-between">
                  <div className="h-full sm:h-[90%] ">
                    {page === 1 ? (
                      <div className="flex flex-col w-full h-fit gap-2">
                        {/* NAME */}
                        <div>
                          <label
                            className="text-base sm:text-sm drop-shadow-sm font-semibold text-primaryNormal"
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

                        {/* ID */}
                        <div>
                          <label
                            className="text-base sm:text-sm drop-shadow-sm font-semibold text-primaryNormal"
                            htmlFor="name"
                          >
                            Product ID
                          </label>
                          <input
                            type="text"
                            name="productId"
                            placeholder="example"
                            value={formData.productId}
                            onChange={handleInputChange}
                            className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                          />
                        </div>

                        {/* DOUBLE */}
                        <div className="flex gap-3 w-full">
                          {/* Type */}
                          <div className="w-[50%]">
                            <label
                              className="text-base sm:text-sm drop-shadow-sm font-semibold text-primaryNormal"
                              htmlFor="name"
                            >
                              Category
                            </label>
                            <input
                              type="text"
                              name="category"
                              placeholder="Kerudung, Topi, dll"
                              value={formData.category}
                              onChange={handleInputChange}
                              className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                            />
                          </div>

                          {/* Variant */}
                          <div className="w-[50%]">
                            <label
                              className="text-base sm:text-sm drop-shadow-sm font-semibold text-primaryNormal"
                              htmlFor="name"
                            >
                              Jumlah Variasi
                            </label>
                            <select
                              name="name"
                              onChange={handleVariantTotal}
                              value={variantsData?.length}
                              className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg"
                            >
                              {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Brand */}
                        <div>
                          <label
                            className="text-base sm:text-sm drop-shadow-sm font-semibold text-primaryNormal"
                            htmlFor="brand"
                          >
                            Brand
                          </label>
                          <input
                            type="text"
                            name="brand"
                            placeholder="example"
                            value={formData.brand}
                            onChange={handleInputChange}
                            className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                          />
                        </div>
                      </div>
                    ) : page === 2 ? (
                      <div className="h-full flex flex-col ">
                        {/* DESCRIPTION */}
                        <label
                          className="text-base drop-shadow-sm font-semibold text-primaryNormal"
                          htmlFor="description"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          placeholder="example"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="block w-full rounded-2xl max-h-[92%] h-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border "
                          style={{ resize: "none", whiteSpace: "pre-wrap" }}
                        />
                      </div>
                    ) : page === 3 ? (
                      <div className="h-[93%] w-full">
                        {/* RIGHT */}
                        <div className="gap-3 flex flex-col h-full w-full">
                          {/* IMAGE */}
                          <div className="h-full w-full">
                            <label
                              className="text-base  drop-shadow-sm font-semibold text-primaryNormal ml-2"
                              htmlFor="name"
                            >
                              Image
                            </label>
                            <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
                              <div
                                className={`w-full h-[40rem] max-h-full bg-white relative rounded-2xl shadow- border-2 border-blue-300 border-dashed hover:bg-gray-50 duration-100 transition-all`}
                              >
                                {uploadedImages?.length > 0 ? (
                                  <div className="text-sm text-gray-600 flex flex-col w-full h-full overflow-y-scroll">
                                    <div className="w-full gap-2 flex px-2 py-2 border-b-2 border-blue-200">
                                      <h1 className="w-[25%] flex items-center justify-center">
                                        Preview
                                      </h1>
                                      <h1 className="w-[50%] flex items-center">
                                        Data
                                      </h1>
                                      <h1 className="w-[25%] flex items-center justify-center">
                                        Action
                                      </h1>
                                    </div>
                                    {uploadedImages?.map((image, i) => {
                                      // console.log("IIFF", i, image.url);
                                      return (
                                        <div
                                          key={i}
                                          className="w-full gap-2 flex px-2 py-4 border-b-2 border-blue-200 transition-all duration-100"
                                        >
                                          <h1 className="w-[25%]  aspect-square flex items-center justify-center ">
                                            <img
                                              src={image?.url}
                                              alt="image"
                                              className="w-[95%] bg-gray-200 rounded-2xl shadow-lg h-full object-cover"
                                            />
                                          </h1>
                                          <h1 className=" w-[50%] flex items-center truncate">
                                            {image.name}
                                          </h1>
                                          <div className=" w-[20%] flex items-center justify-center">
                                            {image.progress ? (
                                              <div className="flex flex-col w-full items-center justify-center text-gray-400">
                                                uploading...
                                                <div className="w-full animate-pulse rounded-full h-2 border-2 border-blue-300 flex shadow-md relative">
                                                  <div
                                                    style={{
                                                      width: `${image.progress}%`,
                                                    }}
                                                    className="h-full bg-blue-300"
                                                  ></div>
                                                </div>
                                              </div>
                                            ) : (
                                              <button
                                                onClick={() => removeImage(i)}
                                                type="button"
                                                className="text-white h-10 aspect-square bg-red-400 rounded-full flex items-center justify-center border-2 border-red-400 hover:bg-transparent hover:text-red-400 transition-all duration-200 font-semibold hover:scale-[1.1]"
                                              >
                                                X
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div className="pointer-events-none flex flex-col w-full h-full gap-5 mt-2 items-center justify-center ">
                                    <i className="fa-solid fa-cloud-arrow-up fa-2xl text-blue-400"></i>
                                    <h1 className="text-sm text-gray-600">
                                      Upload Image 4x4 Here
                                    </h1>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  accept="image/*"
                                  name="imageFile"
                                  multiple
                                  onInput={onSelectFiles}
                                  className={`cursor-pointer top-0 left-0 z-[100] ${
                                    !uploadedImages ? "w-full" : "w-[80%]"
                                  } h-full opacity-0 absolute`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : page > 3 && page < 4 + variantsData?.length ? (
                      <div className="flex w-full h-full gap-3">
                        {/* LEFT */}
                        <div className="w-full h-[100%]">
                          <div className="w-full flex gap-3">
                            {/* NAME */}
                            <div className="w-[50%]">
                              <label
                                className="text-base sm:text-sm drop-shadow-sm font-semibold text-primaryNormal"
                                htmlFor="name"
                              >
                                Nama Variant {page - 3}
                              </label>
                              <input
                                type="text"
                                name="name"
                                placeholder="example"
                                value={variantsData[page - 4]?.name}
                                onChange={(e) => handleVariantsChange(e)}
                                className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                              />
                            </div>
                            {/* UKURAN */}
                            <div className="w-[50%]">
                              <label
                                className="text-base sm:text-sm drop-shadow-sm font-semibold text-primaryNormal"
                                htmlFor="sizeCount"
                              >
                                Jumlah Ukuran
                              </label>
                              <select
                                name="sizeCount"
                                onChange={(e) => handleSizeTotal(e, page - 4)}
                                value={variantsData[page - 4]?.size?.length}
                                className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg"
                              >
                                {[...Array(10).keys()].map((num) => (
                                  <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 w-full h-[14rem] sm:h-[80%]  max-h-[90%] mt-3 overflow-y-scroll">
                            {variantsData[page - 4].size.map((item, index) => (
                              <div
                                key={index}
                                className="flex gap-3 pb-2 border-b border-gray-300"
                              >
                                <div>
                                  <label
                                    className="text-base sm:text-sm drop-shadow-sm font-semibold text-primaryNormal"
                                    htmlFor={`size_${index}`}
                                  >
                                    Ukuran {index + 1}
                                  </label>
                                  <input
                                    type="text"
                                    name={`size_${index}`}
                                    placeholder="example"
                                    value={item?.size}
                                    onChange={(e) =>
                                      handleSizeChange(
                                        e,
                                        page - 4,
                                        index,
                                        "size"
                                      )
                                    }
                                    className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                                  />
                                </div>
                                <div>
                                  <label
                                    className="text-base sm:text-sm drop-shadow-sm font-semibold text-primaryNormal"
                                    htmlFor={`price_${index}`}
                                  >
                                    Price
                                  </label>
                                  <input
                                    type="text"
                                    name={`price_${index}`}
                                    placeholder="99000"
                                    value={item.price}
                                    onChange={(e) =>
                                      handleSizeChange(
                                        e,
                                        page - 4,
                                        index,
                                        "price"
                                      )
                                    }
                                    className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                                  />
                                </div>
                                <div>
                                  <label
                                    className="text-base sm:text-sm drop-shadow-sm font-semibold text-primaryNormal"
                                    htmlFor={`stock_${index}`}
                                  >
                                    Stock
                                  </label>
                                  <input
                                    type="text"
                                    name={`stock_${index}`}
                                    placeholder="500"
                                    value={item.stock}
                                    onChange={(e) =>
                                      handleSizeChange(
                                        e,
                                        page - 4,
                                        index,
                                        "stock"
                                      )
                                    }
                                    className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col gap-3 text-sm max-sm:overflow-y-scroll max-sm:overflow-x-hidden">
                        <div className="h-[100%] max-sm:mt-[2.6rem] sm:h-[40%]  w-full flex max-sm:flex-col-reverse justify-between items-center text-gray-600 font-[600]">
                          <div className="w-full flex flex-col items-center sm:justify-between sm:h-full sm:py-3">
                            <div className="w-full flex py-1">
                              <span className="w-[35%] sm:w-[25%] flex">
                                Name
                              </span>
                              <span className="sm:w-[75%] flex truncate">
                                : {formData?.name}
                              </span>
                            </div>

                            <div className="w-full flex py-1">
                              <span className="w-[35%] sm:w-[25%] flex">
                                Category
                              </span>
                              <span className="sm:w-[75%] flex font-medium truncate">
                                : {formData?.category}
                              </span>
                            </div>
                            <div className="w-full flex py-1">
                              <span className="w-[35%] sm:w-[25%] flex">
                                Brand
                              </span>
                              <span className="sm:w-[75%] flex truncate">
                                : {formData?.brand}
                              </span>
                            </div>
                            <div className="w-full flex py-1 overflow-hidden">
                              <span className="w-[35%] sm:w-[25%] flex">
                                Description
                              </span>
                              <span className="flex">
                                <span className="max-w-[15rem] flex truncate text-ellipsis overflow-hidden font-medium">
                                  : {formData.description}
                                </span>
                              </span>
                              <button
                                className="ml-1 hover:opacity-[0.6]"
                                onClick={() => setReadMore(!readMore)}
                              >
                                ...
                              </button>
                            </div>
                          </div>
                          <div className="max-sm:w-full max-sm:pb-3 sm:h-[105%] aspect-square ">
                            <Swiper
                              slidesPerView={1}
                              spaceBetween={2}
                              navigation
                              className="w-full bg-white aspect-square flex  justify-center items-center  rounded-2xl shadow-lg"
                            >
                              {uploadedImages.length > 0 ? (
                                uploadedImages.map((image, index) => (
                                  <SwiperSlide key={index} className="">
                                    <div className="h-full w-full relative">
                                      <img
                                        src={image.url}
                                        alt={image.url}
                                        className="h-full aspect-square object-cover absolute"
                                      />
                                    </div>
                                  </SwiperSlide>
                                ))
                              ) : (
                                <SwiperSlide className="">
                                  <div className="font-semibold text-gray-600 flex items-center justify-center w-full h-full bg-gray-300 pb-1">
                                    No Image
                                  </div>
                                </SwiperSlide>
                              )}
                            </Swiper>
                          </div>
                        </div>
                        <div className="w-full   sm:h-[60%] flex flex-col">
                          <div className="w-full max-sm:flex-col max-sm:justify-center max-sm:text-center bg-secondary px-5 py-3 rounded-2xl shadow-2xl flex text-white font-semibold">
                            <h1 className="w-full sm:w-[30%] flex justify-center">
                              Variant
                            </h1>
                            {/* <h1 className="w-[40%]">Description</h1> */}
                            <h1 className="w-full sm:w-[70%] flex justify-center">
                              Size
                            </h1>
                          </div>
                          <div className="w-[101.7%] h-auto mt-2 overflow-y-scroll flex flex-col">
                            {formData?.variants?.map((item, index) => (
                              <div
                                key={index}
                                className="w-full bg-white mb-4 px-5 py-3 rounded-2xl shadow-lg flex text-gray-600 font-semibold text-[0.8rem] max-sm:flex-col"
                              >
                                <h1 className="w-full justify-center sm:w-[30%] h-full flex  items-center text-center truncate">
                                  {item?.name}
                                </h1>
                                <h1
                                  className={`w-full max-sm:justify-center sm:w-[70%] h-full flex items-center justify-center font-medium flex-col gap-2 ${
                                    index < formData?.variants?.length - 1 &&
                                    "border-b-2"
                                  }  border-gray-200 py-3`}
                                >
                                  {item?.size?.map((size) => (
                                    <div
                                      key={size?.size}
                                      className="flex gap-1 font-semibold"
                                    >
                                      <div>{size?.size}</div> -
                                      <div>{size?.stock} pcs</div> -
                                      <div className="text-secondary font-semibold">
                                        Rp. {size?.price?.toLocaleString()}
                                      </div>
                                    </div>
                                  ))}
                                </h1>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* BUTTON */}
                  <div className="flex  gap-3 w-full items-center justify-center ">
                    <div className={`flex gap-3`}>
                      <Button
                        variant="secondary"
                        onClick={
                          page > 1 ? () => setPage((prev) => prev - 1) : {}
                        }
                        disabledParam={page === 1}
                        className={`${
                          page === 1 && "opacity-[0.5]"
                        } duration-100 transition-all max-sm:min-w-[3rem] `}
                      >
                        <i className="rotate-[180deg] fa-solid fa-arrow-right pt-[0.1rem] sm:mr-2  fa-lg"></i>
                        <span className="max-sm:hidden">Prev</span>
                      </Button>
                      {props.showPopover === "edit" && (
                        <Button
                          variant="red"
                          className={"max-sm:min-w-[3rem]"}
                          onClick={() => handleDelete()}
                        >
                          <i className="fa-solid fa-trash sm:mr-2 scale-[0.95] fa-lg"></i>{" "}
                          <span className="max-sm:hidden">Delete</span>
                        </Button>
                      )}
                      {page === 4 + variantsData?.length ? (
                        <Button
                          onClick={handleSubmit}
                          className={"max-sm:min-w-[3rem]"}
                          variant="secondary"
                        >
                          <span className="max-sm:hidden">
                            {props.showPopover === "add" ? "Add" : "Update"}
                          </span>
                          <i className="fa-solid fa-arrow-right  sm:ml-2 fa-lg"></i>
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          className={"max-sm:min-w-[3rem]"}
                          onClick={
                            page < 4 + variantsData?.length
                              ? () => handlePageChange(page + 1)
                              : null
                          }
                        >
                          <span className="max-sm:hidden">Next</span>
                          <i className="fa-solid fa-arrow-right pb-[0.1rem] sm:ml-2 fa-lg"></i>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
      </AnimatePresence>

      {/* READ MORE */}
      <ReadMoreDescription
        description={formData?.description}
        handleClose={() => setReadMore(false)}
        readMore={readMore}
      />
    </>
  );
}

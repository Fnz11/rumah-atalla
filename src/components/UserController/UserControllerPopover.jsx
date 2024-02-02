/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../../components/CustomToast";

/* eslint-disable react/prop-types */
export default function UserControllerPopover(props) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    number: "",
    imageUrl: "",
    password: "",
  });

  useEffect(() => {
    if (props?.data && props?.showPopover === "edit") {
      setUserData({
        username: props.data.username,
        email: props.data.email,
        number: props.data.number,
        imageUrl: props.data.imageUrl,
        password: "",
      });
    }
  }, [props]);

  const handleOutPopover = () => {
    setUserData({
      username: "",
      email: "",
      number: "",
      password: "",
      imageUrl: "",
    });
    props.togglePopover("", null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const token = localStorage.getItem("token");
  const id = props.data?._id;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log("INI IMAGE", file, reader);
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // LOADING
  const [isLoading, setIsLoading] = useState(false);

  const postUser = async () => {
    setIsLoading(true);

    axios
      .post("http://localhost:3000/api/users/signup", userData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        handleOutPopover();
        toast.custom((t) => (
          <CustomToast t={t} message="Add user successed" type="success" />
        ));
        props.refetch();
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Add user failed" type="failed" />
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const patchUser = async () => {
    setIsLoading(true);
    if (!userData.password) {
      delete userData.password;
    }
    console.log("DATA", userData);
    axios
      .patch("http://localhost:3000/api/users/" + id.toString(), userData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        handleOutPopover();
        toast.custom((t) => (
          <CustomToast t={t} message="Edit user successed" type="success" />
        ));
        props.refetch();
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Edit user failed" type="failed" />
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = async () => {
    if (props.showPopover === "add") {
      await postUser();
    } else if (props.showPopover === "edit") {
      await patchUser();
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await axios
      .delete("http://localhost:3000/api/users/" + id.toString(), {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        handleOutPopover();
        toast.custom((t) => (
          <CustomToast t={t} message="Delete user successed" type="success" />
        ));
        props.refetch();
      })
      .catch((error) => {
        console.error(error);
        toast.custom((t) => (
          <CustomToast t={t} message="Delete user failed" type="failed" />
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
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
              className={` ${
                isLoading && "pointer-events-none"
              } relative overflow-hidden bg-thirdyThin  w-[40rem] mx-10 h-[84%] p-5 z-[1] rounded-2xl shadow-md`}
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

              <div className="flex items-center gap-3 w-full mb-2 px-10">
                <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
                <h1 className="w-[30rem] text-[2rem] text-center font-semibold text-primaryNormal drop-shadow-md">
                  {props.showPopover === "add" ? "Add User" : "Edit User"}
                </h1>
                <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
              </div>

              {/* FORM */}
              <form action="" className="flex flex-col gap-3 px-10">
                <div className="flex w-full gap-3">
                  {/* LEFT */}
                  <div className="flex flex-col gap-3 w-full">
                    {/* NAME */}
                    <div>
                      <label
                        className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal"
                        htmlFor="name"
                      >
                        Nama
                      </label>
                      <input
                        type="text"
                        placeholder="example"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                      />
                    </div>
                    {/* NUMBER */}
                    <div>
                      <label
                        className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal"
                        htmlFor="password"
                      >
                        Nomor HP
                      </label>
                      <input
                        type="text"
                        placeholder="Phone Number"
                        name="number"
                        value={userData.number}
                        onChange={handleInputChange}
                        className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                      />
                    </div>
                  </div>
                  {/* RIGHT */}
                  <div>
                    <label
                      className="text-base  drop-shadow-sm font-semibold text-primaryNormal ml-2"
                      htmlFor="name"
                    >
                      Image
                    </label>
                    <div className="w-[7.3rem] sm:w-[8rem] relative cursor-pointer aspect-square flex flex-col justify-center items-center border-2 border-dashed border-blue-400 bg-white rounded-2xl overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        name="imageFile"
                        onChange={handleImageUpload}
                        className="w-full opacity-0 absolute h-full cursor-pointer"
                        // className="block w-full bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg"
                      />
                      {userData?.imageUrl ? (
                        <img
                          src={userData?.imageUrl}
                          alt="Image Preview"
                          className="block h-full w-full object-cover "
                        />
                      ) : (
                        <div className="flex flex-col gap-5 mt-2 items-center justify-center ">
                          <i className="fa-solid fa-cloud-arrow-up fa-2xl text-blue-400"></i>
                          <h1 className="text-sm text-gray-600 text-center">
                            Upload Image 4x4 Here
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* EMAIL */}
                <div>
                  <label
                    className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="example123@gmail.com"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                  />
                </div>
                {/* PASSWORD */}
                <div>
                  <label
                    className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-gray-600 border rounded-lg "
                  />
                </div>

                {/* BUTTON */}
                <div className="flex gap-2 mt-3">
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
                    {props.showPopover === "add" ? "Add User" : "Edit User"}
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

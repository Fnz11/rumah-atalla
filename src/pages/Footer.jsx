export default function Footer() {
  return (
    <>
      <footer className="text-white bg-section-dark rounded-2xl shadow-xl mb-6">
        <div className="container py-20 mx-auto ">
          <div className="flex flex-wrap md:text-left text-center justify-center w-full">
            <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
              {/* LOGO */}
              <div className="flex mr-10">
                <img
                  src="/LogoWhite.png"
                  className="w-[3.7rem] scale-[0.9] -mt-2 h-[3.7rem]"
                  alt="Logo"
                />
                <div className="uppercase ml-1 text-base ">
                  <h1 className="-mb-[0.4rem]">Rumah</h1>
                  <h1 className="font-bold">Atalla</h1>
                  <div className="w-[120%] h-[0.1rem] -my-[0.15rem] rounded-md bg-white" />
                </div>
              </div>
              <p className="mt-2 text-sm ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam obcaecati
              </p>
            </div>
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium  tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className=" hover:text-gray-800">
                    First Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium  tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className=" hover:text-gray-800">
                    First Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium  tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className=" hover:text-gray-800">
                    First Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/6 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium  tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className=" hover:text-gray-800">
                    First Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.1)]">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className=" text-sm text-center sm:text-left">
              © 2023 Rumah Atalla —
              <a
                href="https://twitter.com/"
                className=" ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Raffi Atalla Atmaja
              </a>
            </p>
            <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center  text-sm">
              Enamel pin tousled raclette tacos irony
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

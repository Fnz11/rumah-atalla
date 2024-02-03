/* eslint-disable react/prop-types */
export default function SearchBar({ onChange, value, placeholder }) {
  return (
    <>
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
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}
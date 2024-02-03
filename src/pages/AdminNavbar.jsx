/* eslint-disable react/prop-types */
export default function AdminNavbar({User}) {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="bg-section-dark w-full h-[4rem] rounded-2xl shadow-lg mt-5 flex items-center px-5 py-3 text-white">
          {User?.role === "owner" ? (
            <>
              Welcome back,
              <span className="text-thirdyNormal ml-2 font-semibold">
                {User?.username}
              </span>
              <span className="text-xl pb-1">👋</span>
            </>
          ) : (
            <>
              Keep up the good work!,
              <span className="text-thirdyNormal ml-2 font-semibold">
                {User?.username}
              </span>
              <span className="text-xl pb-1">🔥</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

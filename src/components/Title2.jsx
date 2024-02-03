/* eslint-disable react/prop-types */
export default function Title2({ title, className }) {
  return (
    <>
      <h1
        className={
          "text-2xl mb-3 drop-shadow-sm h-fit font-semibold text-primaryNormal " +
          className
        }
      >
        {title}
      </h1>
    </>
  );
}

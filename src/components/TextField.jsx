/* eslint-disable react/prop-types */
export default function TextField({
  value,
  onChange,
  name,
  onName,
  placeholder,
  type,
}) {
  return (
    <>
      <div>
        <label
          className="sm:text-base text-sm drop-shadow-sm font-semibold text-primaryNormal capitalize"
          htmlFor={name}
        >
          {onName ? onName : name}
        </label>
        <input
          type={type ? type : "text"}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="block w-full placeholder:text-gray-300 bg-white focus:outline-white p-3 text-sm text-primaryDark border rounded-lg "
        />
      </div>
    </>
  );
}

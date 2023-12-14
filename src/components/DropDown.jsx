import { useEffect, useState } from "react";

const DropDown = ({
  initial,
  color,
  classname,
  dropdown,
  data,
  handleChange,
  name,
  databases,
  base_id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initial);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedValue(item.name);
    setIsOpen(false);
    handleChange(name, item[databases]);
  };

  useEffect(() => {}, [initial]);

  return (
    <div className="relative inline-block w-full">
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className={
          classname
            ? classname
            : `hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-md text-slate-900 text-sm md:text-base font-normal px-5 py-2.5 text-center inline-flex items-center justify-between mb-2 ${
                color ? color : "bg-white"
              }`
        }
        type="button"
        onClick={toggleDropdown}
      >
        {selectedValue}
        <svg
          className={`w-2.5 h-2.5 ms-3 transform ${isOpen && "rotate-180"}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdownHover"
          className={`bg-white divide-y divide-gray-100 rounded-lg shadow w-full absolute z-10 ${dropdown}`}
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownHoverButton"
          >
            {data[0].name !== initial && (
              <li
                className={`capitalize block px-4 py-2 hover:${
                  color ? color : "bg-gray-100"
                } cursor-pointer`}
                onClick={() => {
                  handleChange(name, base_id);
                  setSelectedValue(initial);
                }}
              >
                {initial}
              </li>
            )}
            {data.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`capitalize block px-4 py-2 hover:${
                    color ? color : "bg-gray-100"
                  } cursor-pointer`}
                  onClick={() => handleItemClick(item)}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;

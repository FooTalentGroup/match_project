import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import PropTypes from "prop-types";

const CustomSelect = ({ label, options, selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative -ml-0.5 sm:ml-2 text-sm font-raleway text-[#767575]">
      <button
        onClick={() => setOpen(!open)}
        className="h-[44px] w-[107px] sm:w-[130px] flex justify-between items-center text-left w-full pr-4 pl-2 py-[8px] border border border-[#76757599] rounded-[10px] bg-white hover:bg-gray-50"
        style={{
          borderWidth: "1px",
          borderColor: "rgba(118, 117, 117, 0.5)",
        }}
      >
        <span>{selected === label ? label : selected}</span>

        <FaChevronDown
          className={`ml-2 transition-transform${
            open ? "rotate-180" : ""
          }relative w-[15px] h-[15px] top-[9px] left-[6px] text-[#767575]`}
        />
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-white shadow-md rounded-md z-10 py-1">
          {options.map((opt, index) => (
            <div key={opt}>
              {index > 0 && <div className="border-t border-gray-200 mx-2" />}
              <button
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
              >
                <span>{opt}</span>
                {selected === opt && (
                  <FaCheck className=" text-tertiary text-[12px] ml-auto flex items-center gap-2" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;

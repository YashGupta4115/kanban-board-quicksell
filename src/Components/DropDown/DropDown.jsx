import React from "react";
import "./DropDown.css";

const DropDown = ({ list, onChange }) => {
  // const [selectText, setSelectText] = useState("Select filter");
  const handleChange = (e) => {
    // setSelectText(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="DropDown-container">
      <select onChange={handleChange}>
        {list.map((l, index) => {
          return (
            <option key={index} value={l.label}>
              {l.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;

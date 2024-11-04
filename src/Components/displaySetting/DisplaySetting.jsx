import React, { useContext, useState } from "react";
import sett from "../../Assests/Display.svg";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import "./DisplaySetting.css";
import DropDown from "../DropDown/DropDown";
import { groupByData, sortList } from "../../Assests/grids";
import { ConContext } from "../../Context/ContextProvider";

const DisplaySetting = () => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const { changeFilter, changeSort } = useContext(ConContext);

  const toggleSetting = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  const handleGroupChange = (selectedGroup) => {
    changeFilter(selectedGroup);
  };
  const handleSortChange = (selectedSort) => {
    changeSort(selectedSort);
  };

  return (
    <div className="container">
      <div className="setting-container">
        <img src={sett} alt="display" />
        Display
        <div onClick={toggleSetting}>
          {isSettingOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      {isSettingOpen && (
        <div className="options-pallete">
          <div className="options">
            Grouping &nbsp;
            <DropDown list={groupByData} onChange={handleGroupChange} />
          </div>
          <div className="options">
            Ordering &nbsp;
            <DropDown list={sortList} onChange={handleSortChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplaySetting;

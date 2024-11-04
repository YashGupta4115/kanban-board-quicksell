import React from "react";
import "./taskGrpTitle.css";
import addIcon from "../../Assests/add.svg";
import threeDotMenu from "../../Assests/3 dot menu.svg";

const TaskGrpTitle = ({ key, label, icon, groupedTasks }) => {
  return (
    <div className="task-grp-title">
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <img className="displayIcon" src={icon} alt={label} />
        &nbsp;&nbsp;&nbsp;
        {label}
        &nbsp;&nbsp;&nbsp;
        <p style={{ color: "grey" }}>
          {groupedTasks[key] && groupedTasks[key].length > 0
            ? groupedTasks[key].length
            : 0}
        </p>
      </div>
      <div>
        <img style={{ marginRight: "5px" }} src={addIcon} alt={label} />
        <img src={threeDotMenu} alt={label} />
      </div>
    </div>
  );
};

export default TaskGrpTitle;
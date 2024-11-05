import React, { useState } from "react";
import "./taskGrpTitle.css";
import addIcon from "../../Assests/add.svg";
import threeDotMenu from "../../Assests/3 dot menu.svg";
import AddTask from "../addTask/AddTask";

const TaskGrpTitle = ({ key, label, icon, groupedTasks, setGroupedTasks }) => {
  const [isAddSettingOpen, setIsAddSettingOpen] = useState(false);

  const handleAddTask = () => {
    setIsAddSettingOpen(!isAddSettingOpen);
  };

  return (
    <>
      <div className="task-grp-title">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img className="displayIcon" src={icon} alt={label} />
          &nbsp;&nbsp;&nbsp;
          {label}
          &nbsp;&nbsp;&nbsp;
          <p style={{ color: "grey" }}>
            {groupedTasks[label] && groupedTasks[label].length > 0
              ? groupedTasks[label].length
              : 0}
          </p>
        </div>
        <div>
          <img
            style={{ marginRight: "5px" }}
            src={addIcon}
            alt={label}
            onClick={handleAddTask}
          />
          <img src={threeDotMenu} alt={label} />
        </div>
      </div>
      {isAddSettingOpen && (
        <AddTask
          groupedTasks={groupedTasks}
          groupKey={label}
          setGroupedTasks={setGroupedTasks}
        />
      )}
    </>
  );
};

export default TaskGrpTitle;

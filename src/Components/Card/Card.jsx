import React, { useContext } from "react";
import "./Card.css";
import { GoDotFill } from "react-icons/go";
import { ConContext } from "../../Context/ContextProvider";

const Card = ({ task, columnMapping, userImages }) => {
  const { filter } = useContext(ConContext);
  // Destructure task properties for clarity
  const { id, title, tag, status, priority } = task;

  // Get the index for the current task's priority or status
  const statusIndex = columnMapping.status.keys.indexOf(status);
  const priorityIndex = columnMapping.priority.keys.indexOf(priority);

  // Use fallback if the index is not found
  const statusImage =
    statusIndex !== -1 ? columnMapping.status.icons[statusIndex] : null;
  const priorityImage =
    priorityIndex !== -1 ? columnMapping.priority.icons[priorityIndex] : null;

  return (
    <div className="Card-container">
      <div className="cardHeader">
        <div className="camName">{id}</div>
        {filter !== "userId" && (
          <img
            className="displayIcon"
            src={userImages[task.userId]}
            alt="user-icon"
          />
        )}
      </div>
      <div className="taskTitle">
        {(filter === "priority" || filter === "userId") && statusImage && (
          <img
            className="title-icons"
            src={statusImage}
            alt={`Status: ${status}`}
          />
        )}
        {title}
      </div>
      <div className="cardFooter">
        <div className="card_tag_ico">
          {(filter === "status" || filter === "userId") && priorityImage && (
            <img
              className="footer-icons"
              src={priorityImage}
              alt={`Priority: ${priority}`}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              boxShadow: "0 0 1px 0",
              padding: "2px",
              borderRadius: "2px",
              marginLeft: "5px",
              color: "grey",
            }}
          >
            <GoDotFill
              style={{ color: "rgb(174, 171, 171)", paddingTop: "2px" }}
            />
            <div className="cardTag">{tag}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

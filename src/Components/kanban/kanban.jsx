import "./kanban.css";
import { useContext, useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import DisplaySetting from "../displaySetting/DisplaySetting.jsx";
import { ConContext } from "../../Context/ContextProvider.jsx";

import noPriorityIcon from "../../Assests/No-priority.svg";
import lowPriorityIcon from "../../Assests/Img - Low Priority.svg";
import medPriorityIcon from "../../Assests/Img - Medium Priority.svg";
import highPriorityIcon from "../../Assests/Img - High Priority.svg";
import urgentPriorityIcon from "../../Assests/SVG - Urgent Priority colour.svg";

import backlogIcon from "../../Assests/Backlog.svg";
import cancelledIcon from "../../Assests/Cancelled.svg";
import doneIcon from "../../Assests/Done.svg";
import toDoIcon from "../../Assests/To-do.svg";
import inProgressIcon from "../../Assests/in-progress.svg";
import TaskGrpTitle from "../Task-grp-title/taskGrpTitle.jsx";
import { generateUserImages } from "../utils.js";

// column mappings for fixed groupings with predefined groups
const COLUMN_MAPPING = {
  priority: {
    keys: [0, 1, 2, 3, 4],
    labels: ["No Priority", "Low", "Medium", "High", "Urgent"],
    icons: [
      noPriorityIcon,
      lowPriorityIcon,
      medPriorityIcon,
      highPriorityIcon,
      urgentPriorityIcon,
    ],
  },
  status: {
    keys: ["Backlog", "Todo", "In progress", "Done", "Cancelled"],
    labels: ["Backlog", "To Do", "In Progress", "Done", "Cancelled"],
    icons: [backlogIcon, toDoIcon, inProgressIcon, doneIcon, cancelledIcon],
  },
};

// Main exported function
const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedTasks, setGroupedTasks] = useState({});
  const [error, setError] = useState(null);
  const { filter, sort } = useContext(ConContext);

  // function to get columns based on filter type
  const getColumns = (tasks, groupBy) => {
    if (COLUMN_MAPPING[groupBy]) {
      return COLUMN_MAPPING[groupBy].keys.map((key, index) => ({
        key,
        label: COLUMN_MAPPING[groupBy].labels[index],
        icon: COLUMN_MAPPING[groupBy].icons[index],
      }));
    }
    // generate unique values dynamically if no fixed mapping exists specifically dor userId based grouping
    const uniqueValues = [...new Set(tasks.map((task) => task[groupBy]))];
    return uniqueValues.map((value, index) => ({
      key: value,
      label: String(value),
      icon: userImages[String(value)],
    }));
  };

  // useEffect to fetch API called data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        if (!response.ok) {
          // if no reponse collected
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setTasks(Array.isArray(jsonData.tickets) ? jsonData.tickets : []); // converting to array for ease usage and better effiency
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updatedGroupedTasks = groupAndSortTasks(
      tasks,
      filter,
      sort.toLowerCase()
    );
    setGroupedTasks(updatedGroupedTasks); // Updating the state with sorted and grouped tasks
  }, [tasks, filter, sort]); // Re-run the function when these dependencies change

  const userImages = {};

  tasks.forEach((task) => {
    if (!userImages[task.userId]) {
      userImages[task.userId] = generateUserImages(task.userId);
    }
  });

  // getting dynamic columns with readable names based on filter criteria
  const columns = getColumns(tasks, filter);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="kanban-container">
      <DisplaySetting />
      <div className="kanban-box">
        {columns.map(({ key, label, icon }) => (
          <div key={key} className="task-group">
            <TaskGrpTitle
              key={key}
              label={label}
              icon={icon}
              groupedTasks={groupedTasks}
            />
            {groupedTasks[key] && groupedTasks[key].length > 0 ? (
              groupedTasks[key].map((task) => (
                <Card
                  key={task.id} // Make sure to include a unique key for each card
                  task={task}
                  columnMapping={COLUMN_MAPPING}
                  userImages={userImages} // Pass the corresponding icon for the task's group
                />
              ))
            ) : (
              <p>No tasks</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Grp and sort tasks
const groupAndSortTasks = (tasks, groupBy, sortBy) => {
  if (!Array.isArray(tasks) || !groupBy) return {};

  console.log(sortBy);

  // Grp tasks
  const grouped = tasks.reduce((grouped, task) => {
    const key = task[groupBy];

    if (!key) return grouped;

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(task);
    return grouped;
  }, {});

  // Sort tasks
  Object.keys(grouped).forEach((key) => {
    grouped[key].sort((a, b) => {
      // Sort by priority in decn order, as needed
      if (sortBy === "priority") {
        return b.priority - a.priority;
      }
      // Sort ascn by title, as another example
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0; // Default
    });
  });
  console.log(grouped);
  return grouped;
};

export default Kanban;

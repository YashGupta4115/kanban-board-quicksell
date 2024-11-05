import { createContext, useState, useEffect } from "react";

export const ConContext = createContext();

export const ContextProvider = ({ children }) => {
  const [filter, setFilter] = useState("status");
  const [sort, setSort] = useState("priority");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    console.log("Updated tasks:", tasks);
  }, [tasks]); // Logs the updated tasks list whenever it changes

  const changeFilter = (newFilter) => {
    if (newFilter === "User") {
      setFilter("userId");
    } else if (newFilter === "Status") {
      setFilter("status");
    } else if (newFilter === "Priority") {
      setFilter("priority");
    }
  };

  const changeSort = (newSort) => setSort(newSort);

  return (
    <ConContext.Provider
      value={{
        filter,
        sort,
        changeFilter,
        changeSort,
        tasks,
        setTasks,
        handleAddTask,
      }}
    >
      {children}
    </ConContext.Provider>
  );
};

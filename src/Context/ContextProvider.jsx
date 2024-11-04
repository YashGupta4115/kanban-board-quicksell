import { createContext, useState } from "react";

export const ConContext = createContext();

export const ContextProvider = ({ children }) => {
  const [filter, setFilter] = useState("status");
  const [sort, setSort] = useState("priority");

  const changeFilter = (newFilter) => {
    if (newFilter === "User") {
      setFilter("userId");
      return;
    } else if (newFilter === "Status") {
      setFilter("status");
      return;
    } else if (newFilter === "Priority") {
      setFilter("priority");
      return;
    }
  };
  const changeSort = (newSort) => setSort(newSort);

  return (
    <ConContext.Provider value={{ filter, sort, changeFilter, changeSort }}>
      {children}
    </ConContext.Provider>
  );
};

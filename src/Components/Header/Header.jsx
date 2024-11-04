import React from "react";

const Header = ({ Category, title }) => {
  return (
    <div
      className="header-container"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        textAlign: "left",
      }}
    >
      <p className="gray-text">{Category}</p>
      <p className="bold-600-text">{title}</p>
    </div>
  );
};

export default Header;

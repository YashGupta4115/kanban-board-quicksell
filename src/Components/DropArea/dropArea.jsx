import { useState } from "react";

const DropArea = ({ onDrop, status, position }) => {
  const [showDropArea, setShowDropArea] = useState(false);

  return (
    <section
      onDragEnter={() => setShowDropArea(true)}
      onDragLeave={() => setShowDropArea(false)}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(status, position);
        setShowDropArea(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      style={{
        opacity: showDropArea ? "1" : "0",
        height: showDropArea ? "40px" : "10px",
        transition: "all ease 0.2s",
      }}
    >
      Drop Here
    </section>
  );
};

export default DropArea;

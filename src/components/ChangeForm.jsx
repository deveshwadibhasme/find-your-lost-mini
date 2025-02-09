import React from "react";

const ChangeForm = ({setFormChange}) => {
  return (
    <div className="m-2 cursor-pointer flex bg-amber-200 w-64 items-center justify-center mx-auto rounded-2xl overflow-hidden">
      <span
        className="p-2 transition-colors bg-blue-500 select-none"
        onClick={(e) => {
          e.target.classList.add("bg-blue-500");
          e.target.nextSibling.classList.remove("bg-blue-500");
          setFormChange(false);
        }}
      >
        Register Missing
      </span>
      <span
        className="p-2 transition-colors select-none"
        onClick={(e) => {
          e.target.classList.add("bg-blue-500");
          e.target.previousSibling.classList.remove("bg-blue-500");
          setFormChange(true);
        }}
      >
        Search Missing
      </span>
    </div>
  );
};

export default ChangeForm;

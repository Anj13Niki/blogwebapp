import React from "react";

const Spinner = () => {
  return (
    <div className="spinner-border text-primary text-center mt-5 spinner" role="status">
      <span className="visually-hidden text-center">Loading...</span>
    </div>
  );
};

export default Spinner;
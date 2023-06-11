import React from "react";

function Loader() {
  return (
    <div className="spinner-border text-primary" role="status" style={{
      height: '50px',
      width: '50px',
      margin: 'auto',
      display: 'block'
    }}>
      <span className="sr-only"></span>
    </div>

  );
}

export default Loader;

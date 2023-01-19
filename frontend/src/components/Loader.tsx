import React from "react";

function Loader() {
  return (
    <div className="spinner-border text-primary" role="status" style={{
      height: '100px',
      width: '100px',
      margin: 'auto',
      display: 'block'
    }}>
      <span className="sr-only"></span>
    </div>

  );
}

export default Loader;

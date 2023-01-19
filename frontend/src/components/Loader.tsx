import React from "react";

function Loader() {
  return (
    <div class="spinner-border text-primary" role="status" style={{
      height: '100px',
      width: '100px',
      margin: 'auto',
      display: 'block'
    }}>
      <span class="sr-only"></span>
    </div>

  );
}

export default Loader;

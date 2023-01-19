import React from "react";

function Loader() {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div class="spinner-border text-primary" role="status" style={{
      height: '100px',
      width: '100px',
      margin: 'auto',
      display: 'block'
    }}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span class="sr-only"></span>
    </div>

  );
}

export default Loader;

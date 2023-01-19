import React from "react";

import './home.css'

function Home() {
  return (

    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="body">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <h1 className='main-heading'>welcome to Mess System</h1>



    </div>



  );
}

export default Home;

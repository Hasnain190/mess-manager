import React from "react";

function Message({
  variant,
  children
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div class="alert alert-dark" role="alert" variant={variant}>
      {children}
    </div>
  );
}

export default Message;

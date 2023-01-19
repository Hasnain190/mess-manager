import React from "react";

function Message({ variant, children }) {
  return (
    <div class="alert alert-dark" role="alert" variant={variant}>
      {children}
    </div>
  );
}

export default Message;

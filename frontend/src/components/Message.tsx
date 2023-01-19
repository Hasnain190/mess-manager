import React from "react";

function Message({
  variant,
  children
}: any) {
  return (
    <div className="alert alert-dark" role="alert" variant={variant}>
      {children}
    </div>
  );
}

export default Message;

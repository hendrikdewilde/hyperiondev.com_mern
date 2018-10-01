import React from "react";

/**
 * @return {string}
 */
function CompleteMenu1(props) {
  const complete = props.complete;
  if (!complete) {
    return (
      <li>
        <a href="">Mark Complete</a>
      </li>
    );
  }
  return "";
}

export default CompleteMenu1;

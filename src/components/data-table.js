import React from "react";

export default function DataTable(props) {
  return (
    <tr>
      <td>{props.obj._id}</td>
      <td>{props.obj.name}</td>
      <td>{props.obj.email}</td>
    </tr>
  );
}

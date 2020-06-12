import React, { useEffect, useReducer } from "react";
import axios from "axios";
import DataTable from "./data-table";

export default function Users(props) {
  const initialState = {
    usersCollection: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "reset":
        return initialState;
      default:
        return { ...state, [action.type]: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((res) => {
        dispatch({
          type: "usersCollection",
          payload: res.data,
        });

        console.table(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const dataTable = () => {
    return state.usersCollection.map((el, i) => {
      return <DataTable obj={el} key={i} />;
    });
  };

  return (
    <div className="wrapper-users">
      <div className="container">
        <table
          className="table table-striped table-dark"
          style={{ display: "block", overflowX: "auto" }}
        >
          <thead className="thead-dark">
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>{dataTable()}</tbody>
        </table>
      </div>
    </div>
  );
}

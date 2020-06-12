import React, { useReducer } from "react";
import axios from "axios";

export default function CreateUser(props) {
  const initialState = {
    name: "",
    email: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "reset":
        return initialState;
      case "all":
        return action.payload;
      default:
        return { ...state, [action.type]: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateName = (e) => {
    dispatch({
      type: "name",
      payload: e.target.value,
    });
  };

  const updateEmail = (e) => {
    dispatch({
      type: "email",
      payload: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userObject = {
      name: state.name,
      email: state.email,
    };

    axios
      .post("http://localhost:4000/users/create", userObject)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch({ type: "reset", payload: "" });
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter Name</label>
          <input
            type="text"
            className="form-control"
            value={state.name}
            onChange={updateName}
          />
        </div>
        <div className="form-group">
          <label>Enter Email</label>
          <input
            type="text"
            className="form-control"
            value={state.email}
            onChange={updateEmail}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-success btn-block"
          />
        </div>
      </form>
      <button
        className="btn btn-info btn-block"
        onClick={() => console.log(state)}
      >
        Print State
      </button>
    </div>
  );
}

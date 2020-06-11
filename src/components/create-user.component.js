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
      default:
        return { ...state, [action.type]: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

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
  };

  return (
    <div className="wrapper">
      <form>
        <div className="form-group">
          <label>Enter Name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Enter Email</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-success btn-block"
          />
        </div>
      </form>
    </div>
  );
}

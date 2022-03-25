import React, { useState, useEffect } from "react";
import TextField from "../forms/textField";
import { userService } from "../services/userService";

const Users = () => {
  const [data, setData] = useState({ name: "user name" });
  const [edit, setEdit] = useState(false);

  userService.get();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    setEdit((prevState) => !prevState);
  };
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const toggleEdit = () => {
    setEdit((prevState) => !prevState);
  };

  return (
    <>
      <h1>Users</h1>
      {edit ? (
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="name"
            type="text"
            onChange={handleChange}
            value={data.name}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={toggleEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>{data.name}</p>
          <button onClick={toggleEdit}>Edit</button>
        </>
      )}
    </>
  );
};

export default Users;

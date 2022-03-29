import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "../forms/textField";
import { createContact } from "../store/contacts";

const CreateContact = () => {
  const dispatch = useDispatch();

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
  });

  const handleChange = (target) => {
    setNewContact((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createContact(newContact));

    setNewContact(() => ({ name: "", email: "" }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create new contact</h3>
      <TextField
        label="name"
        name="name"
        type="text"
        value={newContact.name}
        onChange={handleChange}
      />
      <TextField
        label="email"
        name="email"
        type="email"
        value={newContact.email}
        onChange={handleChange}
      />
      <button type="sumbit">Create</button>
    </form>
  );
};

export default CreateContact;

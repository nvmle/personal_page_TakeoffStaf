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
    <form onSubmit={handleSubmit} className="w-25">
      <h5>Create new contact</h5>
      <TextField
        label="Name"
        name="name"
        type="text"
        value={newContact.name}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={newContact.email}
        onChange={handleChange}
      />
      <button type="sumbit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default CreateContact;

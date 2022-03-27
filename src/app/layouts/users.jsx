import React, { useState, useEffect } from "react";
import TextField from "../forms/textField";
import { contactService } from "../services/contactService";
import { userService } from "../services/userService";
import UsersList from "../ui/usersList";

const Users = () => {
  //   const [data, setData] = useState({ name: "user name" });

  //   const [users, setUsers] = useState([]);

  const [searchData, setSearchData] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  useEffect(async () => {
    const data = await userService.getUserById(0);
    setCurrentUser(data);
  }, []);

  const handleChange = (target) => {
    // setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    setSearchData(target.value);
  };

  const handleSearch = (e) => {
    console.log(e.value);
    // setSearchData(e.target.value);
  };

  const filterContacts = () => {
    const filteredContacts = searchData
      ? currentUser.contacts.filter((contact) =>
          contact.name.toLowerCase().includes(searchData)
        )
      : currentUser.contacts;

    return filteredContacts;
  };

  const filteredContacts = filterContacts();

  return (
    <>
      <h1>Users</h1>
      <div>
        <TextField
          type="text"
          label="Search"
          name="search"
          onChange={handleChange}
        />
        {/* <input
          type="text"
          placeholder="Search.."
          name="searchData"
          value={searchData}
          onChange={handleSearch}
        /> */}
      </div>
      <UsersList users={filteredContacts} />
    </>
  );
};

export default Users;

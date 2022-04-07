import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextField from "../forms/textField";
import { getContactList, getIsLoadingContacts } from "../store/contacts";
import ContactsList from "../ui/contactsList";

const Contacts = () => {
  const isContactsLoading = useSelector(getIsLoadingContacts());

  const contacts = useSelector(getContactList());

  const [searchData, setSearchData] = useState("");

  const handleChange = (target) => {
    setSearchData(target.value);
  };

  const filterContacts = () => {
    const filteredContacts = searchData
      ? contacts.filter((contact) =>
          contact.name.toLowerCase().includes(searchData)
        )
      : contacts;

    return filteredContacts;
  };

  const filteredContacts = filterContacts();

  return (
    <div className="d-flex flex-column ">
      <h1 className="mx-auto">Contacts</h1>
      <div className="d-flex flex-column w-50 mx-auto p-4">
        <div className="w-25">
          <TextField
            type="text"
            label="Search"
            name="search"
            onChange={handleChange}
          />
        </div>
        {isContactsLoading ? (
          "Loading... "
        ) : (
          <ContactsList contacts={filteredContacts} />
        )}
      </div>
    </div>
  );
};

export default Contacts;

import React from "react";

import ContactsTable from "./contactsTable";
import CreateContact from "./createContact";

const ContactsList = ({ contacts }) => {
  const columns = {
    name: { name: "Name", path: "name" },
    email: { name: "Email", path: "email" },
    actions: { name: "actions" },
  };

  return (
    <>
      <ContactsTable contacts={contacts} columns={columns} />
      <CreateContact />
    </>
  );
};

export default ContactsList;

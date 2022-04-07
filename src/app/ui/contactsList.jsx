import React from "react";
import PropTypes from "prop-types";

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
ContactsList.propTypes = {
  contacts: PropTypes.array,
};

export default ContactsList;

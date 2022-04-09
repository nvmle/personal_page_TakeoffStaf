import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeContact, updateContact } from "../store/contacts";

const ContactsTable = ({ contacts, columns }) => {
  const dispatch = useDispatch();

  const [editContact, setEditContact] = useState({});

  const handleSave = async () => {
    dispatch(updateContact(editContact));

    setEditContact({});
  };
  const handleRemove = (contactId) => {
    dispatch(removeContact(contactId));
  };

  const handleToggleEdit = (contactId) => {
    const contact = contacts.filter((contact) => contact.id === contactId);

    if (editContact.id === contactId) {
      setEditContact("");
    } else {
      setEditContact(contact[0]);
    }
  };

  const handleChange = ({ target }) => {
    setEditContact((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {Object.keys(columns).map((column) => (
              <th key={column}>{columns[column].name}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              {Object.keys(columns).map((column) => (
                <td key={column}>
                  {contact[columns[column].path] ||
                  contact[columns[column].path] === "" ? (
                    contact.id === editContact.id ? (
                      <input
                        className="w-75 "
                        value={editContact?.[columns[column].path]}
                        onChange={handleChange}
                        name={[columns[column].path]}
                      />
                    ) : (
                      contact[columns[column].path]
                    )
                  ) : (
                    <>
                      {contact?.id === editContact.id ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-success me-2"
                            onClick={() => handleSave(contact.id)}
                          >
                            <i className="bi bi-check-square  "></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary  me-2"
                            onClick={() => handleToggleEdit(contact.id)}
                          >
                            <i className="bi bi-x-square"></i>
                          </button>{" "}
                        </>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary me-2"
                          onClick={() => handleToggleEdit(contact.id)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn btn-danger  me-2"
                        onClick={() => handleRemove(contact.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
ContactsTable.propTypes = {
  contacts: PropTypes.array,
  columns: PropTypes.object,
};

export default ContactsTable;

import React, { useState } from "react";
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
      <table>
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
                  {contact[columns[column].path] ? (
                    contact.id === editContact.id ? (
                      <input
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
                            onClick={() => handleSave(contact.id)}
                          >
                            save
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleEdit(contact.id)}
                          >
                            cancel
                          </button>{" "}
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleToggleEdit(contact.id)}
                        >
                          edit
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemove(contact.id)}
                      >
                        delete
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

export default ContactsTable;

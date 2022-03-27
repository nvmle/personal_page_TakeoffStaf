import React, { useEffect, useState } from "react";
import TextField from "../forms/textField";
import { contactService } from "../services/contactService";

const UsersList = ({ users }) => {
  console.log("filteredUsers:", users);

  const currentUser = "1";

  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    user_id: currentUser, // localStorage.getItem(currentUser).id
  });

  //   const [editContactId, setEditContactId] = useState("");
  const [editContact, setEditContact] = useState({});

  useEffect(async () => {
    const data = await contactService.get();

    const filteredData = data.filter((item) => item.user_id === currentUser);
    setContacts(filteredData);
  }, []);

  const columns = {
    name: { name: "Name", path: "name" },
    email: { name: "Email", path: "email" },
    actions: { name: "actions" },
  };

  const handleSave = async (contactId) => {
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    const newContacts = [...contacts];
    newContacts[contactIndex] = editContact;

    // setContacts(newContacts); // PATCH contact

    const updatedContact = await contactService.update(editContact);
    console.log("updatedContact", updatedContact);
    setEditContact({});
  };
  const handleRemove = (contactId) => {
    console.log("handleRemove", contactId);

    const removedContact = contactService.delete(contactId);
    console.log(removedContact);
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(newContacts);
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
    console.log(target);
    setEditContact((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleChangeCreate = (target) => {
    console.log(target);
    setNewContact((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleCreate = () => {
    // console.log("handleCreate", Math.random().toString(36).substr(2, 9));
    console.log("newContact", newContact);
    const createdContact = contactService.create(newContact);
    console.log("createdContact", createdContact);

    const newContacts = [...contacts];
    newContacts.push(newContact);
    console.log(newContacts);
    // setContacts(newContacts);

    setNewContact((prevState) => ({ ...prevState, name: "", email: "" }));
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {Object.keys(columns).map((column) => (
              <th key={column + 1}>{columns[column].name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              {Object.keys(columns).map((column) => (
                <td key={column}>
                  {contact?.[columns[column].path] ? (
                    // contact?.editNow ? (
                    contact?.id === editContact.id ? (
                      <input
                        value={editContact?.[columns[column].path]}
                        onChange={handleChange}
                        name={[columns[column].path]}
                      />
                    ) : (
                      contact?.[columns[column].path]
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
      <div>
        <TextField
          label="name"
          name="name"
          type="text"
          value={newContact.name}
          onChange={handleChangeCreate}
        />
        <TextField
          label="email"
          name="email"
          type="email"
          value={newContact.email}
          onChange={handleChangeCreate}
        />

        <button type="button" onClick={handleCreate}>
          Create
        </button>
      </div>
    </>
  );
};

export default UsersList;

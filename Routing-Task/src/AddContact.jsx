import React, { useState, useContext } from 'react';
import { ContactsContext } from './App';

const AddContact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { addContact } = useContext(ContactsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = { name, phone };
    // Add the contact using the context function
    addContact(newContact);
    // Reset the form fields
    setName('');
    setPhone('');
    // Perform any other action after adding the contact
  };

  return (
    <div>
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
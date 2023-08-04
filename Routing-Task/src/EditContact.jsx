import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ContactsContext } from './App';

const EditContact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { id } = useParams();
  const { contacts, updateContact } = useContext(ContactsContext);

  useEffect(() => {
    // Fetch contact data based on the ID
    const contact = contacts.find((contact) => contact.id === parseInt(id));
    if (contact) {
      setName(contact.name);
      setPhone(contact.phone);
    }
  }, [id, contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContact = { id: parseInt(id), name, phone };
    // Update the contact using the context function
    updateContact(updatedContact);
    // Reset the form fields
    setName('');
    setPhone('');
    // Navigate back to the home page or perform any other action
    // as per your app's navigation or state management logic
  };

  return (
    <div>
      <h2>Edit Contact</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
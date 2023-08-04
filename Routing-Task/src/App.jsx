import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './Home';
import ContactDetails from './ContactDetail';
import AddContact from './AddContact';
import EditContact from './EditContact';

// Create a new context for managing contacts
export const ContactsContext = React.createContext();

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210' },
    { id: 3, name: 'Bob Johnson', phone: '555-123-4567' },
  ]);

  // Function to add a new contact
  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  // Function to update an existing contact
  const updateContact = (updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  // Function to delete a contact
  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Provide the contacts and functions to the child components */}
      <ContactsContext.Provider
        value={{
          contacts,
          addContact,
          updateContact,
          deleteContact,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts/:id" element={<ContactDetails />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </ContactsContext.Provider>
    </Router>
  );
};

export default App;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContactsContext } from './App';

const Home = () => {
  const { contacts } = useContext(ContactsContext);

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/contacts/${contact.id}`} state={{contactData: contact}}>
              {contact.name} ({contact.phone})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
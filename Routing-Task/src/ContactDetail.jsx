import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const ContactDetail = () => {
  const [contact, setContact] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Retrieve the contact data from the location state
    const contactData = location.state?.contactData;
    setContact(contactData);
  }, [location]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Contact Details</h2>
      <p>ID: {contact.id}</p>
      <p>Name: {contact.name}</p>
      <p>Phone: {contact.phone}</p>
      <Link to={`/edit/${contact.id}`} state={contact}>Edit</Link>
    </div>
  );
};

export default ContactDetail;
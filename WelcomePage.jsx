import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  // State to manage form input fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const { username, email, firstName, lastName } = formData;

    // Validate the form data (basic example)
    if (!username || !email || !firstName || !lastName) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      // Send the registration data to a backend for email processing (e.g., via an API)
      const response = await fetch('/api/send-registration-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          firstName,
          lastName,
          recipientEmail: "loganowens01@icloud.com",
        }),
      });

      if (response.ok) {
        alert('Registration details successfully emailed!');
        navigate('/'); // Navigate to the home page after successful registration
      } else {
        setErrorMessage('Failed to send registration details. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while sending the registration.');
    }
  };

  return (
    <div>
      <h1>Welcome to HackerCon</h1>
      <p>Welcome SuperHacker You Are Inz!</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button onClick={() => navigate('/')}>HOME</button>
    </div>
  );
};

export default WelcomePage;

  
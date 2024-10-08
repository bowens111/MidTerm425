import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // State for the form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Hook to navigate between routes
  const navigate = useNavigate();

  // Function to navigate to the landing page after successful login
  const goToLoginPage = () => {
    navigate('/landing'); // Navigate to the Landing page
  };

  // Function to handle login
  const handleLogin = () => {
    // Validate the login credentials (use real authentication in production)
    if (username === 'admin' && password === 'password') {
      // Store authentication status
      localStorage.setItem('isAuthenticated', 'true');
      // Navigate to the landing page using goToLoginPage function
      goToLoginPage();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Login Here</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form from refreshing the page
          handleLogin(); // Call login handler on form submission
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

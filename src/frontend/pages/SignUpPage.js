import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username || username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      await axios.post('http://localhost:3001/api/auth/register', { username, email, password });
      navigate('/login');
    } catch (error) {
      console.error('Registration error', error);
      setErrors({ server: 'Registration failed. Please try again later.' });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mt-5">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            required
          />
          {errors.username && <span className="text-danger">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
            <div className="input-group-append">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-secondary"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </div>
        <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
        {errors.server && <span className="text-danger">{errors.server}</span>}
      </form>
      <p className="mt-3">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default SignUpPage;
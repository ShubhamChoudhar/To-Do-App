import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
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
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      const { token, user } = response.data; // Destructure token and user from the response
      setAuthData({ token, user }); // Store both token and user in authData
      navigate('/tasks');
    } catch (error) {
      console.error('Login error', error);
      if (error.response && error.response.data) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: 'An unexpected error occurred. Please try again later.' });
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-group"> {/* Use input-group */}
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append ml-3"> {/* Add input-group-append */}
                  <button type="button" className="btn btn-secondary" onClick={toggleShowPassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <button type="submit" className="btn btn-primary mt-3">Login</button>
            {errors.server && <span className="error">{errors.server}</span>}
            <p className="mt-3">
              Don't have an account? <Link to="/signup">Register here</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
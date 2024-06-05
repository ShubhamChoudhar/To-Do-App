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
      const response = await axios.post('https://taskwhiz.netlify.app/api/auth/login', {
        email: email, // Ensure `email` and `password` are defined and captured correctly
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { token, user } = response.data;
      setAuthData({ token, user });
      navigate('/tasks');
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4">
          <form onSubmit={handleSubmit} className="login-form p-4 border rounded shadow">
            <h2 className="text-center">Login</h2>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <span className="error text-danger">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append ps-2">
                  <button type="button" className="btn btn-secondary" onClick={toggleShowPassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              {errors.password && <span className="error text-danger">{errors.password}</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
            {errors.server && <span className="error text-danger">{errors.server}</span>}
            <p className="mt-3 text-center">
              Don't have an account? {' '}
            <span
              onClick={() => navigate('/signup')}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              Signup
            </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

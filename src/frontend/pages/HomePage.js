import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate('/login');
  };

  const signup = () => {
    navigate('/signup');
  };

  return (
    <div className="container-fluid homepage">
      <h1 className="display-4">Welcome to the To-Do App</h1>
      <p className="lead">Please log in or sign up to manage your tasks.</p>
      <div className="d-grid gap-2 d-md-flex justify-content-md-start">
        <button className="btn btn-primary me-md-2" onClick={login}>Login</button>
        <button className="btn btn-primary" onClick={signup}>Signup</button>
      </div>
    </div>
  );
};

export default HomePage;
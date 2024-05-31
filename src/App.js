import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './frontend/pages/HomePage';
import SignUpPage from './frontend//pages/SignUpPage';
import LoginPage from './frontend//pages/LoginPage';
import ToDoListPage from './frontend/pages/ToDoListPage';
import {AuthProvider} from './frontend/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tasks" element={<ToDoListPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
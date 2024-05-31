import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { useNavigate } from 'react-router-dom';

const TodoListPage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { authData, setAuthData } = useContext(AuthContext);

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authData');
    navigate('/login');
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (authData && authData.token) {
          const response = await axios.get('http://localhost:3001/api/tasks', {
            headers: { Authorization: `Bearer ${authData.token}` }
          });
          setTasks(response.data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [authData]);

  const addTask = async (task) => {
    console.log("Task",task);
    try {
      console.log(authData.token);
      const response = await axios.post('http://localhost:3001/api/tasks', task, {
        headers: { Authorization: `Bearer ${authData.token}` }
      });

      console.log(tasks);
      console.log(response.data);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${authData.token}` }
      });
      setTasks(tasks.map(task => task._id === id ? response.data : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${authData.token}` }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">To-Do App</span>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {authData && authData.user ? (
                <>
                  <span className="nav-link">Hello {authData.user.username}</span>
                  <button className="btn btn-primary" onClick={logout}>Logout</button>
                </>
              ) : (
                <span className="nav-link">Loading...</span>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <div className="content">
        <div className="task-form">
          <h3 className = 'mt-3'>Add Tasks</h3>
          <TaskForm addTask={addTask} />
        </div>
        <div className="task-list">
          <h3 className = 'mt-5'>Tasks</h3>
          <ul className="list-group">
            {tasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoListPage;
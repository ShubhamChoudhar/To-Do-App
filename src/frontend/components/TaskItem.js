import React, { useState } from 'react';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    updateTask(task._id, { title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="form-control"
            />
          </>
        ) : (
          <>
            <h5>{task.title}</h5>
            <p>{task.description}</p>
          </>
        )}
      </div>
      <div>
        {isEditing ? (
          <>
            <button onClick={handleSave} className="btn btn-primary me-2">Save</button>
            <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="btn btn-secondary me-2">Edit</button>
            <button onClick={() => deleteTask(task._id)} className="btn btn-danger">Delete</button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
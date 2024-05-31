import React from 'react';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const handleEdit = () => {
    const updatedTitle = prompt('Enter new title', task.title);
    const updatedDescription = prompt('Enter new description', task.description);
    if (updatedTitle && updatedDescription) {
      updateTask(task._id, { title: updatedTitle, description: updatedDescription });
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <h5>{task.title}</h5>
        <p>{task.description}</p>
      </div>
      <div>
        <button onClick={handleEdit} className="btn btn-secondary mr-2">Edit</button> {/* Added margin-right to the button */}
        <button onClick={() => deleteTask(task._id)} className="btn btn-danger">Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
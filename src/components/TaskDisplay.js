import React from 'react';
import { useTask } from '../context/task-context';

const TaskDisplay = () => {
  const { state, dispatch } = useTask();

  const handleDelete = (taskId) => {
    //delete from localStorage
    if (localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      let filterTasks = tasks.filter((task) => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(filterTasks));
    }
    //delete from state
    dispatch({ type: 'REMOVE_TASK', payload: taskId });
  };

  const handleToggleTask = (taskId) => {
    //toggle from localStorage
    if (localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      let alterTasks = tasks.map((task) => {
        if (task.id === taskId) {
          let newStatus = task.status === 'pending' ? 'finished' : 'pending';
          return { ...task, status: newStatus };
        } else {
          return task;
        }
      });
      //toggle from state
      localStorage.setItem('tasks', JSON.stringify(alterTasks));
    }
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  };

  const displayTaskTable = (tasks) => (
    <table className='table'>
      <thead>
        <tr>
          <th>Task ID</th>
          <th>Task Content</th>
          <th>Task Status</th>
          <th>Task Delete</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr
            className={task.status === 'finished' ? 'finished' : 'pending'}
            key={task.id}
          >
            <td>{task.id}</td>
            <td>{task.content}</td>
            <td
              style={{ cursor: 'pointer' }}
              onClick={() => handleToggleTask(task.id)}
            >
              {task.status === 'pending' ? 'pending' : 'finished'}
            </td>
            <td
              style={{ cursor: 'pointer' }}
              onClick={() => handleDelete(task.id)}
            >
              x
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className='container'>
      <h4 className='text-center'>Your Task Summary</h4>
      {state && state.length > 0
        ? displayTaskTable(state)
        : 'No Task To Display'}
    </div>
  );
};

export default TaskDisplay;

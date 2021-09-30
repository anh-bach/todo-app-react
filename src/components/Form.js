import React, { useState } from 'react';
import { uid } from 'uid';

import { useTask } from '../context/task-context';

const Form = () => {
  const { dispatch } = useTask();
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    const newTask = { id: uid(), content: task, status: 'pending' };
    //saving in localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log('from localStorage', tasks);
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    dispatch({
      type: 'ADD_TASK',
      payload: newTask,
    });
    setTask('');
    setLoading(false);
  };

  return (
    <div className='container'>
      <form className='form'>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            name='text-input'
            placeholder='Enter your task'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type='button'
            className='btn btn-primary'
            onClick={handleClick}
          >
            {loading ? 'Adding...' : 'Add Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

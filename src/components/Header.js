import React from 'react';

import { useTask } from '../context/task-context';

const Header = () => {
  const { state } = useTask();

  const finishedTasks = state.filter((task) => task.status === 'finished');
  const pendingTasks = state.filter((task) => task.status === 'pending');

  return (
    <div className='header'>
      <h1 className='text-center'>To Do App</h1>
      <p className='text-center'>
        You currently have: {state.length} {state.length < 2 ? 'task' : 'tasks'}
      </p>
      <p className='text-center'>
        You have finished {finishedTasks.length}{' '}
        {finishedTasks.length < 2 ? 'task' : 'tasks'}. {pendingTasks.length}{' '}
        {pendingTasks.length < 2 ? 'task' : 'tasks'} to go.
      </p>
    </div>
  );
};

export default Header;

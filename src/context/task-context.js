import React from 'react';

const TaskContext = React.createContext();

const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];

    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.payload);

    case 'TOGGLE_TASK':
      return state.map((task) => {
        if (task.id === action.payload) {
          let newStatus = task.status === 'pending' ? 'finished' : 'pending';
          return { ...task, status: newStatus };
        } else {
          return task;
        }
      });

    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(taskReducer, initialState);
  const value = { state, dispatch };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = React.useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProdiver');
  }
  return context;
};

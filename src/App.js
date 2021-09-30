import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header';
import Form from './components/Form';
import { TaskProvider } from './context/task-context';
import TaskDisplay from './components/TaskDisplay';

const App = () => {
  return (
    <Router>
      <TaskProvider>
        <Header />
        <Form />
        <TaskDisplay />
      </TaskProvider>
    </Router>
  );
};

export default App;

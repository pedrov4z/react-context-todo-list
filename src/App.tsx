import React from 'react';

import Routes from './routes';

import TodoProvider from './contexts/TodoContext';

import './assets/styles/global.css';

function App() {
  return (
    <TodoProvider>
      <Routes />
    </TodoProvider>
  );
}

export default App;

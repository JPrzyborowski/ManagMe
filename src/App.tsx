// src/App.tsx
import React from 'react';
import ProjectList from './components/ProjectList';

const App: React.FC = () => {
  return (
    <div>
      <h1>ManagMe - Zarządzanie Projektami</h1>
      <ProjectList />
    </div>
  );
};

export default App;

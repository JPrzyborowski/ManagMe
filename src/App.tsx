// src/App.tsx
import React, { useEffect, useState } from 'react';

import LoggedInUser from './components/LooggedInUser'; // Import komponentu LoggedInUser
import ActiveProjectSelector from './components/ActiveProjectSelector';
import { Project } from './types/Project';
import ActiveProjectApi from './services/ActiveProjectApi';
import StoryList from './components/StoryList';

const App: React.FC = () => {
  const [activeProject,setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    const project = ActiveProjectApi.getActiveProject(); 
    setActiveProject(project); 
  }, []); 
  const handleProjectSelect = (project: Project) => {
    console.log("Project selected as active:", project);
    setActiveProject(project); 
  }

  return (
    <div>
      <h1>ManagMe - Project Management App</h1>
      
      {/* Wyświetlenie zalogowanego użytkownika */}
      <LoggedInUser />

      {/* Wyświetlenie komponentu do wyboru aktywnego projektu */}
      <ActiveProjectSelector onProjectSelect={handleProjectSelect} />

      {/* Wyświetlenie listy projektów */}
           

         {/* Wyświetlenie informacji o aktywnym projekcie */}
         {activeProject ? (
        <div>
          <h2>Active Project: {activeProject.name}</h2>
        
          <StoryList projectId={activeProject.id} /> 
        </div>
      ) : (
        <p>No active project selected</p>
      )}
    </div>
  );
};

export default App;

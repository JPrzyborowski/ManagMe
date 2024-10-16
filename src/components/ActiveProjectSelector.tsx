import React, { useState, useEffect } from 'react';
import ProjectApi, { Project } from '../services/ProjectApi';
import ActiveProjectApi from '../services/ActiveProjectApi';

interface ActiveProjectSelectorProps {
    onProjectSelect: (project: Project) => void ; 

}

const ActiveProjectSelector: React.FC<ActiveProjectSelectorProps> = ({ onProjectSelect }) => {
const [projects,setProjects] = useState<Project[]>([]); 
const [activeProject, setActiveProject] = useState<Project | null>(null)
useEffect(() => {
    const fetchedProjects = ProjectApi.getProjects();
    console.log("Fetched projects from API:", fetchedProjects); // Logowanie pobranych projektów
    setProjects(fetchedProjects);

    const storedActiveProject = ActiveProjectApi.getActiveProject();
    console.log("Stored active project:", storedActiveProject); // Logowanie aktywnego projektu z localStorage
    setActiveProject(storedActiveProject);
  }, []);

const handleSetActiveProject = (project: Project) => {
    console.log("Setting active project:", project);
    ActiveProjectApi.setActiveProject(project);
    setActiveProject(project); 
    onProjectSelect(project); 
    
}
return (
    <div>
    <h2>Select Active Project</h2>
    {projects.length === 0 ? (
      <p>No projects available</p>
    ) : (
      projects.map((project) => (
        <div key={project.id} style={{ marginBottom: '10px' }}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <button onClick={() => handleSetActiveProject(project)}>
            {activeProject?.id === project.id ? 'Active Project (Selected)' : 'Set as Active Project'}
          </button>
        </div>
      ))
    )}
  </div>
    
        
); 
} ;

export default ActiveProjectSelector; 



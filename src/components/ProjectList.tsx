// src/components/ProjectList.tsx
import React, { useState, useEffect } from 'react';
import ProjectAPI, { Project } from '../services/ProjectApi';
import ProjectForm from './ProjectForm';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects(ProjectAPI.getProjects());
  }, []);

  const handleSave = () => {
    setProjects(ProjectAPI.getProjects());
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    ProjectAPI.deleteProject(id);
    setProjects(ProjectAPI.getProjects());
  };

  return (
    <div>
      <h2>Project List</h2>
      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <button onClick={() => setEditingProject(project)}>Edit</button>
          <button onClick={() => handleDelete(project.id)}>Delete</button>
        </div>
      ))}
      <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
      <ProjectForm project={editingProject} onSave={handleSave} />
    </div>
  );
};

export default ProjectList;

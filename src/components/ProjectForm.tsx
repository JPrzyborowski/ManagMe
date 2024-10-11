// src/components/ProjectForm.tsx
import React, { useState } from 'react';
import ProjectAPI, { Project } from '../services/ProjectApi';

interface ProjectFormProps {
  project?: Project | null;
  onSave: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave }) => {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');

  const handleSubmit = () => {
    if (project) {
      ProjectAPI.updateProject(project.id, { name, description });
    } else {
      ProjectAPI.createProject({ name, description });
    }
    onSave();
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
      />
      <button onClick={handleSubmit}>
        {project ? 'Update Project' : 'Add Project'}
      </button>
    </div>
  );
};

export default ProjectForm;

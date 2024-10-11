


export interface Project {
  id: string;       
  name: string;    
  description: string;    
}


class ProjectApi {
    private key!: string; 

    constructor() {
      this.key = 'projects';
    }
  
   
    createProject(project: Omit<Project, 'id'>): Project {
      const projects = this.getProjects();
  
      
      if (!project.name || !project.description) {
        throw new Error("Project is missing required properties: 'name' and 'description'");
      }
  
      const newProject: Project = {
        id: Date.now().toString(), // Generowanie unikalnego ID
        ...project,                // Dodawanie pozostałych pól projektu
      };
  
      projects.push(newProject); 

      this.saveProjects(projects);
      return newProject;
    }

    getProjects(): Project[] {
      const projects = localStorage.getItem(this.key);
      return projects ? JSON.parse(projects) : [];
    }
  
    getProjectById(id: string): Project | undefined {
      const projects = this.getProjects();
      return projects.find(project => project.id === id);
    }

    updateProject(id: string, updatedProject: Partial<Omit<Project, 'id'>>): Project | undefined {
      let projects = this.getProjects();
      projects = projects.map(project =>
        project.id === id ? { ...project, ...updatedProject } : project
      );
      this.saveProjects(projects);
      return this.getProjectById(id);
    }

     // Metoda do usuwania projektu po ID
  deleteProject(id: string): void {
    let projects = this.getProjects();
    projects = projects.filter(project => project.id !== id);
    this.saveProjects(projects);
  }

  // Metoda pomocnicza do zapisywania projektów w localStorage
  private saveProjects(projects: Project[]): void {
    localStorage.setItem(this.key, JSON.stringify(projects));
  }
}

export default new ProjectApi();
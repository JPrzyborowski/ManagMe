import { Project } from "../types/Project";

class ActiveProjectApi {
    private key: string = 'activeProject';   

   
    setActiveProject(project: Project): void {
        localStorage.setItem(this.key, JSON.stringify(project)); 
    }
    getActiveProject(): Project | null {
        const project = localStorage.getItem(this.key) ; 
        return project ? JSON.parse(project) : null; 
    }
    clearActiveProject(): void {
        localStorage.removeItem(this.key); 
    }
}
export default new ActiveProjectApi();
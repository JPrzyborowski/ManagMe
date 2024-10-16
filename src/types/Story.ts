export interface Story {
    id: string;
    name:string ;
    description: string ; 
    priority: 'low' | 'medium'  |'high';
    projectId: string ; 
    creationDate: string; 
    state: "todo" | 'doign' | 'done'
    ownerId: string ; 
}
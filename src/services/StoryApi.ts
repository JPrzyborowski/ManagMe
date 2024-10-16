import { Story } from "../types/Story";

class StoryApi {
    private key: string; 
    constructor() {
        this.key = 'stories'
    }
    getStories(): Story[] {
        const stories = localStorage.getItem(this.key);
        return stories ? JSON.parse(stories) : []; 

    }

    getStoriesByProjectId(projectId:string) : Story[] {
        return this.getStories().filter(story => story.projectId = projectId)

    }

    createStory(story: Omit<Story, 'id' | 'creationDate'>):Story {
        const stories = this.getStories();
        const newStory: Story = {
            id: Date.now().toString(),
            creationDate: new Date().toISOString(), 
            ...story ,
        };
        stories.push(newStory);
        this.saveStories(stories);
        return newStory; 
    }
    updateStory(id: string, updatedStory: Partial<Omit<Story, 'id' 
        |  'creationDate'>>) :Story | undefined {
            let stories = this.getStories(); 
            stories = stories.map(story => story.id === id ? {
                ...story,...updatedStory } : story 
            ); 
            this.saveStories(stories); 
            return this.getStoryById(id); 


        }
         getStoryById(id: string): Story | undefined  {
            return this.getStories().find(story => story.id === id);
         }

         deleteStory(id:string): void {
            let stories = this.getStories(); 
            stories = stories.filter(story => story.id !== id); 
            this.saveStories(stories) ; 

         }
         private saveStories(stories: Story[]): void {
            localStorage.setItem(this.key, JSON.stringify(stories)); 
         }
         }


    
export default new StoryApi(); 
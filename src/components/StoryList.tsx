import React, {useState , useEffect} from "react";
import StoryApi from '../services/StoryApi' 
import { Story } from "../types/Story";

interface StoryListProps {
    projectId:string ; 
}

const StoryList: React.FC<StoryListProps> = ({projectId}) => {
    const [stories, setStories] = useState<Story[]>([]);
    const [filter ,setFilter] = useState<'all' | 'todo' | 'doing' | 'done'>('all')

    useEffect(() => {
        const storiesByProject = StoryApi.getStoriesByProjectId(projectId);
        console.log("Stories for project:", projectId, storiesByProject); // Logowanie pobranych historyjek
        setStories(storiesByProject);
      }, [projectId]); 

   const filteredStories = stories.filter(story => filter ==='all' || story.state === filter); 
   console.log("Filtered stories:", filteredStories); 
 return (
    <div>
      <h2>Project Stories</h2>
        <select value={filter} onChange={e =>setFilter(e.target.value as 'all' | 'todo' | 'doing' | 'done')}>
                <option value='all'>All</option>
                <option value='to do'>To Do</option>
                <option value='doing'>Doing</option>
                <option value='done'>Done</option>

            </select>
            <ul>
                {filteredStories.map(story => (
                    <li key={story.id}>
                        <h3>{story.name} (Priority: {story.priority})</h3>
                        <p>{story.description}</p>
                        <p>Status: {story.state}</p>
                        <p>Owner: {story.ownerId}</p>
                        <p>Created on: {new Date(story.creationDate).toLocaleDateString()}</p>

                    </li>
                ))}
            </ul>
    
        </div>
 )
}
export default StoryList; 
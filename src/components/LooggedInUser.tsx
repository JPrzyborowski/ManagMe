import React, { useEffect, useState } from 'react';
import UserApi from '../services/UserApi';
import { User } from '../types/User';


const LoggedInUser: React.FC = () => {
    const[user ,setUser] = useState<User | null>(null) ; 
    useEffect(() => {
        const loggedUser = UserApi.getLoggedUser(); 
        setUser(loggedUser); 
    }, []); 

    return (
        <div>
            {user ?(
                <div>
                    <p>Logged in as: {user.firstName} {user.lastName}</p>
                    <button onClick={() => UserApi.logoutUser()}>Logout</button>
                    </div>
            ) : (
                <p>No user is logged in</p>
            )
                
            }
        </div>
    );
};
export default LoggedInUser;
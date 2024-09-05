import axios from 'axios';
import { createContext, useState } from 'react';

const StateContext = createContext();

const StateProvider = ({children}) => {
    const [msgExpanded, setMsgExpanded] = useState(false);
    const [user2Id, setUser2Id] = useState(null);

    return (
        <StateContext.Provider value = {{setMsgExpanded, msgExpanded, setUser2Id, user2Id}}>
            {children}
        </StateContext.Provider> 
    )
};

export {StateProvider, StateContext};
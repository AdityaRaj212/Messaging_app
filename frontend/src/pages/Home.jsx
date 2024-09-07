import { useContext, useEffect, useState } from 'react';
import styles from './styles/Home.module.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import MessageBox from '../components/MessageBox';
import AllUsers from '../components/AllUsers';
import { StateContext } from '../context/StateContext';
import ShortProfile from '../components/ShortProfile';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const {user2Id, msgExpanded} = useContext(StateContext);
    let {user, isAuthenticated} = useContext(AuthContext);

    console.log(isAuthenticated);

    if(!isAuthenticated){
        navigate('/login');
    }

    const [users, setUsers] = useState([]);

    console.log(user);
    user = user[0];

    const [messages, setMessages] = useState([]);

    console.log(user);

    useEffect(()=>{
        const fetchMessages = async () => {
            try{
                const response = await axios.get(`/api/message/for-me/${user._id}`);
                setMessages(response.data.messages);
            }catch(err){
                console.error('Error while fetching messages');
            }
        }
        fetchMessages();
    },[user?._id]);

    useEffect(()=>{
        const fetchUsers = async () => {
            const response = await axios.get('/api/user/all');
            setUsers(response.data.users);
        }
        fetchUsers();
    },[])

    return (
        <div className={styles.mainContainer}>
            <div className={styles.header}>
                <div className={styles.myProfile}>

                </div>
                <div className={styles.options}>
                    <div className={styles.createGroup}>
    
                    </div>
                    <div className={styles.logout}>
                        {/* <button className={styles.sendButton}>
                            Logout
                        </button> */}
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.contactList}>
                {users.map(User=>(
                    <div className={styles.userCard}>
                        <AllUsers key={user._id} User = {User} />
                    </div>
                ))}
                </div>
                <div className={styles.detailedChat}>
                    {msgExpanded ? 
                        (
                            <>
                                <ShortProfile userId = {user2Id} />
                                <MessageBox user2Id = {user2Id} />
                            </>
                        )
                        :
                        'Messaging app - Select any user from left bar to chat with them'
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;
import { useContext, useEffect, useState } from 'react';
import styles from './styles/User.module.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const User = ({message}) => {
    const {user} = useContext(AuthContext);
    const myId = user ? user._id : null;

    const [senderId, setSenderId] = useState(message.senderId);
    const [receiverId, setReceiverId] = useState(message.receiverId);
    const [groupId, setGroupId] = useState(message.groupId);
    const [secondPartyId, setSecondPartyId] = useState(null);
    const [isGroupMessage, setIsGroupMessage] = useState(false);
    
    const [name, setName] = useState('');
    const [time, setTime] = useState(0);
    const [lastMessage, setLastMessage] = useState('');
    const [unreadMsgs, setUnreadMsgs] = useState(0);

    useEffect(()=>{
        if(senderId!=myId){
            setSecondPartyId(senderId);
        }else if(receiverId){
            setSecondPartyId(receiverId);
        }else{
            setIsGroupMessage(true);
            setSecondPartyId(groupId);
        }
    
        const fetchDetails = async ()=>{
            setTime(message.createdAt);
            setLastMessage(message.messageText);
            if(isGroupMessage){
                const groupResponse = await axios.get(`/api/group/get/${secondPartyId}`);
                const group = groupResponse.data.group;
                setName(group.groupName);
            }else{
                const userResponse = await axios.get(`/api/user/get-by-id/${secondPartyId}`);
                const user = userResponse.data.user;
                setName(user.userName);
            }
        }

        fetchDetails();
    },[message])

    return (
        <div className={styles.container}>
            <div className={styles.groupIcon}>
                {/* Example icon or initials */}
                {name[0]}
            </div>

            <div className={styles.info}>
                <div className={styles.nameAndTime}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.time}>{time}</div>
                </div>
                <div className={styles.msgAndNo}>
                    <div className={styles.msg}>{lastMessage}</div>
                    <div className={styles.no}>{unreadMsgs}</div>
                </div>
            </div>
        </div>
    );
}

export default User;

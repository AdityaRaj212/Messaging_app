import { useContext, useEffect, useState } from 'react';
import styles from './styles/AllUsers.module.css';
import { AuthContext } from '../context/AuthContext';
import { StateContext } from '../context/StateContext';

const AllUsers = ({User}) => {
    const {user} = useContext(AuthContext);
    const {msgExpanded, setMsgExpanded, user2Id, setUser2Id} = useContext(StateContext);

    const name = User.userName;

    const handleClick = () => {
        setUser2Id(User._id);
        setMsgExpanded(true);
        console.log(user2Id);
    }

    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.groupIcon}>
                {/* Example icon or initials */}
                {name[0]}
            </div>

            <div className={styles.info}>
                <div className={styles.nameAndTime}>
                    <div className={styles.name}>{name}</div>
                </div>
                <div className={styles.msgAndNo}>
                    <div className={styles.msg}>{'Start first chat'}</div>
                </div>
            </div>
        </div>
    );
}

export default AllUsers;
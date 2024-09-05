import { useEffect, useState } from 'react';
import styles from './styles/ShortProfile.module.css';
import axios from 'axios';

const ShortProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('Unknown');
    const [userStatus, setUserStatus] = useState('Offline');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userResponse = await axios.get(`/api/user/get-by-id/${userId}`);
                const userData = userResponse.data.user;
                setUser(userData);
                if (userData) {
                    setUserName(userData.userName);
                    setUserStatus(userData.status || 'Offline'); // Assuming user status is part of user data
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }

        fetchUserDetails();
    }, [userId]);

    return (
        <div className={styles.container}>
            <div className={styles.profileImg}>
                {userName[0].toUpperCase()}
            </div>
            <div className={styles.userInfo}>
                <div className={styles.userName}>
                    {userName}
                </div>
                <div className={`${styles.userStatus} ${userStatus === 'Online' ? styles.online : styles.offline}`}>
                    {userStatus}
                </div>
            </div>
        </div>
    );
}

export default ShortProfile;

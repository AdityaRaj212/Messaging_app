import { useEffect, useState } from 'react';
import styles from './styles/ShortProfile.module.css';
import axios from 'axios';

const ShortProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('Unknown');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userResponse = await axios.get(`/api/user/get-by-id/${userId}`);
                console.log(userResponse.data);
                setUser(userResponse.data.user);
                if (userResponse.data.user) {
                    setUserName(userResponse.data.user.userName);
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
                {userName[0]}
            </div>
            <div className={styles.userName}>
                {userName}
            </div>
        </div>
    );
}

export default ShortProfile;

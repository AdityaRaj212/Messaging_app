import { useContext, useState, useEffect } from 'react';
import styles from './styles/MessageBox.module.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import io from 'socket.io-client';  // Import socket.io-client

const MessageBox = ({ user2Id }) => {
    const { user } = useContext(AuthContext);
    const user1Id = user[0]._id;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(''); // For handling the input message
    const [socket, setSocket] = useState(null); // State to hold socket instance

    useEffect(() => {
        // Initialize socket connection
        const newSocket = io('http://localhost:3400');  // Connect to your Socket.IO server
        setSocket(newSocket);

        // Join the room for user1Id
        newSocket.emit('joinRoom', user1Id);

        // Fetch initial messages between the two users
        const fetchMessages = async () => {
            try {
                const messagesResponse = await axios.post('/api/message/between-users', { user1Id, user2Id });
                setMessages(messagesResponse.data.messages);
                setNewMessage('');
            } catch (err) {
                console.error('Error while fetching user chats: ', err);
            }
        };
        fetchMessages();

        // Listen for real-time new messages
        newSocket.on('newMessage', (message) => {
            if (message.senderId === user2Id || message.receiverId === user2Id) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        // Cleanup when the component is unmounted
        return () => newSocket.close();
    }, [user1Id, user2Id]);

    const sendMessage = async () => {
        if (newMessage.trim() === '') return; // Prevent sending empty messages

        try {
            const response = await axios.post('/api/message/direct', {
                senderId: user1Id,
                receiverId: user2Id,
                messageText: newMessage
            });

            setMessages([...messages, response.data.message]); // Add new message to the list
            setNewMessage(''); // Clear the input box
        } catch (err) {
            console.error('Error while sending message: ', err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.date}>
                {new Date().toLocaleDateString()}
            </div>
            <div className={styles.messages}>
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <div
                            key={msg._id}
                            className={`${styles.message} ${msg.senderId === user1Id ? styles.user1Message : styles.user2Message}`}
                        >
                            <p className={styles.messageText}>{msg.messageText}</p>
                            <div className={styles.time}>
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noMessages}>No messages yet</div>
                )}
            </div>

            {/* Input box and send button */}
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    className={styles.messageInput}
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className={styles.sendButton} onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default MessageBox;

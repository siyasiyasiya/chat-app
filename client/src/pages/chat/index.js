import styles from './styles.module.css';
import MessagesReceived from './messages';
import SendMessage from './send-messages';
import RoomAndUsersColumn from './room-and-users';
import { useState, useEffect, useRef } from 'react';


const Chat = ({ username, room, socket }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  socket.on("reconnect_attempt", (attempt) => {
    console.log('trying to reconnect')
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log('connected')
      console.log(socket.connected);
      // socket.on('chatroom_users', (data) => {
      //   console.log(data);
      //   setRoomUsers(data);
      // });
      // console.log(roomUsers)    
    });

    // socket.on('disconnect', function(){
    //   console.log('disconnected')
    // });

    // socket.on('chatroom_users', (data) => {
    //   console.log(data);
    //   setRoomUsers(data);
    //   console.log(roomUsers)
    // });

    // socket.on("online", (username) => {
    //   console.log(username, "Is Online!"); // update online status
    // });
    // socket.on("offline", (username) => {
    //   console.log(username, "Is Offline!"); // update online status
    // });
    if(!(roomUsers.find((user) => user.username === username))){
      console.log('are we running twice bro')
      if (room !== '' && username !== '') {
        socket.emit('join_room', { username, room });
      }
    }
    return () => socket.off('chatroom_users');
  }, [socket]);
  return (
    <div className={styles.chatContainer}>
        <RoomAndUsersColumn socket={socket} username={username} room={room} />
      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;
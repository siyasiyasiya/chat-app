import './App.css';
import { useState } from 'react';
import Home from './pages/home';
import Chat from './pages/chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('https://chat-app-backend-brown.vercel.app/');

function App() {
  const [username, setUsername] = useState(localStorage.getItem("user") || '');
  const [room, setRoom] = useState(localStorage.getItem("room") || '');
  console.log(username)
  const [join, setJoin] = useState([]);
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          {/* Add this */}
          <Route
            path='/chat'
            element={<Chat username={username} room={room} socket={socket} join={join} setJoin={setJoin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
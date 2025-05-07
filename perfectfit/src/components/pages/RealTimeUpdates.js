import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Match backend address

const RealTimeUpdates = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Socket connected');
    });

    socket.on('newAppointment', (data) => {
      console.log('📢', data.message);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Listening for real-time updates...</div>;
};

export default RealTimeUpdates;

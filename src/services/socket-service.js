import { io } from 'socket.io-client';
import { getToken } from '@/utils/token';

class SocketService {
  constructor() {
    this.socket = null;
    this.messageHandlers = new Set();
    this.statusHandlers = new Set();
    this.connectionHandlers = new Set();
  }

  connect() {
    if (this.socket?.connected) return;

    const token = getToken();
    if (!token) {
      console.error('No authentication token available');
      return;
    }

    this.socket = io('http://localhost:5173', {
      path: '/socket.io/',
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    this.socket.on('connect', () => {
      console.log('Socket.IO connected');
      this.connectionHandlers.forEach(handler => handler(true));
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.connectionHandlers.forEach(handler => handler(false));
    });

    this.socket.on('message', (message) => {
      this.messageHandlers.forEach(handler => handler(message));
    });

    this.socket.on('message_status', (data) => {
      this.statusHandlers.forEach(handler => handler(data));
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  sendMessage(receiverId, message) {
    if (!this.socket?.connected) {
      console.error('Socket not connected');
      return;
    }
    
    this.socket.emit('message', {
      receiver_id: receiverId,
      message: message
    });
  }

  updateMessageStatus(messageId, statusType) {
    if (!this.socket?.connected) return;
    
    this.socket.emit('message_status', {
      message_id: messageId,
      status_type: statusType
    });
  }

  onMessage(handler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  onStatusUpdate(handler) {
    this.statusHandlers.add(handler);
    return () => this.statusHandlers.delete(handler);
  }

  onConnectionChange(handler) {
    this.connectionHandlers.add(handler);
    return () => this.connectionHandlers.delete(handler);
  }
}

export const socketService = new SocketService();

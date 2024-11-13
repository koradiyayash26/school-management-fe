import { io } from 'socket.io-client';
import { getToken } from '@/utils/token';

class SocketService {
  constructor() {
    this.socket = null;
    this.messageHandlers = new Set();
    this.connected = false;
  }

  connect() {
    if (this.connected) return;

    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const token = localStorage.getItem('token');
      this.socket = new WebSocket(`${protocol}//${window.location.host}/ws/chat/?token=${token}`);

      this.socket.onopen = () => {
        console.log('WebSocket Connected');
        this.connected = true;
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.messageHandlers.forEach(handler => handler(data));
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      this.socket.onclose = () => {
        console.log('WebSocket Disconnected');
        this.connected = false;
        setTimeout(() => this.connect(), 5000);
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
        this.connected = false;
      };
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.connected = false;
    }
  }

  onMessage(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    this.messageHandlers.add(callback);
    return () => this.messageHandlers.delete(callback);
  }

  send(message) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify(message));
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.warn('WebSocket is not connected');
    }
  }
}

export const socketService = new SocketService();

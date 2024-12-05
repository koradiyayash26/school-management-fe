import { getToken } from "@/utils/token";

class SocketService {
  constructor() {
    this.socket = null;
    this.messageHandlers = new Set();
    this.connected = false;
  }

  connect() {
    if (this.connected) return;

    const token = getToken();
    this.socket = new WebSocket(
      `ws://127.0.0.1:8000/ws/socket-server/?token=${token}`
    );

    this.socket.onopen = () => {
      console.log("WebSocket Connected");
      this.connected = true;
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "chat_message":
            this.messageHandlers.forEach((handler) =>
              handler({
                type: "new_message",
                message: {
                  id: data.message_id,
                  message: data.message,
                  sender: {
                    id: data.sender_id,
                    username: data.sender_username,
                  },
                  timestamp: data.timestamp,
                  is_delivered: false,
                  is_read: false,
                },
              })
            );
            break;

          case "chat_cleared":
            this.messageHandlers.forEach((handler) =>
              handler({
                type: "chat_cleared",
                sender_id: data.sender_id,
                receiver_id: data.receiver_id,
                last_message: null,
              })
            );
            break;

          case "delete_message":
            this.messageHandlers.forEach((handler) =>
              handler({
                type: "delete_message",
                message_id: data.message_id,
                sender_id: data.sender_id,
                receiver_id: data.receiver_id,
                delete_type: data.delete_type,
              })
            );
            break;

          default:
            this.messageHandlers.forEach((handler) => handler(data));
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket Disconnected");
      this.connected = false;
      setTimeout(() => this.connect(), 5000);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
      this.connected = false;
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.connected = false;
    }
  }

  onMessage(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }
    this.messageHandlers.add(callback);
    return () => this.messageHandlers.delete(callback);
  }

  send(message) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify(message));
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.warn("WebSocket is not connected");
    }
  }

  sendChatMessage(receiverId, message) {
    this.send({
      type: "chat_message",
      receiver_id: receiverId,
      message: message,
    });
  }

  editMessage(messageId, message) {
    this.send({
      type: "edit_message",
      message_id: messageId,
      message: message,
    });
  }

  deleteMessage(messageId, deleteType) {
    this.send({
      type: "delete_message",
      message_id: messageId,
      deleteTypeMessage: deleteType,
    });
  }

  clearChatMessage(receiverId) {
    this.send({
      type: "clear_chat",
      receiver_id: receiverId,
    });
  }
}

export const socketService = new SocketService();

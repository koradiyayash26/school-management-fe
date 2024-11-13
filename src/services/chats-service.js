import apiClient from "@/lib/api-client";
import { getToken } from "@/utils/token";

export const chatService = {
  // Get all chats/conversations
  getChatList: async () => {
    try {
      const response = await apiClient.get("chats/api/chats/", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching chat list:", error);
      throw error;
    }
  },

  // Get messages for a specific chat
  getChatMessages: async (userId) => {
    try {
      const response = await apiClient.get(`chats/api/chats/${userId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      throw error;
    }
  },
  markChatAsRead: async (userId) => {
    try {
      const response = await apiClient.post(
        `chats/api/chats/${userId}/read/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error marking chat as read:", error);
      throw error;
    }
  },

  // Send a new message
  sendMessage: async (userId, message) => {
    try {
      const response = await apiClient.post(
        `chats/api/chats/${userId}/`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return {
        ...response.data,
        is_delivered: false,
        is_read: false
      };
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
  markMessageAsDelivered: async (messageId) => {
    try {
      const response = await apiClient.patch(
        `chats/api/messages/${messageId}/delivered/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error marking message as delivered:", error);
      throw error;
    }
  },

  markMessageAsRead: async (messageId) => {
    try {
      const response = await apiClient.patch(
        `chats/api/messages/${messageId}/read/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error marking message as read:", error);
      throw error;
    }
  },

  deleteMessage: async (messageId) => {
    try {
      const response = await apiClient.delete(`chats/api/messages/${messageId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting message:", error);
      throw error;
    }
  },

  editMessage: async (messageId, newMessage) => {
    try {
      const response = await apiClient.patch(
        `chats/api/messages/${messageId}/`,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error editing message:", error);
      throw error;
    }
  },

  deleteBulkMessages: async (messageIds) => {
    try {
      const response = await apiClient.post(
        `chats/api/messages/bulk-delete/`,
        { message_ids: messageIds },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error bulk deleting messages:", error);
      throw error;
    }
  },

  clearChat: async (userId) => {
    try {
      const response = await apiClient.delete(`chats/api/chats/${userId}/clear/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error clearing chat:", error);
      throw error;
    }
  },

  blockUser: async (userId) => {
    try {
      const response = await apiClient.post(
        `chats/api/users/${userId}/block/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error blocking user:", error);
      throw error;
    }
  },

  toggleMuteNotifications: async (userId, isMuted) => {
    try {
      const response = await apiClient.post(
        `chats/api/chats/${userId}/mute/`,
        { is_muted: isMuted },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating notification settings:", error);
      throw error;
    }
  },

  setDisappearingMessages: async (userId, duration) => {
    try {
      const response = await apiClient.post(
        `chats/api/chats/${userId}/disappearing-messages/`,
        { duration },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error setting disappearing messages:", error);
      throw error;
    }
  }
};

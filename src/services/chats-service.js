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
  }
};

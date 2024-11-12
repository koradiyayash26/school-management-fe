import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { chatService } from '@/services/chat-service'
import { format } from "date-fns"; // Add this import

import {
  BiLeftArrowAlt as IconArrowLeft,
  BiDotsVerticalRounded as IconDotsVertical,
  BiEdit as IconEdit,
  BiMessage as IconMessages,
  BiPaperclip as IconPaperclip,
  BiPhone as IconPhone,
  BiImageAdd as IconPhotoPlus,
  BiPlus as IconPlus,
  BiSearch as IconSearch,
  BiSend as IconSend,
  BiVideo as IconVideo,
  BiArrowToBottom,
} from "react-icons/bi";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { chatService } from "@/services/chats-service";
import { socketService } from "@/services/socket-service";
// import { socketService } from '@/services/socket-service'
import { ScrollArea } from "@/components/ui/scroll-area"  // Add this import

export default function Chats() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const queryClient = useQueryClient();

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ userId, message }) => {
      return await chatService.sendMessage(userId, message);
    },
    onSuccess: () => {
      // Invalidate and refetch queries after sending message
      queryClient.invalidateQueries(["messages", selectedUser?.id]);
      queryClient.invalidateQueries(["chats"]);
    },
  });

  // Handle sending message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedUser) return;

    sendMessageMutation.mutate({
      userId: selectedUser.id,
      message: messageInput.trim(),
    });

    setMessageInput("");
  };

  // Fetch chat list
  const {
    data: chats = [],
    isLoading: isLoadingChats,
    error: chatsError,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: chatService.getChatList,
    select: (data) => data || [], // Ensure we always have an array
  });

  // Filter conversations based on search
  const filteredChatList =
    chats?.filter(
      (chat) =>
        chat?.user?.username?.toLowerCase().includes(search.toLowerCase()) ??
        false
    ) ?? [];

  // Mark messages as read when selecting a chat
  const markMessagesAsRead = useMutation({
    mutationFn: (userId) => chatService.markChatAsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"]);
      queryClient.invalidateQueries(["messages", selectedUser?.id]);
    },
  });

  // Handle chat selection
  const handleChatSelect = (chat) => {
    setSelectedUser(chat.user);
    if (chat.unread_count > 0) {
      markMessagesAsRead.mutate(chat.user.id);
    }
  };

  // Show loading state
  if (isLoadingChats) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="text-muted-foreground">Loading chats...</div>
      </div>
    );
  }

  // Show error state
  if (chatsError) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="text-destructive">
          Error loading chats: {chatsError.message}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] rounded-lg border bg-background shadow">
      <div className="flex h-full">
        {/* Chat List Sidebar */}
        <div className="flex w-full flex-col border-r sm:w-[280px] xl:w-[340px]">
          {/* Search Header */}
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold tracking-tight mb-4">
              Messages
            </h2>
            <label className="relative flex h-9 w-full items-center rounded-md border border-input bg-background px-3 text-sm ring-offset-background">
              <IconSearch className="mr-2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                className="flex w-full bg-transparent placeholder:text-muted-foreground focus-visible:outline-none"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-auto">
            {filteredChatList.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No conversations found
              </div>
            ) : (
              <div className="space-y-0.5 p-2">
                {filteredChatList.map((chat) => (
                  <button
                    key={chat.user.id}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-muted",
                      selectedUser?.id === chat.user.id && "bg-muted"
                    )}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={chat.user.profile_image}
                        alt={chat.user.username}
                      />
                      <AvatarFallback>
                        {chat.user.username?.[0]?.toUpperCase() ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-medium">
                          {chat.user.username}
                        </p>
                        {chat.unread_count > 0 && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                            {chat.unread_count}
                          </span>
                        )}
                      </div>
                      {chat.last_message && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <span className="truncate">
                            {chat.last_message.message}
                          </span>
                          {chat.last_message.sender.id ===
                          chat.user.id ? null : (
                            <span className="ml-1 shrink-0">
                              {chat.last_message.is_read ? "✓✓" : "✓"}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        {selectedUser ? (
          <ChatArea
            user={selectedUser}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            onSendMessage={handleSendMessage}
            isLoading={sendMessageMutation.isLoading}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Message Status Component
function MessageStatus({ message, isCurrentUser }) {
  if (!isCurrentUser) return null;

  return (
    <span className="ml-1 inline-flex">
      {message.is_delivered ? (
        message.is_read ? (
          // Blue double ticks for read
          <span className="text-blue-500">✓✓</span>
        ) : (
          // Gray double ticks for delivered
          <span className="text-gray-400">✓✓</span>
        )
      ) : (
        // Single tick for sent
        <span className="text-gray-400">✓</span>
      )}
    </span>
  );
}

// Message Time Component
function MessageTime({ timestamp, className }) {
  const formatMessageTime = (timestamp) => {
    try {
      return format(new Date(timestamp), "HH:mm");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  return <span className={className}>{formatMessageTime(timestamp)}</span>;
}

// Message Component
function Message({ message, isCurrentUser }) {
  return (
    <div
      className={cn("flex", isCurrentUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5",
          isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        <p className="text-sm">{message.message}</p>
        <div
          className={cn(
            "mt-1 flex items-center justify-end gap-1 text-[10px]",
            isCurrentUser
              ? "text-primary-foreground/60"
              : "text-muted-foreground"
          )}
        >
          <span>{format(new Date(message.timestamp), "HH:mm")}</span>
          <MessageStatus message={message} isCurrentUser={isCurrentUser} />
        </div>
      </div>
    </div>
  );
}

// Chat Area Component
function ChatArea({
  user,
  messageInput,
  setMessageInput,
  onSendMessage,
  isLoading,
}) {
  const queryClient = useQueryClient();
  const messagesEndRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Fetch messages
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", user.id],
    queryFn: () => chatService.getChatMessages(user.id),
  });

  // Scroll to bottom function
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior
        });
      }
    }
  }, []);

  // Handle scroll
  const handleScroll = useCallback((event) => {
    const viewport = event.currentTarget;
    const { scrollHeight, scrollTop, clientHeight } = viewport;
    
    // Show button when scrolled up more than 100px from bottom
    const scrollFromBottom = scrollHeight - scrollTop - clientHeight;
    const shouldShowButton = scrollFromBottom > 100;
    
    setShowScrollButton(shouldShowButton);
  }, []);

  // Auto scroll on new messages if near bottom
  useEffect(() => {
    if (!showScrollButton) {
      scrollToBottom();
    }
  }, [messages.length, showScrollButton, scrollToBottom]);

  // Initial scroll
  useEffect(() => {
    scrollToBottom('auto');
  }, [scrollToBottom]);

  useEffect(() => {
    // Connect to WebSocket
    socketService.connect();

    // Handle new messages
    const messageUnsubscribe = socketService.onMessage((message) => {
      queryClient.invalidateQueries(["messages", user.id]);
      queryClient.invalidateQueries(["chats"]);
    });

    // Handle status updates
    const statusUnsubscribe = socketService.onStatusUpdate((data) => {
      queryClient.invalidateQueries(["messages", user.id]);
    });

    // Mark messages as read when they're visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const messageId = entry.target.dataset.messageId;
          socketService.updateMessageStatus(messageId, "read");
        }
      });
    });

    document.querySelectorAll(".message-item").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      messageUnsubscribe();
      statusUnsubscribe();
      observer.disconnect();
    };
  }, [user.id, queryClient]);

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Chat Header */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profile_image} alt={user.username} />
            <AvatarFallback>
              {user.username?.[0]?.toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs text-muted-foreground">
              {user.status || "Online"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <ScrollArea 
        ref={scrollAreaRef}
        className="flex-1"
        onScroll={handleScroll}
      >
        <div className="space-y-4 p-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              data-message-id={message.id}
              className="message-item"
            >
              <Message
                message={message}
                isCurrentUser={message.sender.id !== user.id}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Scroll to Bottom Button */}
      {!showScrollButton && (
        <div className="absolute bottom-20 right-6 z-10">
          <button
            onClick={() => scrollToBottom()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-all"
          >
            <BiArrowToBottom className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Message Input */}
      <div className="border-t p-4">
        <form 
          onSubmit={(e) => {
            onSendMessage(e);
            scrollToBottom();
          }} 
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9"
            disabled={isLoading || !messageInput.trim()}
          >
            <IconSend className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

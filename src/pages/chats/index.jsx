import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatService } from "@/services/chats-service";
import { socketService } from "@/services/socket-service";

// Message Status Component
function MessageStatus({ message, isCurrentUser }) {
  if (!isCurrentUser) return null;

  return (
    <span className="ml-1 inline-flex">
      {message.is_read ? (
        <span className="text-blue-500">✓✓</span>
      ) : message.is_delivered ? (
        <span className="text-gray-400">✓✓</span>
      ) : (
        <span className="text-gray-400">✓</span>
      )}
    </span>
  );
}

// Message Component
function Message({ message, isCurrentUser }) {
  return (
    <div
      className={cn(
        "flex w-full px-2",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "inline-block max-w-[65%]",
          isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted",
          "rounded-2xl px-3 py-2"
        )}
        style={{ wordBreak: 'break-word' }}
      >
        <div className="text-sm whitespace-pre-wrap">
          {message.message}
        </div>
        <div
          className={cn(
            "mt-1 flex items-center justify-end gap-1 text-[10px]",
            isCurrentUser ? "text-primary-foreground/60" : "text-muted-foreground"
          )}
        >
          <span>{format(new Date(message.timestamp), "HH:mm")}</span>
          <MessageStatus message={message} isCurrentUser={isCurrentUser} />
        </div>
      </div>
    </div>
  );
}

// ChatList Component
function ChatList({ search, setSearch, filteredChatList, selectedUser, handleChatSelect }) {
  return (
    <div className={cn(
      "flex flex-col md:flex-none flex-1 border-r  md:relative w-full md:w-[280px] xl:w-[340px] bg-background z-20 h-full",
      selectedUser ? "hidden md:flex" : "flex"
    )}>
      {/* Search Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold tracking-tight mb-4">Messages</h2>
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
      <ScrollArea className="flex-1 px-1">
        <div className="space-y-2 p-2">
          {filteredChatList.map((chat) => (
            <button
              key={chat.user.id}
              onClick={() => handleChatSelect(chat)}
              className={cn(
                "flex items-center gap-3 w-full rounded-lg p-3 text-left text-sm transition-colors hover:bg-muted",
                selectedUser?.id === chat.user.id && "bg-muted"
              )}
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={chat.user.profile_image} alt={chat.user.username} />
                <AvatarFallback>{chat.user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{chat.user.username}</span>
                  {chat.last_message && (
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(chat.last_message.timestamp), "HH:mm")}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="truncate text-xs text-muted-foreground">
                    {chat.last_message?.message || "No messages yet"}
                  </span>
                  {chat.unread_count > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {chat.unread_count}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* New Chat Button */}
      <div className="border-t p-4">
        <Button className="w-full justify-start gap-2">
          <IconEdit className="h-4 w-4" />
          New Chat
        </Button>
      </div>
    </div>
  );
}

// ChatArea Component
function ChatArea({
  selectedUser,
  setSelectedUser,
  messages,
  messageInput,
  setMessageInput,
  handleSendMessage,
  scrollAreaRef,
  showScrollButton,
  scrollToBottom,
}) {
  return (
    <div className="flex-1 flex flex-col w-full relative">
      {/* Chat Header */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedUser(null)}
            className="md:hidden -ml-2 p-2 hover:bg-muted rounded-full"
          >
            <IconArrowLeft className="h-5 w-5" />
          </button>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src={selectedUser.profile_image} alt={selectedUser.username} />
            <AvatarFallback>{selectedUser.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{selectedUser.username}</p>
            <p className="text-xs text-muted-foreground">
              {selectedUser.status || "Online"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="hidden sm:inline-flex h-8 w-8 rounded-full"
          >
            <IconVideo className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hidden sm:inline-flex h-8 w-8 rounded-full"
          >
            <IconPhone className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
          >
            <IconDotsVertical className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="space-y-4 p-4">
          {messages?.map((message) => (
            <div
              key={message.id}
              data-message-id={message.id}
              className="message-item"
            >
              <Message
                message={message}
                isCurrentUser={message.sender.id !== selectedUser.id}
              />
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <div className="absolute bottom-22 right-6 z-10">
          <button
            onClick={() => scrollToBottom()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
          >
            <BiArrowToBottom className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Message Input */}
      <div className="border-t p-2 sm:p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="flex items-center gap-2 rounded-md border border-input bg-background px-2 sm:px-3 py-2">
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="hidden sm:inline-flex h-8 w-8"
                >
                  <IconPlus className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <IconPhotoPlus className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <IconPaperclip className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm focus-visible:outline-none"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
            </div>
          </div>
          <Button
            type="submit"
            size="icon"
            className="h-[40px] w-[40px]"
            disabled={!messageInput.trim()}
          >
            <IconSend className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

// Main Chats Component
export default function Chats() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const queryClient = useQueryClient();
  const scrollAreaRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ userId, message }) => {
      return await chatService.sendMessage(userId, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", selectedUser?.id]);
      queryClient.invalidateQueries(["chats"]);
    },
  });

  // Scroll to bottom function
  const scrollToBottom = useCallback((behavior = "smooth") => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior,
        });
      }
    }
  }, []);

  // Handle sending message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedUser) return;

    sendMessageMutation.mutate({
      userId: selectedUser.id,
      message: messageInput.trim(),
    });

    setMessageInput("");
    scrollToBottom();
  };

  // Fetch messages for selected user
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", selectedUser?.id],
    queryFn: () => selectedUser ? chatService.getChatMessages(selectedUser.id) : [],
    enabled: !!selectedUser,
  });

  // Fetch chat list
  const {
    data: chats = [],
    isLoading: isLoadingChats,
    error: chatsError,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: chatService.getChatList,
    select: (data) => data || [],
  });

  // Updated scroll handler
  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );

    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = scrollContainer;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      setShowScrollButton(distanceFromBottom > 100);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto scroll on new messages if near bottom
  useEffect(() => {
    if (!showScrollButton) {
      scrollToBottom();
    }
  }, [messages?.length, showScrollButton, scrollToBottom]);

  // Initial scroll when selecting a user
  useEffect(() => {
    if (selectedUser) {
      scrollToBottom("auto");
    }
  }, [selectedUser?.id, scrollToBottom]);

  // WebSocket connection and message handling
  useEffect(() => {
    if (!selectedUser) return;

    socketService.connect();

    const messageUnsubscribe = socketService.onMessage((message) => {
      queryClient.invalidateQueries(["messages", selectedUser.id]);
      queryClient.invalidateQueries(["chats"]);
    });

    const statusUnsubscribe = socketService.onStatusUpdate((data) => {
      queryClient.invalidateQueries(["messages", selectedUser.id]);
    });

    return () => {
      messageUnsubscribe();
      statusUnsubscribe();
    };
  }, [selectedUser?.id, queryClient]);

  // Filter conversations based on search
  const filteredChatList = chats?.filter((chat) =>
    chat?.user?.username?.toLowerCase().includes(search.toLowerCase()) ?? false
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
    <div className="h-[calc(100vh-8rem)] flex flex-col overflow-hidden rounded-lg border bg-background shadow">
      <div className="flex h-full overflow-hidden">
        {/* Chat List Sidebar */}
        <ChatList
          search={search}
          setSearch={setSearch}
          filteredChatList={filteredChatList}
          selectedUser={selectedUser}
          handleChatSelect={handleChatSelect}
        />

        {/* Chat Area with fixed layout */}
        {selectedUser ? (
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            {/* Chat Header */}
            <div className="flex h-14 items-center justify-between border-b px-4 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="md:hidden -ml-2 p-2 hover:bg-muted rounded-full shrink-0"
                >
                  <IconArrowLeft className="h-5 w-5" />
                </button>
                
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={selectedUser.profile_image} alt={selectedUser.username} />
                  <AvatarFallback>{selectedUser.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 overflow-hidden">
                  <p className="text-sm font-medium leading-none truncate">
                    {selectedUser.username}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {selectedUser.status || "Online"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  className="hidden sm:inline-flex h-8 w-8 rounded-full"
                >
                  <IconVideo className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hidden sm:inline-flex h-8 w-8 rounded-full"
                >
                  <IconPhone className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full"
                >
                  <IconDotsVertical className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            {/* Updated Messages Container */}
            <ScrollArea 
              ref={scrollAreaRef}
              className="flex-1 w-full"
            >
              <div className="flex flex-col space-y-4 py-4 w-full overflow-hidden">
                {messages?.map((message) => (
                  <div key={message.id} className="w-full overflow-hidden">
                    <Message
                      message={message}
                      isCurrentUser={message.sender.id !== selectedUser.id}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Scroll to Bottom Button */}
            {showScrollButton && (
              <div className="absolute bottom-36 right-10 z-10">
                <button
                  onClick={() => scrollToBottom()}
                  className="dark:bg-primary bg-black hover:bg-primary/90 text-primary-foreground w-10 h-10 rounded-full dark:shadow-xl shadow-md dark:shadow-black shadow-white flex items-center justify-center transition-all hover:scale-105"
                >
                  <BiArrowToBottom className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Message Input */}
            <div className="border-t p-4 shrink-0 bg-background">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="relative flex-1 min-w-0">
                  <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                    <div className="flex gap-1 shrink-0">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="hidden sm:inline-flex h-8 w-8"
                      >
                        <IconPlus className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <IconPhotoPlus className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <IconPaperclip className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent text-sm focus-visible:outline-none min-w-0"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  size="icon"
                  className="h-[40px] w-[40px] shrink-0"
                  disabled={!messageInput.trim()}
                >
                  <IconSend className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <p className="text-muted-foreground whitespace-nowrap md:text-sm xl:text-lg">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Add this to your global CSS
const styles = `
  .overflow-wrap-anywhere {
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .message-bubble {
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;

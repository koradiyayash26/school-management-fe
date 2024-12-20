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
  BiTrash as IconTrash,
  BiCheck as IconCheck,
  BiBell as IconBell,
  BiTimer as IconTimer,
  BiX as IconX,
} from "react-icons/bi";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatService } from "@/services/chats-service";
import { socketService } from "@/services/socket-service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ErrorBoundary from "@/components/ErrorBoundary";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast, { Toaster } from "react-hot-toast";
import sendSound from "/sounds/send-sound.mp3";

// Add these helper functions at the top of your file
const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

const formatMessageDate = (date) => {
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "dd-MM-yyyy");
  }
};

const groupMessagesByDate = (messages) => {
  const grouped = {};
  messages?.forEach((message) => {
    const date = formatMessageDate(new Date(message.timestamp));
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(message);
  });
  return grouped;
};

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
function Message({
  message,
  selectedMessageLenght,
  isCurrentUser,
  onMessageAction,
  isSelected,
  onSelect,
  selectionMode,
}) {
  const [showActions, setShowActions] = useState(false);
  const [isOpenDeleteMessageDialog, setIsOpenDeleteMessageDialog] =
    useState(false);

  const handleMessageClick = (e) => {
    if (selectionMode) {
      onSelect(message);
    } else if (e.detail === 2) {
      // Double click
      onSelect(message);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full px-7 py-1 group relative dark:hover:bg-muted/10 hover:bg-[#e4e4e7] transition-colors",
        isCurrentUser ? "justify-end" : "justify-start",
        isSelected && "dark:bg-muted/20 bg-[#d4d4d8]"
      )}
      onClick={handleMessageClick}
    >
      {/* Radio Selection */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 transition-opacity",
          isCurrentUser ? "left-1" : "left-1",
          selectionMode ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className={cn(
            "h-5 w-5 border-2 flex items-center justify-center",
            isSelected ? "border-primary bg-primary" : "border-muted-foreground"
          )}
        >
          {isSelected && (
            <IconCheck className="h-5 w-5 text-primary-foreground" />
          )}
        </div>
      </div>

      <div
        className="inline-block max-w-[65%] relative group"
        onMouseEnter={() =>
          isCurrentUser && !selectionMode && setShowActions(true)
        }
        onMouseLeave={() =>
          isCurrentUser && !selectionMode && setShowActions(false)
        }
      >
        {/* Message Actions Dropdown - Only show for current user's messages */}
        {isCurrentUser && (
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-10 transition-opacity",
              "-left-10",
              showActions && !selectionMode ? "opacity-100" : "opacity-0"
            )}
          >
            <Dialog
              open={isOpenDeleteMessageDialog}
              onOpenChange={setIsOpenDeleteMessageDialog}
            >
              <div className="block md:flex gap-4">
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="bg-red-600 text-white hidden hover:bg-red-700 w-full sm:w-auto"
                  >
                    Delete Message
                  </Button>
                </DialogTrigger>
              </div>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-left">
                    Delete Message
                  </DialogTitle>
                  <DialogDescription className="text-left">
                    Click delete to delete message.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <div className="flex flex-col justify-end mt-2 lg:mt-0">
                    <Button
                      variant="destructive"
                      className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMessageAction("delete_all", message);
                      }}
                    >
                      Delete for everyone
                    </Button>
                  </div>
                  <div className="flex flex-col justify-end mt-2 lg:mt-0">
                    <Button
                      variant="destructive"
                      className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMessageAction("delete", message);
                      }}
                    >
                      Delete for me
                    </Button>
                  </div>
                  <div className="flex flex-col justify-end">
                    <Button
                      variant="destructive"
                      className="bg-white text-black hover:bg-gray-200 w-full sm:w-auto"
                      onClick={() => setIsOpenDeleteMessageDialog(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {selectedMessageLenght < 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowActions(true);
                    }}
                  >
                    <IconDotsVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={isCurrentUser ? "start" : "end"}
                className="w-[160px]"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {/* Only show Edit option if message is not read */}
                {!message.is_read && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onMessageAction("edit", message);
                    }}
                  >
                    Edit
                    <DropdownMenuShortcut>
                      <IconEdit className="h-4 w-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => setIsOpenDeleteMessageDialog(true)}
                >
                  Delete
                  <DropdownMenuShortcut>
                    <IconTrash className="h-4 w-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Message Content */}
        <div
          className={cn(
            "relative",
            isCurrentUser
              ? "bg-primary border-2 rounded-[16px_16px_0px_16px] text-primary-foreground"
              : "bg-muted border rounded-[16px_16px_16px_0px]",
            "px-3 py-2"
          )}
          style={{ wordBreak: "break-word" }}
        >
          <div className="text-sm whitespace-pre-wrap">{message.message}</div>
          <div
            className={cn(
              "mt-1 flex items-center gap-1 text-[10px]",
              isCurrentUser
                ? "text-primary-foreground/60 justify-end"
                : "text-muted-foreground justify-start"
            )}
          >
            {message.is_edited && <span>Edited</span>}
            <span>{format(new Date(message.timestamp), "HH:mm")}</span>
            <MessageStatus message={message} isCurrentUser={isCurrentUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ChatList Component
function ChatList({
  search,
  setSearch,
  filteredChatList,
  selectedUser,
  handleChatSelect,
}) {
  const formatLastMessageDate = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);

    if (isToday(date)) {
      return "Today"; // Changed from format(date, "HH:mm") to "Today"
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "dd-MM-yyyy");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-none flex-1 border-r  md:relative w-full md:w-[280px] xl:w-[340px] bg-background z-20 h-full",
        selectedUser ? "hidden md:flex" : "flex"
      )}
    >
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
                <AvatarImage
                  src={chat.user.profile_image}
                  alt={chat.user.username}
                />
                <AvatarFallback className="dark:border-none border dark:bg-muted bg-white">
                  {chat.user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{chat.user.username}</span>
                  {chat.last_message && (
                    <span className="text-xs text-muted-foreground">
                      {/* {format(new Date(chat.last_message.timestamp), "HH:mm")} */}
                      <span>
                        {formatLastMessageDate(chat.last_message.timestamp)}
                      </span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="truncate overflow-hidden w-[180px] text-xs text-muted-foreground">
                    {chat.last_message?.message || "No messages yet"}
                  </span>
                  {chat.unread_count > 0 && (
                    <span className="flex h-5 absolute right-8 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
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
            <AvatarImage
              src={selectedUser.profile_image}
              alt={selectedUser.username}
            />
            <AvatarFallback>
              {selectedUser.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">
              {selectedUser.username}
            </p>
            <p className="text-xs text-muted-foreground">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full"
              >
                <IconDotsVertical className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to clear all messages? This cannot be undone."
                    )
                  ) {
                    // Add your clear chat logic here
                    chatService.clearChat(selectedUser.id);
                  }
                }}
                className="text-destructive"
              >
                Clear Chat
                <DropdownMenuShortcut>
                  <IconTrash className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem>
                Mute Notifications
                <DropdownMenuShortcut>
                  <IconBell className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem>
                Disappearing Messages
                <DropdownMenuShortcut>
                  <IconTimer className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages Container */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 w-full">
        {messages?.length > 0 ? (
          <div className="flex flex-col space-y-4 py-4 w-full overflow-hidden">
            {Object.entries(groupMessagesByDate(messages)).map(
              ([date, dateMessages]) => (
                <div key={date} className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                      {date}
                    </div>
                  </div>
                  {dateMessages.map((message) => (
                    <div key={message.id} className="w-full overflow-hidden">
                      <Message
                        message={message}
                        isCurrentUser={message.sender.id !== selectedUser.id}
                        onMessageAction={handleMessageAction}
                        isSelected={selectedMessages.some(
                          (m) => m.id === message.id
                        )}
                        onSelect={handleMessageSelect}
                        selectionMode={selectionMode}
                      />
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        ) : (
          <div className="h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-muted-foreground">
            <IconMessages className="h-12 w-12 mb-2 opacity-50" />
            <p className="text-lg">No conversations yet</p>
            <p className="text-sm">Start chatting by sending a message</p>
          </div>
        )}
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
      <div className="border-t shrink-0 bg-background">
        <div className="p-4">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1 min-w-0">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                <div className="flex gap-1 shrink-0">
                  {/* Dropdown for small screens */}
                  <AttachmentDropdown />

                  {/* Regular buttons for larger screens */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hidden sm:inline-flex h-8 w-8"
                  >
                    <IconPhotoPlus className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hidden sm:inline-flex h-8 w-8"
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
              {editingMessage ? (
                <IconEdit className="h-4 w-4" />
              ) : (
                <IconSend className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Main Chats Component
export default function ChatsWrapper() {
  return (
    <ErrorBoundary>
      <Chats />
    </ErrorBoundary>
  );
}

function Chats() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const queryClient = useQueryClient();
  const scrollAreaRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [isOpenClearDialog, setIsOpenClearDialog] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const [isBulkMessageDeleteDialogbox, setIsBulkMessageDeleteDialogbox] =
    useState(false);
  // Create an audio object
  const sendSoundAudio = new Audio(sendSound);

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
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedUser) return;

    try {
      if (editingMessage) {
        await chatService.editMessage(editingMessage.id, messageInput.trim());
        await socketService.editMessage(editingMessage.id, messageInput.trim());
        sendSoundAudio.play();
        setEditingMessage(null);
      } else {
        // Send via WebSocket instead of REST API
        socketService.sendChatMessage(selectedUser.id, messageInput.trim());

        // Play the send sound
        sendSoundAudio.play();

        // Optimistically add message to UI
        const optimisticMessage = {
          id: Date.now(), // temporary ID
          message: messageInput.trim(),
          sender: { id: selectedUser.id }, // current user
          timestamp: new Date().toISOString(),
          is_delivered: false,
          is_read: false,
        };

        queryClient.setQueryData(["messages", selectedUser.id], (old) => [
          ...(old || []),
          optimisticMessage,
        ]);
      }
      setMessageInput("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending/editing message:", error);
      toast.error("Failed to send message");
    }
  };

  // Fetch messages for selected user
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", selectedUser?.id],
    queryFn: () =>
      selectedUser ? chatService.getChatMessages(selectedUser.id) : [],
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
    socketService.connect();

    const messageHandler = (data) => {
      if (data.type === "new_message") {
        // Update messages for current chat
        queryClient.invalidateQueries(["messages", selectedUser?.id]);

        // Update chat list to show latest message
        queryClient.setQueryData(["chats"], (oldChats) => {
          if (!oldChats) return oldChats;

          return oldChats.map((chat) => {
            if (
              chat.user.id === data.message.sender.id ||
              chat.user.id === selectedUser?.id
            ) {
              return {
                ...chat,
                last_message: {
                  message: data.message.message,
                  timestamp: data.message.timestamp,
                },
                unread_count:
                  chat.user.id === data.message.sender.id
                    ? (chat.unread_count || 0) + 1
                    : chat.unread_count,
              };
            }
            return chat;
          });
        });

        if (!showScrollButton) {
          scrollToBottom();
        }
      } else if (data.type === "delete_message") {
        setTimeout(() => {
          queryClient.invalidateQueries(["messages", selectedUser?.id]);
          queryClient.invalidateQueries(["chats"]);

          if (selectedUser?.id === data.receiver_id && !showScrollButton) {
            scrollToBottom();
          }
        }, 2000);
      }
    };

    const unsubscribe = socketService.onMessage(messageHandler);

    return () => {
      unsubscribe();
    };
  }, [selectedUser?.id, queryClient, showScrollButton, scrollToBottom]);

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

  // Handle chat selection (reset selection mode)
  const handleChatSelect = (chat) => {
    setSelectedUser(chat.user);
    setSelectionMode(false);
    setSelectedMessages([]);
    if (chat.unread_count > 0) {
      markMessagesAsRead.mutate(chat.user.id);
    }
  };

  // Handle message actions (edit/delete)
  const handleMessageAction = async (action, message) => {
    if (action === "edit") {
      setEditingMessage(message);
      setMessageInput(message.message);
    } else if (action === "delete") {
      try {
        socketService.deleteMessage(message.id, "delete");
        // await chatService.deleteMessage(message.id);
        queryClient.invalidateQueries(["messages", selectedUser?.id]);
        sendSoundAudio.play();
        setTimeout(() => {
          toast.success("Message Delete Successfully");
        }, 1000);
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    } else if (action === "delete_all") {
      try {
        socketService.deleteMessage(message.id, "delete_all");
        // await chatService.deleteMessage(message.id);
        queryClient.invalidateQueries(["messages", selectedUser?.id]);
        sendSoundAudio.play();
        setTimeout(() => {
          toast.success("Message Delete Everyone Successfully");
        }, 1000);
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  // Handle message selection
  const handleMessageSelect = (message) => {
    if (!selectionMode) {
      setSelectionMode(true);
      setSelectedMessages([message]);
    } else {
      setSelectedMessages((prev) => {
        const isSelected = prev.some((m) => m.id === message.id);
        if (isSelected) {
          const newSelection = prev.filter((m) => m.id !== message.id);
          if (newSelection.length === 0) {
            setSelectionMode(false);
          }
          return newSelection;
        } else {
          return [...prev, message];
        }
      });
    }
  };

  // Handle exit selection mode
  const handleExitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedMessages([]);
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    // if (window.confirm(`Delete ${selectedMessages.length} messages?`)) {
    try {
      // await chatService.deleteBulkMessages(selectedMessages.map((m) => m.id));
      socketService.deleteBulkMessages(selectedMessages.map((m) => m.id));
      sendSoundAudio.play();
      setTimeout(() => {
        toast.success(`Messages deleted successfully`);
      });
      queryClient.invalidateQueries(["messages", selectedUser?.id]);
      setSelectionMode(false);
      setSelectedMessages([]);
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
    // }
  };

  // Add this mutation
  const clearChatMutation = useMutation({
    mutationFn: (userId) => chatService.clearChat(userId),
    onSuccess: () => {
      // Invalidate both messages and chat list queries
      queryClient.invalidateQueries(["messages", selectedUser?.id]);
      queryClient.invalidateQueries(["chats"]);

      // Optionally clear the cache directly
      queryClient.setQueryData(["messages", selectedUser?.id], []);
      setTimeout(() => {
        toast.success("Chat Clear Successfully");
      }, 1000);
    },
  });

  // Update the dropdown menu handler
  const handleClearChat = async () => {
    try {
      setIsClearing(true);
      // await clearChatMutation.mutateAsync(selectedUser.id);
      socketService.clearChatMessage(selectedUser.id);
      setTimeout(() => {
        toast.success("Chat Clear Successfully");
      }, 1000);
      queryClient.invalidateQueries(["messages", selectedUser?.id]);
      queryClient.invalidateQueries(["chats"]);

      setIsOpenClearDialog(false);
    } catch (error) {
      console.error("Error clearing chat:", error);
      toast.error(error);
      setIsClearing(false);
    } finally {
      setIsClearing(false);
      setIsOpenClearDialog(false);
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

  // Add this component inside Chats function before the return statement
  const EditMessageBox = () => {
    if (!editingMessage) return null;

    return (
      <div className="border-t border-b bg-muted/30 px-4 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Editing message
              </span>
              <IconEdit className="h-3 w-3 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {editingMessage.message}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0"
            onClick={() => {
              setEditingMessage(null);
              setMessageInput("");
            }}
          >
            <IconX className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Add this component inside Chats function before the return statement
  const AttachmentDropdown = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="sm:hidden h-8 w-8"
          >
            <IconPlus className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuItem>
            <IconPhotoPlus className="h-4 w-4 mr-2" />
            Add Image
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPaperclip className="h-4 w-4 mr-2" />
            Attach File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col overflow-hidden rounded-lg border bg-background shadow">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
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
                  <AvatarImage
                    src={selectedUser.profile_image}
                    alt={selectedUser.username}
                  />
                  <AvatarFallback className="border dark:border-none">
                    {selectedUser.username[0].toUpperCase()}
                  </AvatarFallback>
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
                {/* dialog */}
                <Dialog
                  open={isOpenClearDialog}
                  onOpenChange={setIsOpenClearDialog}
                >
                  <div className="block md:flex gap-4">
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="bg-red-600 text-white hidden hover:bg-red-700 w-full sm:w-auto"
                      >
                        Clear ChatBoto
                      </Button>
                    </DialogTrigger>
                  </div>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-left">
                        Clear Chat
                      </DialogTitle>
                      <DialogDescription className="text-left">
                        Click clear to clear chat.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <div className="flex flex-col justify-end mt-2 lg:mt-0">
                        <Button
                          variant="destructive"
                          className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
                          onClick={handleClearChat}
                          disabled={isClearing}
                        >
                          {isClearing ? "Clearing..." : "Clear"}
                        </Button>
                      </div>
                      <div className="flex flex-col justify-end">
                        <Button
                          variant="destructive"
                          className="bg-white text-black hover:bg-gray-200 w-full sm:w-auto"
                          onClick={() => setIsOpenClearDialog(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {/* diaoload */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full"
                    >
                      <IconDotsVertical className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem
                      onClick={() => setIsOpenClearDialog(true)}
                      className="text-destructive"
                    >
                      Clear Chat
                      <DropdownMenuShortcut>
                        <IconTrash className="h-4 w-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      Mute Notifications
                      <DropdownMenuShortcut>
                        <IconBell className="h-4 w-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      Disappearing Messages
                      <DropdownMenuShortcut>
                        <IconTimer className="h-4 w-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Selection Mode Header */}
            {selectionMode && (
              <div className="flex items-center justify-between px-4 py-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExitSelectionMode}
                    className="p-2 hover:bg-muted rounded-full"
                  >
                    <IconArrowLeft className="h-5 w-5" />
                  </button>
                  <span className="font-medium">
                    {selectedMessages.length} selected
                  </span>
                </div>
                <Dialog
                  open={isBulkMessageDeleteDialogbox}
                  onOpenChange={setIsBulkMessageDeleteDialogbox}
                >
                  <div className="block md:flex gap-4">
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="bg-red-600 text-white hidden hover:bg-red-700 w-full sm:w-auto"
                      >
                        Delete Message
                      </Button>
                    </DialogTrigger>
                  </div>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-left">
                        Delete Message
                      </DialogTitle>
                      <DialogDescription className="text-left">
                        Click delete to delete {selectedMessages.length}{" "}
                        messages.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <div className="flex flex-col justify-end mt-2 lg:mt-0">
                        <Button
                          variant="destructive"
                          className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
                          onClick={handleBulkDelete}
                        >
                          Delete
                        </Button>
                      </div>
                      <div className="flex flex-col justify-end">
                        <Button
                          variant="destructive"
                          className="bg-white text-black hover:bg-gray-200 w-full sm:w-auto"
                          onClick={() => setIsBulkMessageDeleteDialogbox(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <button
                  onClick={() => setIsBulkMessageDeleteDialogbox(true)}
                  className="text-destructive hover:bg-muted p-2 rounded-full"
                >
                  <IconTrash className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Messages Container */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 w-full">
              <div className="flex flex-col space-y-4 py-4 w-full overflow-hidden">
                {messages?.length > 0 ? (
                  <div className="flex flex-col space-y-4 py-4 w-full overflow-hidden">
                    {Object.entries(groupMessagesByDate(messages)).map(
                      ([date, dateMessages]) => (
                        <div key={date} className="space-y-1">
                          <div className="flex items-center justify-center">
                            <div className="bg-muted px-3 py-1 rounded text-xs text-muted-foreground">
                              {date}
                            </div>
                          </div>
                          {dateMessages.map((message) => (
                            <div
                              key={message.id}
                              className="w-full overflow-hidden"
                            >
                              <Message
                                message={message}
                                selectedMessageLenght={selectedMessages.length}
                                isCurrentUser={
                                  message.sender.id !== selectedUser.id
                                }
                                onMessageAction={handleMessageAction}
                                isSelected={selectedMessages.some(
                                  (m) => m.id === message.id
                                )}
                                onSelect={handleMessageSelect}
                                selectionMode={selectionMode}
                              />
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="h-[calc(100vh-19rem)] flex flex-col items-center justify-center text-muted-foreground">
                    <IconMessages className="h-12 w-12 mb-2 opacity-50" />
                    <p className="text-lg">No conversations yet</p>
                    <p className="text-sm">
                      Start chatting by sending a message
                    </p>
                  </div>
                )}
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
            <div className="border-t shrink-0 bg-background">
              {/* Add EditMessageBox above the form */}
              <EditMessageBox />

              <div className="p-4">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center gap-2"
                >
                  <div className="relative flex-1 min-w-0">
                    <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
                      <div className="flex gap-1 shrink-0">
                        {/* Dropdown for small screens */}
                        <AttachmentDropdown />

                        {/* Regular buttons for larger screens */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="hidden sm:inline-flex h-8 w-8"
                        >
                          <IconPhotoPlus className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="hidden sm:inline-flex h-8 w-8"
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
                    {editingMessage ? (
                      <IconEdit className="h-4 w-4" />
                    ) : (
                      <IconSend className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </div>
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

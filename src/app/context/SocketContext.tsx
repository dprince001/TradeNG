"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";

export interface SocketNotification {
  id: string;
  message: string;
  type?: string;
  read?: boolean;
  created_at?: string;
  data?: Record<string, any>;
}

export interface IncomingMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  message_type: "TEXT" | "OFFER";
  created_at: string;
  offer?: any;
}

interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
  notifications: SocketNotification[];
  unreadNotificationCount: number;
  unreadMessageCount: number;
  markNotificationsRead: () => void;
  joinConversation: (conversationId: string) => void;
  leaveConversation: (conversationId: string) => void;
  startTyping: (conversationId: string) => void;
  stopTyping: (conversationId: string) => void;
  onTyping: (callback: (data: any) => void) => () => void;
  onStopTyping: (callback: (data: any) => void) => () => void;
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  isConnected: false,
  notifications: [],
  unreadNotificationCount: 0,
  unreadMessageCount: 0,
  markNotificationsRead: () => { },
  joinConversation: () => { },
  leaveConversation: () => { },
  startTyping: () => { },
  stopTyping: () => { },
  onTyping: (callback: (data: any) => void) => () => { },
  onStopTyping: (callback: (data: any) => void) => () => { },
});

const SOCKET_URL = "https://tradeng-api.onrender.com";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: any) => state.app.userInfo?.token);
  const userId = useSelector((state: any) => state.app.userInfo?.user?.id);

  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<SocketNotification[]>([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  // Connect / reconnect whenever token changes
  useEffect(() => {
    // Disconnect any previous socket
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    if (!token) return;

    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected, authenticating user...");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.warn("[Socket] Connection error:", err.message);
    });

    // ---- Notification events ------------------------------------------------
    const handleNotification = (data: SocketNotification) => {
      console.log('notification received', data);
      setNotifications((prev) => [data, ...prev]);
      setUnreadNotificationCount((c) => c + 1);
    };

    socket.on("notification:new", handleNotification);

    // ---- New message ------------------------------
    socket.on("message:new", () => {
      console.log('message received');
      setUnreadMessageCount((c) => c + 1);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [token, userId]);

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------
  const joinConversation = useCallback((conversationId: string) => {
    socketRef.current?.emit("conversation:join", { conversation_id: conversationId });
    console.log('joining conversation', conversationId)
  }, []);

  const leaveConversation = useCallback((conversationId: string) => {
    socketRef.current?.emit("conversation:leave", { conversation_id: conversationId });
    console.log('leaving conversation', conversationId)
    // Reset unread when leaving
    setUnreadMessageCount(0);
  }, []);

  const startTyping = useCallback((conversationId: string) => {
    socketRef.current?.emit("typing:start", { conversation_id: conversationId });
  }, []);

  const stopTyping = useCallback((conversationId: string) => {
    socketRef.current?.emit("typing:stop", { conversation_id: conversationId });
  }, []);

  const onTyping = useCallback((callback: (data: any) => void) => {
    socketRef.current?.on("typing:start", callback);
    return () => { socketRef.current?.off("typing:start", callback); };
  }, []);

  const onStopTyping = useCallback((callback: (data: any) => void) => {
    socketRef.current?.on("typing:stop", callback);
    return () => { socketRef.current?.off("typing:stop", callback); };
  }, []);


  const markNotificationsRead = useCallback(() => {
    setUnreadNotificationCount(0);
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        notifications,
        unreadNotificationCount,
        unreadMessageCount,
        markNotificationsRead,
        joinConversation,
        leaveConversation,
        startTyping,
        stopTyping,
        onTyping,
        onStopTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '@/types/tasks';

interface WebSocketContextType {
  tasks: Task[];
  isConnected: boolean;
  error: string | null;
  socket: WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextType>({
  tasks: [],
  isConnected: false,
  error: null,
  socket: null
});

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws`);
    setSocket(ws);

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setTasks(data);
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
        setError('Failed to parse message from server');
      }
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('WebSocket connection error');
      setIsConnected(false);
    };

    ws.onclose = () => {
      setIsConnected(false);
      setError('WebSocket connection closed');
      setSocket(null);
      
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        setError('Attempting to reconnect...');
      }, 5000);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
      setSocket(null);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <WebSocketContext.Provider value={{ tasks, isConnected, error, socket }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}
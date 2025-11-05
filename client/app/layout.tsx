

'use client'; 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Column from "@/components/Column";
import { WebSocketProvider } from "@/context/WebSocketContext";
import CreateTask from "@/components/CreateTask";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 


import { useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebSocketProvider>
          <main className="min-h-screen p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Todo Board</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Task
              </button>
            </div>
            <CreateTask isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className="grid-container flex gap-6">
              <Column title="Todo" status="todo" />
              <Column title="In work" status="in-work" />
              <Column title="Done" status="done" />
            </div>
            {children}
          </main>
        </WebSocketProvider>
      </body>
    </html>
  );
}

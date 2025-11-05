'use client';

import { useWebSocket } from '@/context/WebSocketContext';
import { Task, TaskStatus } from '@/types/tasks';

interface ColumnProps {
  title: string;
  status: TaskStatus;
}

const Column = ({ title, status }: ColumnProps) => {
  const { tasks, isConnected, error } = useWebSocket();
  const columnTasks = tasks.filter(task => task.status === status);

  return (
    <div className="flex flex-col bg-gray-100 rounded-lg p-4 min-w-[250px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {status === 'todo' && (
          <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        )}
      </div>
      <div className="flex-1 space-y-2">
        {error && status === 'todo' && (
          <div className="text-sm text-red-500 mb-2">{error}</div>
        )}
        {columnTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-3 rounded shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            <div className="text-xs text-gray-400 mt-2">
              Updated: {new Date(task.updatedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
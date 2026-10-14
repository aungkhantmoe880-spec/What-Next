import { useState, useEffect, useMemo, useCallback } from 'react';
import { Task, StarRating } from './types';
import {
  loadTasksFromStorage,
  saveTasksToStorage,
  createSampleTasks,
} from './utils/storage';
import Header from './components/Header';
import NavigationTabs, { ScreenTab } from './components/NavigationTabs';
import InputTasksScreen from './screens/InputTasksScreen';
import TodoListScreen from './screens/TodoListScreen';
import CompletedTasksScreen from './screens/CompletedTasksScreen';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());
  const [activeScreen, setActiveScreen] = useState<ScreenTab>('todo');
  const [recentTaskIds, setRecentTaskIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Synchronize tasks to localStorage
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, isLoaded]);

  // Audio cue on task completion (soft subtle pleasant chime)
  const playCompleteChime = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } catch {
      // AudioContext policy check
    }
  }, []);

  // Sort active tasks: 5 stars to 1 star (descending), then stable by creation time (ascending)
  const activeTasks = useMemo(() => {
    return tasks
      .filter((t) => !t.completed)
      .sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return a.createdAt - b.createdAt;
      });
  }, [tasks]);

  // Sort completed tasks: most recently completed first
  const completedTasks = useMemo(() => {
    return tasks
      .filter((t) => t.completed)
      .sort((a, b) => {
        const timeB = b.completedAt || b.createdAt;
        const timeA = a.completedAt || a.createdAt;
        return timeB - timeA;
      });
  }, [tasks]);

  const recentTasks = useMemo(() => {
    return tasks.filter((t) => recentTaskIds.includes(t.id));
  }, [tasks, recentTaskIds]);

  const totalCount = tasks.length;
  const completedCount = completedTasks.length;
  const activeCount = activeTasks.length;

  // Task actions
  const handleAddTask = (text: string, rating: StarRating): string => {
    const id = `task-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const newTask: Task = {
      id,
      text,
      rating,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setRecentTaskIds((prev) => [id, ...prev.slice(0, 9)]);
    return id;
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const willComplete = !t.completed;
          if (willComplete) {
            playCompleteChime();
          }
          return {
            ...t,
            completed: willComplete,
            completedAt: willComplete ? Date.now() : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleEditTask = (id: string, text: string, rating: StarRating) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text, rating } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setRecentTaskIds((prev) => prev.filter((item) => item !== id));
  };

  const handleRestoreTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: false, completedAt: undefined } : t
      )
    );
  };

  const handleRestoreAllTasks = () => {
    if (window.confirm('Restore all completed tasks to your active To-Do list?')) {
      setTasks((prev) =>
        prev.map((t) => ({ ...t, completed: false, completedAt: undefined }))
      );
    }
  };

  const handleClearCompleted = () => {
    if (window.confirm('Permanently remove all completed tasks?')) {
      setTasks((prev) => prev.filter((t) => !t.completed));
    }
  };

  const handleResetTasks = () => {
    if (window.confirm('Clear all tasks and start fresh?')) {
      setTasks([]);
      setRecentTaskIds([]);
    }
  };

  const handleLoadSamples = () => {
    const samples = createSampleTasks();
    setTasks(samples);
    setRecentTaskIds(samples.map((s) => s.id));
    setActiveScreen('todo');
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        onResetTasks={tasks.length > 0 ? handleResetTasks : undefined}
        hasTasks={tasks.length > 0}
      />

      {/* Screen Navigation Tabs */}
      <NavigationTabs
        activeTab={activeScreen}
        onChangeTab={setActiveScreen}
        activeCount={activeCount}
        completedCount={completedCount}
      />

      {/* Main Viewport Content matching the active screen */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeScreen === 'input' && (
          <InputTasksScreen
            onAddTask={handleAddTask}
            onNavigateToTodoList={() => setActiveScreen('todo')}
            onLoadSamples={handleLoadSamples}
            recentTasks={recentTasks}
            hasExistingTasks={tasks.length > 0}
          />
        )}

        {activeScreen === 'todo' && (
          <TodoListScreen
            activeTasks={activeTasks}
            completedCount={completedCount}
            totalCount={totalCount}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onNavigateToInput={() => setActiveScreen('input')}
            onNavigateToCompleted={() => setActiveScreen('completed')}
            onLoadSamples={tasks.length === 0 ? handleLoadSamples : undefined}
          />
        )}

        {activeScreen === 'completed' && (
          <CompletedTasksScreen
            completedTasks={completedTasks}
            activeCount={activeCount}
            totalCount={totalCount}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onRestoreTask={handleRestoreTask}
            onRestoreAllTasks={handleRestoreAllTasks}
            onClearCompleted={handleClearCompleted}
            onNavigateToTodoList={() => setActiveScreen('todo')}
            onNavigateToInput={() => setActiveScreen('input')}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-neutral-200/80 py-5 text-center text-xs text-neutral-600">
        <p>
          What Next? — Minimal Daily Task Manager · Saved locally on your device
        </p>
      </footer>
    </div>
  );
}

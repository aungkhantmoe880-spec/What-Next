import { PlusCircle, ListTodo, CheckCircle2 } from 'lucide-react';

export type ScreenTab = 'input' | 'todo' | 'completed';

interface NavigationTabsProps {
  activeTab: ScreenTab;
  onChangeTab: (tab: ScreenTab) => void;
  activeCount: number;
  completedCount: number;
}

export default function NavigationTabs({
  activeTab,
  onChangeTab,
  activeCount,
  completedCount,
}: NavigationTabsProps) {
  return (
    <nav
      aria-label="Screen Navigation"
      className="bg-white border-b border-neutral-200/90 sticky top-[65px] z-10"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between sm:justify-start gap-1 sm:gap-2 py-2">
          {/* Tab 1: To-Do List */}
          <button
            type="button"
            onClick={() => onChangeTab('todo')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              activeTab === 'todo'
                ? 'bg-sky-100 text-sky-950 border border-sky-300 shadow-xs'
                : 'text-neutral-600 hover:text-sky-900 hover:bg-sky-50/80 border border-transparent'
            }`}
          >
            <ListTodo className={`w-4 h-4 shrink-0 ${activeTab === 'todo' ? 'text-sky-700' : 'text-blue-600'}`} />
            <span className="whitespace-nowrap">To-Do List</span>
            <span
              className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums ${
                activeTab === 'todo'
                  ? 'bg-sky-200 text-sky-900'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              {activeCount}
            </span>
          </button>

          {/* Tab 2: Input Tasks */}
          <button
            type="button"
            onClick={() => onChangeTab('input')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              activeTab === 'input'
                ? 'bg-sky-100 text-sky-950 border border-sky-300 shadow-xs'
                : 'text-neutral-600 hover:text-sky-900 hover:bg-sky-50/80 border border-transparent'
            }`}
          >
            <PlusCircle className={`w-4 h-4 shrink-0 ${activeTab === 'input' ? 'text-sky-700' : 'text-blue-600'}`} />
            <span className="whitespace-nowrap">Input Tasks</span>
          </button>

          {/* Tab 3: Completed */}
          <button
            type="button"
            onClick={() => onChangeTab('completed')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              activeTab === 'completed'
                ? 'bg-sky-100 text-sky-950 border border-sky-300 shadow-xs'
                : 'text-neutral-600 hover:text-sky-900 hover:bg-sky-50/80 border border-transparent'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 ${activeTab === 'completed' ? 'text-sky-700' : 'text-blue-600'}`} />
            <span className="whitespace-nowrap">Completed</span>
            {completedCount > 0 && (
              <span
                className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums ${
                  activeTab === 'completed'
                    ? 'bg-sky-200 text-sky-900'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                {completedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

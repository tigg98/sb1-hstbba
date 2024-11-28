import React, { useState } from 'react';
import { Activity, BarChart3, Calendar, Home, Settings, Trophy } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Log from './pages/Log';
import Insights from './pages/Analytics';
import Exercise from './pages/Exercise';
import Achievements from './pages/Achievements';
import SettingsPage from './pages/Settings';

type Page = 'dashboard' | 'log' | 'exercise' | 'insights' | 'settings' | 'achievements';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />;
      case 'log':
        return <Log />;
      case 'insights':
        return <Insights />;
      case 'exercise':
        return <Exercise />;
      case 'achievements':
        return <Achievements />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="container mx-auto px-4 py-8 mt-16">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
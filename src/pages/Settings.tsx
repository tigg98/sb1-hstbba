import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Heart, 
  Share2, 
  Shield, 
  Database,
  Trash2,
  HelpCircle,
  FileText,
  AlertCircle
} from 'lucide-react';
import ProfileSettings from '../components/Settings/ProfileSettings';
import MedicalSettings from '../components/Settings/MedicalSettings';
import NotificationSettings from '../components/Settings/NotificationSettings';
import PrivacySettings from '../components/Settings/PrivacySettings';
import DataSettings from '../components/Settings/DataSettings';

type SettingsTab = 'profile' | 'medical' | 'notifications' | 'privacy' | 'data';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile' as SettingsTab, label: 'Profile', icon: User },
    { id: 'medical' as SettingsTab, label: 'Medical Info', icon: Heart },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: Bell },
    { id: 'privacy' as SettingsTab, label: 'Privacy', icon: Lock },
    { id: 'data' as SettingsTab, label: 'Data & Export', icon: Database }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'medical':
        return <MedicalSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'data':
        return <DataSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and information</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <nav className="space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
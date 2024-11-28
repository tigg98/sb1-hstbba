import React, { useState } from 'react';
import ActivityLogTabs from '../components/Log/ActivityLogTabs';
import CategoryHeader from '../components/Log/CategoryHeader';
import ActivityTimeline from '../components/Log/ActivityTimeline';
import { useLogModals } from '../hooks/useLogModals';
import { categoryInfo } from '../data/categoryInfo';
import type { ActivityType } from '../types/activity';

export default function Log() {
  const [activeTab, setActiveTab] = useState<ActivityType>('all');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateView, setDateView] = useState<'day' | 'week' | 'month'>('day');
  const { modals, openModal } = useLogModals();

  return (
    <div className="space-y-6">
      <ActivityLogTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab !== 'all' && (
        <CategoryHeader
          category={activeTab}
          info={categoryInfo[activeTab]}
          onLogActivity={openModal}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          view={dateView}
          onViewChange={setDateView}
        />
      )}

      <ActivityTimeline 
        activeTab={activeTab}
        selectedDate={selectedDate}
        view={dateView}
      />

      {/* Modals */}
      {Object.entries(modals).map(([key, { isOpen, onClose }]) => {
        const Modal = categoryInfo[key as ActivityType].Modal;
        return (
          <Modal
            key={key}
            isOpen={isOpen}
            onClose={onClose}
          />
        );
      })}
    </div>
  );
}
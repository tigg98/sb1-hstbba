import React from 'react';
import DashboardLayout from './Dashboard/DashboardLayout';

interface Props {
  onPageChange: (page: 'dashboard' | 'log' | 'exercise' | 'analytics' | 'settings' | 'achievements') => void;
}

export default function Dashboard({ onPageChange }: Props) {
  return <DashboardLayout onPageChange={onPageChange} />;
}
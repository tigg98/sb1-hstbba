import React from 'react';
import { Download, Database, Trash2, Upload } from 'lucide-react';

export default function DataSettings() {
  const handleExportData = () => {
    // Implement data export functionality
    console.log('Exporting data...');
  };

  const handleImportData = () => {
    // Implement data import functionality
    console.log('Importing data...');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Implement account deletion
      console.log('Deleting account...');
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Export */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Download className="h-5 w-5 text-gray-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Export Your Data</h2>
            <p className="text-sm text-gray-600">Download a copy of your data</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Your export will include:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Health logs and symptoms</li>
            <li>Exercise records</li>
            <li>Meal tracking data</li>
            <li>Progress reports</li>
            <li>Personal settings</li>
          </ul>

          <div className="flex space-x-4">
            <button
              onClick={handleExportData}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export as JSON</span>
            </button>
            <button
              onClick={handleExportData}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export as CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Import */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Upload className="h-5 w-5 text-gray-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Import Data</h2>
            <p className="text-sm text-gray-600">Import your health data</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            You can import data from:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Previous IBSed exports</li>
            <li>Compatible health apps</li>
            <li>Medical records (supported formats)</li>
          </ul>

          <button
            onClick={handleImportData}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Select File to Import</span>
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Database className="h-5 w-5 text-gray-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Data Management</h2>
            <p className="text-sm text-gray-600">Manage your stored data</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Data Storage</h3>
            <p className="text-sm text-yellow-700">
              Your data is stored securely and encrypted. We retain your health data for as long as your account is active.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <button
              onClick={handleDeleteAccount}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Account</span>
            </button>
            <p className="mt-2 text-sm text-gray-500">
              This will permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Lock, Shield, Share2, Eye } from 'lucide-react';

export default function PrivacySettings() {
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: {
      shareWithProviders: true,
      shareAnonymousData: false,
      allowResearch: false
    },
    visibility: {
      profilePublic: false,
      showProgress: true,
      showAchievements: true
    },
    security: {
      twoFactorEnabled: false,
      biometricEnabled: true,
      sessionTimeout: '30'
    }
  });

  return (
    <div className="space-y-6">
      {/* Data Sharing */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Share2 className="h-5 w-5 text-gray-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Data Sharing</h2>
            <p className="text-sm text-gray-600">Control how your data is shared</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Share with Healthcare Providers</span>
              <p className="text-sm text-gray-500">Allow your doctors to access your health data</p>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={privacySettings.dataSharing.shareWithProviders}
                onChange={(e) => setPrivacySettings({
                  ...privacySettings,
                  dataSharing: {
                    ...privacySettings.dataSharing,
                    shareWithProviders: e.target.checked
                  }
                })}
                className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label className={`switch-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                privacySettings.dataSharing.shareWithProviders ? 'bg-primary-500' : 'bg-gray-300'
              }`} />
            </div>
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Anonymous Data Collection</span>
              <p className="text-sm text-gray-500">Share anonymous data to improve the service</p>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={privacySettings.dataSharing.shareAnonymousData}
                onChange={(e) => setPrivacySettings({
                  ...privacySettings,
                  dataSharing: {
                    ...privacySettings.dataSharing,
                    shareAnonymousData: e.target.checked
                  }
                })}
                className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label className={`switch-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                privacySettings.dataSharing.shareAnonymousData ? 'bg-primary-500' : 'bg-gray-300'
              }`} />
            </div>
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Research Participation</span>
              <p className="text-sm text-gray-500">Allow your data to be used in medical research</p>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={privacySettings.dataSharing.allowResearch}
                onChange={(e) => setPrivacySettings({
                  ...privacySettings,
                  dataSharing: {
                    ...privacySettings.dataSharing,
                    allowResearch: e.target.checked
                  }
                })}
                className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label className={`switch-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                privacySettings.dataSharing.allowResearch ? 'bg-primary-500' : 'bg-gray-300'
              }`} />
            </div>
          </label>
        </div>
      </div>

      {/* Profile Visibility */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Eye className="h-5 w-5 text-gray-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Profile Visibility</h2>
            <p className="text-sm text-gray-600">Control what others can see</p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(privacySettings.visibility).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between">
              <span className="text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setPrivacySettings({
                    ...privacySettings,
                    visibility: {
                      ...privacySettings.visibility,
                      [key]: e.target.checked
                    }
                  })}
                  className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className={`switch-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  value ? 'bg-primary-500' : 'bg-gray-300'
                }`} />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-5 w-5 text-gray-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            <p className="text-sm text-gray-600">Enhance your account security</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Two-Factor Authentication</span>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={privacySettings.security.twoFactorEnabled}
                onChange={(e) => setPrivacySettings({
                  ...privacySettings,
                  security: {
                    ...privacySettings.security,
                    twoFactorEnabled: e.target.checked
                  }
                })}
                className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label className={`switch-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                privacySettings.security.twoFactorEnabled ? 'bg-primary-500' : 'bg-gray-300'
              }`} />
            </div>
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Biometric Login</span>
              <p className="text-sm text-gray-500">Use fingerprint or face recognition</p>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={privacySettings.security.biometricEnabled}
                onChange={(e) => setPrivacySettings({
                  ...privacySettings,
                  security: {
                    ...privacySettings.security,
                    biometricEnabled: e.target.checked
                  }
                })}
                className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label className={`switch-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                privacySettings.security.biometricEnabled ? 'bg-primary-500' : 'bg-gray-300'
              }`} />
            </div>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <select
              value={privacySettings.security.sessionTimeout}
              onChange={(e) => setPrivacySettings({
                ...privacySettings,
                security: {
                  ...privacySettings.security,
                  sessionTimeout: e.target.value
                }
              })}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Plus, X, AlertCircle } from 'lucide-react';
import AddConditionModal from './MedicalSettings/AddConditionModal';
import AddAllergyModal from './MedicalSettings/AddAllergyModal';
import AddMedicationModal from './MedicalSettings/AddMedicationModal';
import AddProviderModal from './MedicalSettings/AddProviderModal';

export default function MedicalSettings() {
  const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);
  const [isAllergyModalOpen, setIsAllergyModalOpen] = useState(false);
  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);

  const [medicalInfo, setMedicalInfo] = useState({
    conditions: [
      'Irritable Bowel Syndrome',
      'Lactose Intolerance'
    ],
    allergies: [
      'Peanuts',
      'Shellfish'
    ],
    medications: [
      { name: 'Probiotic Supplement', dosage: '1 capsule', frequency: 'Daily' },
      { name: 'Vitamin D', dosage: '2000 IU', frequency: 'Daily' }
    ],
    providers: [
      {
        type: 'Gastroenterologist',
        name: 'Dr. Sarah Smith',
        contact: '+1 (555) 987-6543',
        email: 'dr.smith@hospital.com'
      }
    ]
  });

  const handleAddCondition = (condition: string) => {
    setMedicalInfo({
      ...medicalInfo,
      conditions: [...medicalInfo.conditions, condition]
    });
  };

  const handleAddAllergy = (allergy: string) => {
    setMedicalInfo({
      ...medicalInfo,
      allergies: [...medicalInfo.allergies, allergy]
    });
  };

  const handleAddMedication = (medication: { name: string; dosage: string; frequency: string }) => {
    setMedicalInfo({
      ...medicalInfo,
      medications: [...medicalInfo.medications, medication]
    });
  };

  const handleAddProvider = (provider: {
    type: string;
    name: string;
    contact: string;
    email: string;
  }) => {
    setMedicalInfo({
      ...medicalInfo,
      providers: [...medicalInfo.providers, provider]
    });
  };

  const handleRemoveCondition = (index: number) => {
    setMedicalInfo({
      ...medicalInfo,
      conditions: medicalInfo.conditions.filter((_, i) => i !== index)
    });
  };

  const handleRemoveAllergy = (index: number) => {
    setMedicalInfo({
      ...medicalInfo,
      allergies: medicalInfo.allergies.filter((_, i) => i !== index)
    });
  };

  const handleRemoveMedication = (index: number) => {
    setMedicalInfo({
      ...medicalInfo,
      medications: medicalInfo.medications.filter((_, i) => i !== index)
    });
  };

  const handleRemoveProvider = (index: number) => {
    setMedicalInfo({
      ...medicalInfo,
      providers: medicalInfo.providers.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Medical Conditions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Medical Conditions</h2>
            <p className="text-sm text-gray-600">List your diagnosed conditions</p>
          </div>
          <button
            onClick={() => setIsConditionModalOpen(true)}
            className="flex items-center space-x-2 px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Condition</span>
          </button>
        </div>

        <div className="space-y-2">
          {medicalInfo.conditions.map((condition, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-gray-900">{condition}</span>
              <button
                onClick={() => handleRemoveCondition(index)}
                className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Allergies & Intolerances */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Allergies & Intolerances</h2>
            <p className="text-sm text-gray-600">Track your food sensitivities</p>
          </div>
          <button
            onClick={() => setIsAllergyModalOpen(true)}
            className="flex items-center space-x-2 px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Allergy</span>
          </button>
        </div>

        <div className="space-y-2">
          {medicalInfo.allergies.map((allergy, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-700">{allergy}</span>
              </div>
              <button
                onClick={() => handleRemoveAllergy(index)}
                className="p-1 text-red-400 hover:text-red-500 rounded-full hover:bg-red-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Medications */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Medications & Supplements</h2>
            <p className="text-sm text-gray-600">Track your current medications</p>
          </div>
          <button
            onClick={() => setIsMedicationModalOpen(true)}
            className="flex items-center space-x-2 px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Medication</span>
          </button>
        </div>

        <div className="space-y-3">
          {medicalInfo.medications.map((medication, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-medium text-gray-900">{medication.name}</h3>
                <p className="text-sm text-gray-600">
                  {medication.dosage} • {medication.frequency}
                </p>
              </div>
              <button
                onClick={() => handleRemoveMedication(index)}
                className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Healthcare Providers */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Healthcare Providers</h2>
            <p className="text-sm text-gray-600">Manage your medical team</p>
          </div>
          <button
            onClick={() => setIsProviderModalOpen(true)}
            className="flex items-center space-x-2 px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Provider</span>
          </button>
        </div>

        <div className="space-y-4">
          {medicalInfo.providers.map((provider, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{provider.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {provider.type}
                  </span>
                  <button
                    onClick={() => handleRemoveProvider(index)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Phone: {provider.contact}</p>
                <p>Email: {provider.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AddConditionModal
        isOpen={isConditionModalOpen}
        onClose={() => setIsConditionModalOpen(false)}
        onAdd={handleAddCondition}
      />

      <AddAllergyModal
        isOpen={isAllergyModalOpen}
        onClose={() => setIsAllergyModalOpen(false)}
        onAdd={handleAddAllergy}
      />

      <AddMedicationModal
        isOpen={isMedicationModalOpen}
        onClose={() => setIsMedicationModalOpen(false)}
        onAdd={handleAddMedication}
      />

      <AddProviderModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
        onAdd={handleAddProvider}
      />
    </div>
  );
}
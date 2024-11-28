import React, { useState } from 'react';
import QuickLogModal from './QuickLogModal';

export default function QuickLogButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
      >
        + Quick Log
      </button>
      <QuickLogModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
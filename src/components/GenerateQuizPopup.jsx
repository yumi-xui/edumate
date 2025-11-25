import React from 'react';

export default function GenerateQuizPopup({ isOpen, onClose, onConfirm, type }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmer la génération</h3>
        <p className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir générer un {type === 'qcm' ? 'QCM' : 'des flashcards'} avec le contenu actuel ?
        </p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#7A4BC7] text-white rounded-lg font-medium hover:bg-[#6a3fb0] transition-colors"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}

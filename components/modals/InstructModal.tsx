import React from 'react';
import 'tailwindcss/tailwind.css'; // Ensure you have Tailwind CSS installed and configured
import Link from 'next/link';

interface InstructModalProps {
  closeHandler: () => void;
  isOpen: boolean;
}

const InstructModal: React.FC<InstructModalProps> = ({ closeHandler, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full md:w-1/2 p-4 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={closeHandler}
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4 text-black">Instructions</h2>
        <p className='text-black'>
        1. For multiple-choice questions, select the one best answer (A, B, C, or D). <br />
        2. For integer-type questions, write your numerical answer clearly. <br />
        3. No calculators unless specified.<br />
        4. You have 30 minutes to complete this quiz.<br />
        5. Save your answers eitherwise it will not be recorded for evaluation.
        </p>
       <Link href={'/quiz'} className="my-5  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded animate-slide-in animate-pulsate">Start Quiz</Link>
      </div>
    </div>
  );
};

export default InstructModal;

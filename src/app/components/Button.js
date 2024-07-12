"use client";

import { useState } from 'react';
import ContactModal from './ContactModal';

export default function Button() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-violet-600 shadow-solid-s px-8 py-4 text-white font-mono transition duration-300 ease-in-out hover:shadow-solid-l"
      >
        Get in touch
      </button>
      <ContactModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

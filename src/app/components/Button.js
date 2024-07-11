"use client";

import { useState} from 'react';
import ContactModal from './ContactModal';

export default function Button() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal} className="bg-black px-8 py-4 text-white font-mono hover:shadow-2xl">
        Get in touch
      </button>
      <ContactModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  )
}

"use client";

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function Button() {
  const [isHovered, setIsHovered] = useState(false);

  const openLink = () => {
    window.open('https://savvycal.com/khanhumayun/lets-connect', '_blank');
  };

  return (
    <div>
      <button
        onClick={openLink}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-yellow-300 px-8 py-4 font-regular font-mono rounded-xl relative overflow-hidden"
      >
        <div className={`flex items-center justify-center transition-transform duration-300 ${isHovered ? 'translate-x-full opacity-0' : ''}`}>
          <span className="text-black">Book a chat</span>
          <ArrowRightIcon className="w-5 h-5 ml-2 text-black" />
        </div>
        <div className={`flex items-center justify-center absolute top-0 left-0 w-full h-full transition-transform duration-300 ${isHovered ? 'translate-x-0' : '-translate-x-full'}`}>
          <ArrowRightIcon className="w-5 h-5 mr-2 text-black" />
          <span className="text-black">Book a chat</span>
        </div>
      </button>
    </div>
  );
}

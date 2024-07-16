'use client'

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Twitter, Linkedin, GitHub, FileText } from 'react-feather';
import { gsap } from 'gsap';

const navigation = [
  { name: 'Email', href: 'mailto:humayun.n.k@gmail.com', icon: Mail },
  { name: 'Twitter/X', href: 'https://x.com/humayunk_', icon: Twitter },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/khanhumayun/', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com/humayunk', icon: GitHub },
  { name: 'CV', href: 'https://read.cv/humayunk', icon: FileText },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClose = () => {
    setMobileMenuOpen(false);
  };

  const handleEnter = () => {
    gsap.fromTo(
      ".mobile-menu-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }
    );
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl">
        <div className="px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0">
          <nav aria-label="Global" className="flex items-center justify-between lg:justify-start">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 mr-2 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Humayun Khan</span>
                <Image
                  alt="Humayun Khan"
                  src="/images/logo.png"
                  width={48} // Replace with the actual width of your image
                  height={24} // Replace with the actual height of your image
                  className="h-6 w-12"
                />
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <Transition
        show={mobileMenuOpen}
        as={Fragment}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterEnter={handleEnter}
      >
        <Dialog as="div" className="fixed inset-0 z-50" onClose={handleClose}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex flex-row-reverse">
              <button
                type="button"
                onClick={handleClose}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50 flex items-center space-x-2 mobile-menu-item"
                      style={{ opacity: 0 }} // Hide initially
                    >
                      <item.icon size={18} className="text-gray-900 mr-1" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}

'use client'

import { useState, useEffect } from 'react';
import Header from './Header';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import Button from './Button';
import Image from 'next/image';

gsap.registerPlugin(TextPlugin);

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMouseMove = (event) => {
    if (isDesktop) {
      const rect = event.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setMousePosition({ x: -1, y: -1 });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const revealElement = document.getElementById('image-reveal');
    if (revealElement && isDesktop) {
      if (mousePosition.x === -1 && mousePosition.y === -1) {
        revealElement.style.background = 'none';
      } else {
        revealElement.style.background = `
          radial-gradient(
            circle 100px at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 80%,
            rgba(0, 0, 0, 0.5) 100%
          ),
          url('/images/hero-image.jpeg')
        `;
        revealElement.style.backgroundSize = 'cover';
        revealElement.style.backgroundPosition = 'center';
      }
    }
  }, [mousePosition, isDesktop]);

  useEffect(() => {
    const header = document.querySelector('.gsap-header');
    if (header) {
      gsap.fromTo(header,
        { text: "" },
        { duration: 2, text: `Dream <br/> Build <br/> Ship` }
      );
    }
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      <Header />
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-8 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                  {/* <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Anim aute id magna aliqua ad ad non deserunt sunt.{' '}
                    <a href="#" className="whitespace-nowrap font-semibold text-indigo-600">
                      <span aria-hidden="true" className="absolute inset-0" />
                      Read more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div> */}
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl font-mono gsap-header">
                  {/* The text will be animated here */}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-900 font-sans">
                  I&apos;m a Design Engineer who can help you conceptualize and ship your next critical product or growth project end-to-end.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Button />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            alt=""
            src="/images/hero-image.jpeg"
            layout="fill"
            objectFit="cover"
            className="aspect-[3/2] object-cover lg:aspect-auto sm:h-full sm:w-full lg:blur-lg"
          />
          <div id="image-reveal" className="absolute inset-0"></div>
        </div>
      </div>
    </div>
  );
}

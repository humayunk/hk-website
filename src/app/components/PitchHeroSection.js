'use client';

import { useEffect, useRef } from 'react';
import Header from './Header';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import { Draggable } from 'gsap/Draggable';
import Button from './Button';
import Image from 'next/image';

gsap.registerPlugin(TextPlugin, Draggable);

export default function HeroSection({ data }) {
  const svgContainerRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const header = document.querySelector('.gsap-header');
    const tl = gsap.timeline();

    if (header && data) {
      tl.fromTo(header,
        { text: "" },
        { duration: 2, text: `Hey ${data.person},` }
      )
      .fromTo(paragraphRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '+=0.5'
      )
      .fromTo(buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      );
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const elements = [
        { id: 'logo' },
      ];

      const startFloating = (element) => {
        gsap.to(element, {
          y: '+=20',
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      };

      const centerElements = () => {
        const container = svgContainerRef.current;
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const containerCenterX = containerRect.width / 2;
          const containerCenterY = containerRect.height / 2;

          elements.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
              const elementRect = element.getBoundingClientRect();
              const elementWidth = elementRect.width;
              const elementHeight = elementRect.height;

              gsap.set(element, {
                x: containerCenterX - elementWidth / 2,
                y: containerCenterY - elementHeight / 2,
              });

              gsap.fromTo(element,
                { y: -elementHeight, opacity: 0 },
                { y: containerCenterY - elementHeight / 2, opacity: 1, duration: 2, ease: "bounce", onComplete: () => startFloating(element) }
              );
            }
          });
        }
      };

      centerElements();

      const draggableElements = elements.map(e => document.getElementById(e.id)).filter(el => el !== null);

      Draggable.create(draggableElements, {
        bounds: svgContainerRef.current,
        onDragEnd: function() {
          startFloating(this.target);
        },
      });

      window.addEventListener('resize', centerElements);

      return () => window.removeEventListener('resize', centerElements);
    }
  }, [data]);

  return (
    <div className="bg-orange-50 overflow-hidden">
      <Header />
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-8 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-orange-50 lg:block"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl font-mono gsap-header">
                  {/* The text will be animated here */}
                </h1>
                <p ref={paragraphRef} className="mt-6 text-lg leading-8 text-gray-900 font-sans">
                  I hear {data.company} might be looking for a {data.job}, we should talk.
                </p>
                <div ref={buttonRef} className="mt-10 flex items-center gap-x-6">
                  <Button />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-orange-50 relative overflow-hidden w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
          ref={svgContainerRef}
        >
          <div className="absolute inset-0">
            {data && data.logo && (
              <Image
                id="logo"
                src={data.logo}
                alt="Company Logo"
                width={500}
                height={500}
                style={{ objectFit: 'contain' }}
                className="w-48 sm:w-48 md:w-48 lg:w-72 h-auto absolute"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

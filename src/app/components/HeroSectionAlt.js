import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import { Draggable } from 'gsap/Draggable';
import Button from './Button';
import Image from 'next/image';

gsap.registerPlugin(TextPlugin, Draggable);

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const svgContainerRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const header = document.querySelector('.gsap-header');
    const tl = gsap.timeline();

    if (header) {
      tl.fromTo(header,
        { text: "" },
        { duration: 2, text: `Dream <br/> Build <br/> Ship` }
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
  }, []);

  useEffect(() => {
    const elements = [
      { id: 'astronaut' },
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
              y: -elementHeight,
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
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl font-mono gsap-header">
                  {/* The text will be animated here */}
                </h1>
                <p ref={paragraphRef} className="mt-6 text-lg leading-8 text-gray-600 font-sans">
                  I&apos;m a Design Engineer who can help you conceptualize and ship your next critical product or growth project end-to-end.
                </p>
                <div ref={buttonRef} className="mt-10 flex items-center gap-x-6">
                  <Button />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 relative overflow-hidden"
          ref={svgContainerRef}
        >
          <Image
            alt="Space Background"
            src="/images/space-background.jpg"
            layout="fill"
            objectFit="cover"
            className="aspect-[3/2] object-cover lg:aspect-auto sm:h-full sm:w-full"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <Image id="astronaut" src="/images/astronaut-2.png" alt="Astronaut" layout="intrinsic" width={500} height={500} className="floating-svg w-1/2 sm:w-1/6 md:w-1/3 lg:w-1/2 h-auto absolute" />
          </div>
        </div>
      </div>
    </div>
  );
}

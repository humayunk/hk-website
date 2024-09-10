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
  const [shipVisible, setShipVisible] = useState(false);
  const shipRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const header = document.querySelector('.gsap-header');
    const tl = gsap.timeline();

    if (header) {
      header.innerHTML = '';

      const lines = ['Dream', 'Design', 'Develop'];
      lines.forEach((word) => {
        const line = document.createElement('div');
        line.className = 'header-line';

        const wordSpan = document.createElement('span');
        wordSpan.className = 'word-span';
        wordSpan.textContent = word;

        const underscore = document.createElement('span');
        underscore.className = 'underscore';
        underscore.textContent = '_';

        line.appendChild(wordSpan);
        line.appendChild(underscore);
        header.appendChild(line);

        line.addEventListener('mouseenter', () => {
          gsap.to(wordSpan, { x: '0.5em', duration: 0.3 });
          gsap.to(underscore, { opacity: 1, duration: 0.3 });
          gsap.to(underscore, { opacity: 1, duration: 0.5, repeat: -1, yoyo: true });
        });

        line.addEventListener('mouseleave', () => {
          gsap.killTweensOf(underscore);
          gsap.to(wordSpan, { x: 0, duration: 0.3 });
          gsap.to(underscore, { opacity: 0, duration: 0.3 });
        });
      });

      tl.fromTo(header.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
      )
      .fromTo(paragraphRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      )
      .add(() => {
        setShipVisible(true);
      })
      .fromTo(shipRef.current,
        { x: '100%', opacity: 0, scale: 0.8 },
        {
          x: '0%',
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: 'power3.out',
          onStart: () => setShipVisible(true)
        },
        '-=0.5'
      );
    }
  }, []);

  return (
    <div className="bg-black overflow-hidden">
      <Header />
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-8 lg:w-full lg:max-w-2xl">
            <div className="relative px-6 py-8 sm:py-24 lg:px-8 lg:py-24">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-7xl font-mono gsap-header">
                  {/* The text will be animated here */}
                </h1>
                <p ref={paragraphRef} className="mt-12 sm:mt-10 text-xl leading-8 text-white max-w-sm">
                  Hi! I&apos;m Humayun. I&apos;m a product design consultant for startups and Fortune 500 companies, founder of <a href="https://studiomaya.io" target="_blank" rel="noopener noreferrer" className="text-link">StudioMaya</a>, a product studio, and I moonlight as a <a href="https://www.penguinrandomhouse.ca/books/669723/wrong-side-of-the-court-by-hn-khan/9780735270893" target="_blank" rel="noopener noreferrer" className="text-link">novelist</a>.
                </p>
                {/* <div ref={buttonRef} className="mt-4 sm:mt-6 flex items-center gap-x-6">
                  <Button />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="relative overflow-hidden w-full h-[450px] sm:h-[500px] md:h-[550px] lg:h-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
          ref={svgContainerRef}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              ref={shipRef}
              id="cube-video"
              src="/video/cube.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Changed from 'contain' to 'cover' to make it bigger
                opacity: shipVisible ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
              className="w-full h-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full" // Adjusted to make it full width and height at all breakpoints
            />
          </div>
        </div>
      </div>
    </div>
  );
}

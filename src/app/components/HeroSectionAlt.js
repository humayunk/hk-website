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
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const header = document.querySelector('.gsap-header');
    const tl = gsap.timeline();

    if (header) {
      header.innerHTML = '';

      const lines = ['Product', 'Design', '& Code'];
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
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          onStart: () => setIsParagraphVisible(true)
        },
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
      <div className="relative h-screen"> {/* Add fixed height */}
        <div className="absolute inset-0 mx-auto max-w-7xl">
          <div className="relative z-10 pt-8 lg:w-full lg:max-w-2xl h-full flex flex-col justify-center">
            <div className="relative px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-mono gsap-header">
                  {/* The text will be animated here */}
                </h1>
                {isParagraphVisible && (
                  <p ref={paragraphRef} className="mt-12 sm:mt-10 text-lg sm:text-2xl leading-7 sm:leading-8 text-white max-w-sm space-y-4">
                    <span className="block">Hey! I&apos;m Humayun.</span>
                    <span className="block">I&apos;m a product designer with code sense who can double as a PM.</span>
                    <span className="block">I also build <a href="https://studiomaya.io" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:underline">my own products</a>.</span>
                  </p>
                )}
                {/* <div ref={buttonRef} className="mt-4 sm:mt-6 flex items-center gap-x-6">
                  <Button />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-1/2 overflow-hidden"
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

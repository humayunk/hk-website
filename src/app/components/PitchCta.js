'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from './Button';

export default function Example() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    const heading = headingRef.current;
    const text = textRef.current;
    const button = buttonRef.current;

    tl.fromTo(heading,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
    .fromTo(text,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5' // Overlap with the end of the heading animation
    )
    .fromTo(button,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5' // Overlap with the end of the text animation
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tl.play();
            observer.disconnect(); // Stop observing once animation is triggered
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the component is in view
    );

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-orange-50">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 ref={headingRef} className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-mono">
            So, what do you think?
          </h2>
          <p ref={textRef} className="mx-auto my-6 max-w-xl text-lg leading-8 text-gray-900">
            Book a chat and let&apos;s see if we can build something world-class together. Or just have a really awesome conversation.
          </p>
          <div ref={buttonRef}>
            <Button />
          </div>
        </div>
      </div>
    </div>
  );
}

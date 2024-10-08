'use client';

import React, { useEffect, useRef } from 'react';
import { CursorArrowRaysIcon, CodeBracketIcon, RocketLaunchIcon, PaintBrushIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';

const features = [
  {
    name: '0-to-1 Product Thinking',
    description: 'Identifying market opportunities and defining the product vision. Turning abstract ideas into concrete product strategies and roadmaps.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'User-Centered Design',
    description: 'Combining deep expertise in designing intuitive products and interfaces with rigorous user research to ensure every feature and interaction is crafted with the user in mind.',
    icon: PaintBrushIcon,
  },
  {
    name: 'Prototyping in Code',
    description: 'Rapidly creating interactive prototypes using HTML, CSS, JavaScript, and frameworks like Next.js and React. Bringing ideas to life through functional prototypes.',
    icon: CodeBracketIcon,
  },
  {
    name: 'Bridging Design & Engineering',
    description: 'Creating and implementing design systems that seamlessly connect design and engineering. Ensuring consistency, scalability, and efficiency in product development through shared language and components.',
    icon: PuzzlePieceIcon,
  },
];

export default function AboutSection({ mode = 'dark' }) {
  const textRef = useRef(null);
  const featureRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    const container = containerRef.current;

    tl.fromTo(textRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tl.play();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  useEffect(() => {
    const featureObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out'
            });
            featureObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentFeatureRefs = featureRefs.current;

    currentFeatureRefs.forEach((featureElement) => {
      if (featureElement) {
        gsap.set(featureElement, { opacity: 0, y: 20 });
        featureObserver.observe(featureElement);
      }
    });

    return () => {
      currentFeatureRefs.forEach((featureElement) => {
        if (featureElement) {
          featureObserver.unobserve(featureElement);
        }
      });
    };
  }, []);

  const bgColor = mode === 'dark' ? 'bg-black' : 'bg-orange-50';
  const textColor = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const iconBgColor = mode === 'dark' ? 'bg-white' : 'bg-black';
  const iconColor = mode === 'dark' ? 'text-black' : 'text-white';

  return (
    <div ref={containerRef} className={`${bgColor} py-24 sm:py-32`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={textRef} className="mx-auto max-w-2xl lg:text-center">
          <p className={`mt-2 text-3xl font-bold tracking-tight ${textColor} sm:text-4xl font-mono`}>
            What I Do
          </p>
          <p className={`mt-6 text-lg leading-8 ${textColor}`}>
           Firm believer in curiosity killing cats, not humans. I bring deep design expertise coupled with hands on PM and dev experience to the table.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                ref={el => featureRefs.current[index] = el}
                className="relative pl-16"
              >
                <dt className={`text-base font-semibold leading-7 ${textColor} font-mono`}>
                  <div className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center ${iconBgColor} rounded-full transition-colors duration-300 hover:bg-yellow-300`}>
                    <feature.icon aria-hidden="true" className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  {feature.name}
                </dt>
                <dd className={`mt-2 text-base leading-7 ${textColor}`}>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

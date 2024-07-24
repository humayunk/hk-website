'use client';

import React, { useEffect, useRef } from 'react';
import { CursorArrowRaysIcon, CodeBracketIcon, RocketLaunchIcon, PaintBrushIcon, ChartBarIcon } from '@heroicons/react/24/outline';
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
    name: 'Shipping & Growth',
    description: 'Executing the launch strategy and iterating based on user feedback. Employing growth tactics and data-driven insights to scale and improve the product continuously.',
    icon: ChartBarIcon,
  },
];

export default function AboutSection() {
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

  return (
    <div ref={containerRef} className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={textRef} className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-mono">
            What I Do
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Empowering teams with a versatile expert in 0-to-1 product development, blending product management, design, and coding skills to create impactful user-centered experiences.
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
                <dt className="text-base font-semibold leading-7 text-white font-mono">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-white rounded-full">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-black" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

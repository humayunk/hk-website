'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const stats = [
  { label: 'Client Projects', value: '30+' },
  { label: 'Side Projects', value: '5+' },
  { label: 'Countries Visited', value: '12+' },
];

export default function Example() {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 2, ease: 'power3.out' }
          );
          gsap.fromTo(
            textRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 2, delay: 1, ease: 'power3.out' }
          );
          setHasAnimated(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    const imageElement = imageRef.current;
    const textElement = textRef.current;

    if (imageElement) observer.observe(imageElement);
    if (textElement) observer.observe(textElement);

    return () => {
      if (imageElement) observer.unobserve(imageElement);
      if (textElement) observer.unobserve(textElement);
    };
  }, [hasAnimated]);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-[calc(100%-120px)] border-4 border-black shadow-solid-s sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10"
            >
              <img
                alt="Profile"
                src="../images/hero-image.jpeg"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: 'top' }}
              />
            </div>
          </div>
          <div ref={textRef}>
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
              <h1 className=" text-3xl font-mono font-bold tracking-tight text-gray-900 sm:text-4xl">
                Thanks for stopping by.
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  You&apos;re probably wondering, who is this guy? I thought you&apos;d never ask. I&apos;ve been in the tech industry for over a decade but for the last ~4 years, I&apos;ve been primarily consulting and helping clients ranging from international giants like Yara International to YC-backed companies like RuthHealth design better products.
                </p>
                <p className="mt-8">
                  After unsuccesfully trying to teach myself to code, a few months ago I finally rolled up my sleeves and decided to enroll in a nine week full-stack web development bootcamp. It wasn&apos;t easy and it felt like drinking out of a fire hydrant each day but I now have a firm grasp of how web apps and pages are built and structured.
                </p>
                <p className="mt-8">
                As a hybrid Designer &amp; Front-End Developer, I thrive on bringing ideas to life in the browser. I&apos;m energized by the evolving landscape of web development and the opportunity to craft increasingly functional and engaging digital experiences.
                </p>
              </div>
            </div>
            <div className="mt-10 flex">
              {/* Additional content or links can go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
              <h1 className="mt-2 text-3xl font-mono font-bold tracking-tight text-gray-900 sm:text-4xl">
                Thanks for stopping by.
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  You&apos;re probably wondering, who is this guy? I thought you&apos;d never ask. I&apos;ve been in the tech industry for over a decade. For the last ~4 years, I&apos;ve been primarily helping clients ranging from international giants like Yara International to YC-backed companies like RuthHealth build better products.
                </p>
                <p className="mt-8">
                  I&apos;ve been designing interfaces and experiences for a long time, which is why a few months ago I finally rolled up my sleeves and decided to ask, what if I could build them too? In code. Nine weeks and a full-stack web development bootcamp under my belt, here I am.
                </p>
                <p className="mt-8">
                  I&apos;m cognizant that the title Design Engineer is relatively new, but it feels pretty awesome to come up with sketches, mock up something rough in Figma, and start building out components and laying them out in the browser. Excited for the next decade ahead.
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

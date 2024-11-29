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
    <div className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-3xl bg-black px-6 pb-9 pt-[calc(100%-120px)] border-4 border-black shadow-solid-s sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10"
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
            <div className="text-base leading-7 text-white lg:max-w-lg">
              <h1 className=" text-3xl font-mono font-bold tracking-tight text-white sm:text-4xl">
                About Me
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  Hey! I'm Humayun, founder of Studio Maya. With over a decade in tech and 4 years consulting for clients from Yara International to YC startups, we bridge design and development to help founders build products users love. Our approach combines hands-on startup experience with technical excellence to tackle the unique challenges of bringing innovative ideas to life.
                </p>
                <p className="mt-8">
                  As a boutique digital studio, we specialize in bringing innovative product ideas to life through thoughtful design and robust development. We're particularly focused on transformative sectors including EdTech, HealthTech, FinTech, Web3 and AI, where we help ambitious founders build products that matter.
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

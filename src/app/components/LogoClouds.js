'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default function LogoCloud() {
  const headingRef = useRef(null);
  const logoRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const currentContainerRef = containerRef.current;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(headingRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
    .fromTo(logoRefs.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.2 },
      '-=0.5'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tl.play();
            observer.disconnect();

            // Make logos draggable after animation
            logoRefs.current.forEach(logo => {
              Draggable.create(logo, {
                type: 'x,y',
                edgeResistance: 0.65,
                bounds: currentContainerRef,
                inertia: true,
              });
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (currentContainerRef) {
      observer.observe(currentContainerRef);
    }

    return () => {
      if (currentContainerRef) {
        observer.unobserve(currentContainerRef);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 ref={headingRef} className="text-center text-xl font-semibold leading-8 text-white font-mono">
          You&apos;re in good company
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <div
            ref={el => logoRefs.current[0] = el}
            className="col-span-1 w-[158px] h-[48px] cursor-move"
          >
            <Image
              alt="ClassDojo"
              src="/images/classdojo.svg"
              width={158}
              height={48}
              className="max-h-8 w-full object-contain"
            />
          </div>
          <div ref={el => logoRefs.current[1] = el}>
            <Image
              alt="Roadmunk"
              src="/images/roadmunk.svg"
              width={158}
              height={48}
              className="col-span-1 max-h-8 w-full object-contain"
            />
          </div>
          <div ref={el => logoRefs.current[2] = el}>
            <Image
              alt="Shopify"
              src="/images/shopify.png"
              width={158}
              height={48}
              className="col-span-1 max-h-10 w-full object-contain"
            />
          </div>
          <div ref={el => logoRefs.current[3] = el}>
            <Image
              alt="RuthHealth"
              src="/images/ruthhealth.svg"
              width={158}
              height={48}
              className="col-span-1 max-h-10 w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

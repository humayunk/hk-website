'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function LogoCloudAlt() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const logoRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Smoother heading animation
    tl.fromTo(headingRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )

    // Smoother logo animations with better stagger
    .fromTo(logoRefs.current,
      {
        y: 15,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: {
          amount: 0.3,
          from: "start",
          ease: "power2.inOut"
        },
        ease: 'power3.out'
      },
      '-=0.2'
    );

    // Smoother hover animations
    logoRefs.current.forEach(logo => {
      logo.addEventListener('mouseenter', () => {
        gsap.to(logo, {
          scale: 1.02,
          y: -3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 ref={headingRef} className="my-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-mono text-center">
          Brands I&apos;ve Worked With
        </h2>
        <div className="-mx-6 mt-16 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
          {[
            { name: 'ClassDojo', src: '/images/classdojo.svg', maxH: 'max-h-9' },
            { name: 'Shopify', src: '/images/shopify.png', maxH: 'max-h-12' },
            { name: 'Roadmunk', src: '/images/roadmunk.svg', maxH: 'max-h-9' },
            { name: 'RuthHealth', src: '/images/ruthhealth.svg', maxH: 'max-h-12' },
            { name: 'Applied Materials', src: '/images/applied-materials.svg', maxH: 'max-h-12' },
            { name: 'Yara International', src: '/images/yara.svg', maxH: 'max-h-16' },
          ].map((logo, index) => (
            <div
              key={logo.name}
              ref={el => logoRefs.current[index] = el}
              className="bg-gray-950 p-6 sm:p-10 transition-transform duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={158}
                height={48}
                className={`${logo.maxH} w-full object-contain`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

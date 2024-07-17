import React, { useEffect, useRef } from 'react';
import { CursorArrowRaysIcon, BoltIcon, FunnelIcon, CubeIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';

const features = [
  // {
  //   name: 'Product Strategy',
  //   description: 'Define and implement product strategies that align with business goals. Conduct market research, identify user needs, and prioritize features to ensure product success.',
  //   icon: CubeIcon,
  // },
  {
    name: 'Product Design and Prototyping',
    description: 'Transform ideas into high-fidelity prototypes using Figma and other design tools. Develop user-friendly interfaces that drive engagement and meet business goals.',
    icon: BoltIcon,
  },
  {
    name: 'Front-End Development',
    description: 'Build responsive and performant web applications with React, Next.js, and TailwindCSS. Write clean, maintainable code and bring designs to life with precision.',
    icon: CursorArrowRaysIcon,
  },
  // {
  //   name: 'Full-Stack Integration',
  //   description: 'Leverage full-stack development skills to integrate front-end and back-end systems. Utilize Express.js, MongoDB, and Node.js to build robust, scalable applications.',
  //   icon: FunnelIcon,
  // },
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
    <div ref={containerRef} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={textRef} className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-mono">
            What I Do
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Supercharge your growth team with a versatile expert who excels at creating high-quality, user-centered products from concept to production.
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
                <dt className="text-base font-semibold leading-7 text-gray-900 font-mono">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-black rounded-full">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

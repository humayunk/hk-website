'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

const navigation = {
  social: [
    { name: 'Email', href: 'mailto:humayun.n.k@gmail.com' },
    { name: 'X', href: 'https://x.com/humayunk_' },
    { name: 'GitHub', href: 'https://github.com/humayunk' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/khanhumayun/' },
  ],
};

export default function Footer() {
  const containerRef = useRef(null);
  const socialLinksRef = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    const text = textRef.current;
    const socialLinks = socialLinksRef.current;

    tl.fromTo(text,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
    .fromTo(socialLinks,
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
          }
        });
      },
      { threshold: 0.5 }
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
    <footer ref={containerRef} className="bg-black py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={textRef} className="flex flex-col items-center">
          <div className="flex space-x-6">
            {navigation.social.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-300 flex items-center space-x-1 transition-colors duration-300"
                ref={el => socialLinksRef.current[index] = el}
              >
                <span className="text-sm font-medium">{item.name}</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-white">
          Made with ❤️ by Humayun Khan
        </p>
      </div>
    </footer>
  );
}

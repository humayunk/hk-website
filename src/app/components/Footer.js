'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const navigation = {
  main: [
    // { name: 'About', href: '#' },
    // { name: 'Blog', href: '#' },
    // { name: 'Jobs', href: '#' },
    // { name: 'Press', href: '#' },
    // { name: 'Accessibility', href: '#' },
    // { name: 'Partners', href: '#' },
  ],
  social: [
    {
      name: 'Email',
      href: 'mailto:humayun.n.k@gmail.com',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      ),
    },
    {
      name: 'X',
      href: 'https://x.com/humayunk_',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/khanhumayun/',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/humayunk',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'CV',
      href: 'https://read.cv/humayunk',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M14.25 2.5H5.25C4.00736 2.5 3 3.50736 3 4.75V19.25C3 20.4926 4.00736 21.5 5.25 21.5H18.75C19.9926 21.5 21 20.4926 21 19.25V9.25L14.25 2.5ZM14.25 4.25L19.25 9.25H15C14.5858 9.25 14.25 8.91421 14.25 8.5V4.25ZM7.5 11.75C7.5 11.3358 7.83579 11 8.25 11H11.25C11.6642 11 12 11.3358 12 11.75C12 12.1642 11.6642 12.5 11.25 12.5H8.25C7.83579 12.5 7.5 12.1642 7.5 11.75ZM7.5 15.25C7.5 14.8358 7.83579 14.5 8.25 14.5H15.75C16.1642 14.5 16.5 14.8358 16.5 15.25C16.5 15.6642 16.1642 16 15.75 16H8.25C7.83579 16 7.5 15.6642 7.5 15.25ZM7.5 18.75C7.5 18.3358 7.83579 18 8.25 18H15.75C16.1642 18 16.5 18.3358 16.5 18.75C16.5 19.1642 16.1642 19.5 15.75 19.5H8.25C7.83579 19.5 7.5 19.1642 7.5 18.75Z" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  const containerRef = useRef(null);
  const socialLinksRef = useRef([]);
  const textRef = useRef(null);
// eslint-disable-next-line react-hooks/exhaustive-deps
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
    <footer ref={containerRef} className="bg-black">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div ref={textRef}>
          <nav aria-label="Footer" className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12">
            {navigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <a href={item.href} className="text-sm leading-6 text-gray-900 hover:text-gray-900">
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
              ref={el => socialLinksRef.current[index] = el}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="h-6 w-6" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-white">
          Made with ❤️ by Humayun Khan
        </p>
      </div>
    </footer>
  );
}

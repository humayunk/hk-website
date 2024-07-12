"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function CaseStudyHeroSection({ title, description, image, video, tags }) {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVideoVisible(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );

      if (videoRef.current) {
        observer.observe(videoRef.current);
      }
    } else {
      // Fallback for older browsers
      setIsVideoVisible(true);
    }
  }, []);

  return (
    <div className="bg-white">
      <div className="relative isolate pt-14">
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-mono">
                {title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {description}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {tags.map(tag => (
                  <span key={tag} className="bg-black text-white px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2" ref={videoRef}>
                {isVideoVisible && video ? (
                  <video
                    loop
                    autoPlay
                    muted
                    controls
                    className="shadow-2xl ring-1 ring-gray-900/10 w-full"
                  >
                    <source src={video} type="video/mp4" />
                    <source src={video.replace('.mp4', '.webm')} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    alt="App screenshot"
                    src={image}
                    className="shadow-2xl ring-1 ring-gray-900/10"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Optional decorative div */}
      </div>
    </div>
  );
}

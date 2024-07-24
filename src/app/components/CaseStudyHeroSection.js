"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function CaseStudyHeroSection({ title, description, image, video, tags }) {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const tagsRef = useRef(null);

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

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
    .fromTo(descriptionRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(tagsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    );
  }, []);

  const formattedImage = image && typeof image === 'string' && image.startsWith('//') ? `https:${image}` : image;

  return (
    <div className="bg-orange-50">
      <div className="relative isolate pt-14">
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h1 ref={titleRef} className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-mono">
                {title}
              </h1>
              <p ref={descriptionRef} className="mt-6 text-lg leading-8 text-gray-900">
                {description}
              </p>
              <div ref={tagsRef} className="mt-10 flex items-center justify-center gap-x-6">
                {tags.map(tag => (
                  <span key={tag} className="bg-black text-white px-3 py-1 rounded-lg font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="rounded-lg border-4 border-black shadow-solid-s overflow-hidden" ref={videoRef}>
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
                    formattedImage && (
                      <Image
                        alt="App screenshot"
                        src={formattedImage}
                        className="shadow-2xl ring-1 ring-gray-900/10 w-full h-full object-cover"
                        layout="responsive"
                        width={700}
                        height={475}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Optional decorative div */}
      </div>
    </div>
  );
}

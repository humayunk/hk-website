"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { fetchPitchData } from '../lib/contentful'; // Adjust the path

export default function PitchVideo({ slug }) {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const pitchData = await fetchPitchData(slug);
      console.log('Pitch Data:', pitchData); // Debug log
      if (pitchData && pitchData.video) {
        const video = pitchData.video.startsWith('//') ? `https:${pitchData.video}` : pitchData.video;
        console.log('Video URL:', video); // Debug log
        setVideoUrl(video);
      }
    };
    fetchData();
  }, [slug]);

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
    );
  }, []);

  return (
    <div className="bg-white">
      <div className="relative isolate pt-14">
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 ref={titleRef} className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl font-mono">
                Why me?
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Designer. Developer. Shipper.
              </p>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2" ref={videoRef}>
                {isVideoVisible && videoUrl && (
                  <video
                    loop
                    autoPlay
                    muted
                    controls
                    className="shadow-2xl ring-1 ring-gray-900/10 w-full rounded-xl"
                  >
                    <source src={videoUrl} type="video/mp4" />
                    <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
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

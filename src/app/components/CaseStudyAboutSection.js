'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Square3Stack3DIcon, HeartIcon, UserIcon, MapIcon } from '@heroicons/react/24/outline';
import { fetchProjectData } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import gsap from 'gsap';

const features = [
  { name: 'Overview', icon: MapIcon },
  { name: 'Role', icon: UserIcon },
  { name: 'Tools', icon: Square3Stack3DIcon },
  { name: 'Results', icon: HeartIcon },
];

export default function CaseStudyAboutSection({ title, slug }) {
  const [projectData, setProjectData] = useState(null);
  const titleRef = useRef(null);
  const featureRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("Fetching data for slug:", slug); // Debugging: Log the current slug
    const getData = async () => {
      const data = await fetchProjectData(slug);
      console.log("Fetched data:", data); // Debugging: Log the fetched data
      setProjectData(data);
    };

    getData();
  }, [slug]);

  useEffect(() => {
    if (titleRef.current && featureRefs.current.length) {
      const tl = gsap.timeline({ paused: true });

      console.log('titleRef.current:', titleRef.current); // Debugging: Log titleRef
      console.log('featureRefs.current:', featureRefs.current); // Debugging: Log featureRefs

      tl.fromTo(titleRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out' }
      )
      .fromTo(featureRefs.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out', stagger: 0.3 },
        '-=1'
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              console.log("IntersectionObserver triggered"); // Debugging: Log when the observer triggers
              tl.play();
              observer.disconnect(); // Stop observing once animation is triggered
            }
          });
        },
        { threshold: 0.5 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }
  }, [titleRef.current, featureRefs.current.length]); // Add dependencies to ensure useEffect runs after refs are set

  if (!projectData) {
    return <div>Loading...</div>;
  }

  const renderFeatureContent = (feature) => {
    const featureData = projectData[feature.name.toLowerCase()];
    if (!featureData) {
      return <div>No data available</div>;
    }

    if (feature.name === 'Tools' && Array.isArray(featureData)) {
      return featureData.map((tool, index) => (
        <div key={index}>{tool}</div>
      ));
    }

    if (typeof featureData === 'string') {
      return <p>{featureData}</p>;
    }

    try {
      return documentToReactComponents(featureData);
    } catch (error) {
      console.error('Error rendering feature content:', error);
      return <div>Failed to render content</div>;
    }
  };

  return (
    <div ref={containerRef} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 ref={titleRef} className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-mono">
            About {title}
          </h2>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div key={feature.name} ref={el => featureRefs.current[index] = el}>
                <dt className="text-base font-semibold leading-7 text-gray-900 font-mono">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center bg-black">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-600">
                  {renderFeatureContent(feature)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

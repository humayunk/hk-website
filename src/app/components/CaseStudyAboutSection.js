'use client'
import React, { useEffect, useRef, useState } from 'react';
import { fetchProjectData } from '../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const features = [
  { name: 'Overview' },
  { name: 'Role' },
  { name: 'Tools' },
  { name: 'Process' },
  { name: 'Results' },
];

export default function CaseStudyAboutSection({ title, slug }) {
  const [projectData, setProjectData] = useState(null);
  const titleRef = useRef(null);
  const featureRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchProjectData(slug);
      console.log('Fetched project data:', data); // Log fetched data
      setProjectData(data);
    };

    getData();
  }, [slug]);

  useEffect(() => {
    if (!projectData) return;

    // Temporarily disable animation for debugging
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log('Element is intersecting:', entry.target);
            observer.disconnect();
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
  }, [projectData]);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  const renderFeatureContent = (feature) => {
    const featureData = projectData[feature.name.toLowerCase()];
    console.log(`Rendering content for feature: ${feature.name}`, featureData); // Added logging

    if (!featureData) {
      return <div>No data available</div>;
    }

    if (feature.name === 'Role' && Array.isArray(featureData)) {
      return featureData.map((role, index) => (
        <div key={index}>{role}</div>
      ));
    }

    if (feature.name === 'Tools' && Array.isArray(featureData)) {
      return featureData.map((tool, index) => (
        <div key={index}>{tool}</div>
      ));
    }

    if (typeof featureData === 'string') {
      // Split the string by double line breaks to create paragraphs
      const paragraphs = featureData.split('\n\n').map((para, index) => (
        <p key={index} className="mb-4">{para}</p>
      ));
      return paragraphs;
    }

    try {
      if (featureData && featureData.nodeType === 'document') {
        return documentToReactComponents(featureData);
      } else {
        return <div>Invalid content format</div>;
      }
    } catch (error) {
      console.error('Error rendering feature content:', error);
      return <div>Failed to render content</div>;
    }
  };

  return (
    <div ref={containerRef} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 ref={titleRef} className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-mono">
          About {title}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-y-20 lg:grid-cols-3">
          <div className="lg:col-span-1 lg:col-start-1 lg:row-start-1">
            {projectData.url && (
              <div className="mb-8">
                <dt className="text-xl font-semibold leading-7 text-gray-900 font-mono">
                  Website
                </dt>
                <dd className="mt-1 text-lg leading-7 text-gray-600">
                  <a href={projectData.url} className="text-gray-900 hover:text-violet-600 underline" target="_blank" rel="noopener noreferrer">
                    {projectData.url}
                  </a>
                </dd>
              </div>
            )}
            {features.filter(f => f.name === 'Role' || f.name === 'Tools').map((feature, index) => (
              <div key={feature.name} ref={el => featureRefs.current[index] = el} className="mb-8">
                <dt className="text-xl font-semibold leading-7 text-gray-900 font-mono">
                  {feature.name}
                </dt>
                <dd className="mt-1 text-lg leading-7 text-gray-600">
                  {renderFeatureContent(feature)}
                </dd>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 lg:col-start-2 lg:row-start-1">
            {features.filter(f => f.name === 'Overview' || f.name === 'Process' || f.name === 'Results').map((feature, index) => (
              <div key={feature.name} ref={el => featureRefs.current[index + 2] = el} className="mb-8">
                <dt className="text-xl font-semibold leading-7 text-gray-900 font-mono pb-2">
                  {feature.name}
                </dt>
                <dd className="mt-1 text-lg leading-7 text-gray-600">
                  {renderFeatureContent(feature)}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

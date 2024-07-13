import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import { fetchEntries } from '../lib/contentful';
import gsap from 'gsap';

export default function WorkSection() {
  const [projects, setProjects] = useState([]);
  const textRef = useRef(null);
  const cardRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    async function getProjects() {
      try {
        const entries = await fetchEntries('project'); // 'project' is the content type ID
        setProjects(entries.map(entry => entry.fields));
      } catch (error) {
        console.error('Error fetching projects data:', error);
      }
    }

    getProjects();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.fromTo(textRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out'
            });
            cardObserver.unobserve(entry.target); // Stop observing once animation is triggered
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the card is in view
    );

    cardRefs.current.forEach(card => {
      if (card) {
        gsap.set(card, { opacity: 0, y: 20 });
        cardObserver.observe(card);
      }
    });

    return () => {
      cardRefs.current.forEach(card => {
        if (card) {
          cardObserver.unobserve(card);
        }
      });
    };
  }, [projects]);

  return (
    <div ref={containerRef} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={textRef} className="mx-auto max-w-2xl lg:text-center pb-16">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-mono">
            The Proof is in the Pudding
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whatever that means. Here's some projects. I collaborate with companies of all sizes. Sometimes I ship my own ideas too. Mostly, I like building s@*!.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image ? project.image.fields.file.url : ''}
              video={project.video ? project.video.fields.file.url : null}
              tags={project.tags || []}
              slug={project.slug}
              ref={el => cardRefs.current[index] = el}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

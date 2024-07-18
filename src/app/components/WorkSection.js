'use client';
import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { fetchEntries } from '../lib/contentful';

export default function WorkSection() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProjects() {
      try {
        const entries = await fetchEntries('project');
        setProjects(
          entries.map(entry => {
            const project = entry.fields;
            // Ensure the image URL is absolute
            if (project.image && project.image.fields.file.url.startsWith('//')) {
              project.image.fields.file.url = `https:${project.image.fields.file.url}`;
            }
            // Ensure the video URL is absolute
            if (project.video && project.video.fields.file.url.startsWith('//')) {
              project.video.fields.file.url = `https:${project.video.fields.file.url}`;
            }
            return project;
          })
        );
      } catch (error) {
        console.error('Error fetching projects data:', error);
        setError('Failed to load projects.');
      }
    }

    getProjects();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center pb-16">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-mono">
            Selected Work
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
           A selection of past project work and personal side projects that I can talk about. Unfortunately, in some cases, the content must be redacted due to its sensitive nature. But happy to share specifics where desired.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image ? project.image.fields.file.url : ''}
              video={project.video ? project.video.fields.file.url : null}
              tags={project.tags || []}
              slug={project.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

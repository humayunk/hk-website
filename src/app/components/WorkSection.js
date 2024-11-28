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
        console.log('Fetching projects...');
        const entries = await fetchEntries('project');
        console.log('Fetched entries:', entries);

        const processedProjects = entries.map(entry => {
          const project = entry.fields;
          console.log('Processing project:', project);

          // Ensure the image URL is absolute
          if (project.image && project.image.fields && project.image.fields.file && project.image.fields.file.url.startsWith('//')) {
            project.image.fields.file.url = `https:${project.image.fields.file.url}`;
          }
          // Ensure the cardImage URL is absolute
          if (project.cardImage && project.cardImage.fields && project.cardImage.fields.file && project.cardImage.fields.file.url.startsWith('//')) {
            project.cardImage.fields.file.url = `https:${project.cardImage.fields.file.url}`;
          }
          // Ensure the video URL is absolute
          if (project.video && project.video.fields && project.video.fields.file && project.video.fields.file.url.startsWith('//')) {
            project.video.fields.file.url = `https:${project.video.fields.file.url}`;
          }

          console.log('Processed project:', project);
          return project;
        });

        console.log('Setting projects:', processedProjects);
        setProjects(processedProjects);
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
    <div className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center pb-16">
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-mono">
            Selected Work
          </p>
          <p className="mt-6 text-lg leading-8 text-white">
            Here are a few personal and professional projects I can publically talk about.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              cardImage={project.cardImage && project.cardImage.fields ? project.cardImage.fields.file.url : null}
              video={project.video ? project.video.fields.file.url : null}
              image={project.image ? project.image.fields.file.url : null}
              tags={project.tags || []}
              slug={project.slug}
              url={project.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

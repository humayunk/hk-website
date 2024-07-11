import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { fetchEntries } from '../lib/contentful';

export default function WorkSection() {
  const [projects, setProjects] = useState([]);

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

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center pb-16">
          {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2> */}
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-mono">
            The Proof is in the Pudding
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whatever that means. Here's some projects. I collaborate with companies of all sizes. Sometimes I ship my own ideas too. Mostly, I like building s@*!.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image ? project.image.fields.file.url : ''}
              tags={project.tags || []}
              slug={project.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

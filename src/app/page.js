'use client';

import { useEffect, useState } from 'react';
import HeroSectionAlt from './components/HeroSectionAlt';
import LogoClouds from './components/LogoClouds';
import WorkSection from './components/WorkSection';
import BioSection from './components/BioSection';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Cta from './components/Cta';
import Footer from './components/Footer';
import { fetchEntries } from './lib/contentful';
import AboutSection from './components/AboutSection';

const BlogCards = dynamic(() => import('./components/BlogCards'), { ssr: false });

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const fetchedProjects = await fetchEntries('project');
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    loadProjects();
  }, []);

  return (
    <>
      <HeroSectionAlt />
      <LogoClouds />
      <WorkSection projects={projects} />
      <AboutSection />
      <Suspense fallback={<div>Loading blog posts...</div>}>
        <BlogCards />
      </Suspense>
      <BioSection />
      <Cta />
      <Footer />
    </>
  );
}

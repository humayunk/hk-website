// src/app/page.js

'use client';

import { useEffect, useState } from 'react';
import ProjectCard from './components/ProjectCard';
import HeroSection from './components/HeroSection';
import LogoClouds from './components/LogoClouds';
import FeatureSection from './components/FeatureSection';
import WorkSection from './components/WorkSection';
import Footer from './components/Footer';
import Cta from './components/Cta';

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects data:', error));
  }, []);

  return (
    <>
      <HeroSection />
      <LogoClouds />
      <FeatureSection />
      <WorkSection projects={projects} />
      <Cta />
      <Footer />
    </>
  );
}

import { notFound } from 'next/navigation';
import { fetchEntries } from '../../lib/contentful'; // Ensure the path to contentful.js is correct
import CaseStudyHeroSection from '@/app/components/CaseStudyHeroSection';
import CaseStudyAboutSection from '@/app/components/CaseStudyAboutSection';
import Testamonial from '@/app/components/Testamonial';
import Cta from '@/app/components/Cta';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Carousel from '@/app/components/Carousel';

export async function generateStaticParams() {
  const entries = await fetchEntries('project');
  return entries.map(entry => ({
    slug: entry.fields.slug
  }));
}

export async function generateMetadata({ params }) {
  const entries = await fetchEntries('project');
  const project = entries.find(entry => entry.fields.slug === params.slug);

  if (!project) {
    notFound();
  }

  return {
    title: project.fields.title,
    description: project.fields.description,
  };
}

export default async function ProjectPage({ params }) {
  const entries = await fetchEntries('project');
  const project = entries.find(entry => entry.fields.slug === params.slug);

  if (!project) {
    notFound();
  }

  const { title, description, image, tags } = project.fields;
  const { slug } = params; // Get the slug from params

  return (
    <div>
      <Header />
      <CaseStudyHeroSection
        title={title}
        description={description}
        image={image.fields.file.url}
        tags={tags} />
      <CaseStudyAboutSection
        title={title}
      />
      <Carousel slug={slug} /> {/* Pass the slug to Carousel */}
      {/* <Testamonial /> */}
      <Cta />
      <Footer />
    </div>
  );
}

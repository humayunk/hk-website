import { notFound } from 'next/navigation';
import { fetchEntries, fetchProjectData } from '../../lib/contentful'; // Ensure the path to contentful.js is correct
import CaseStudyHeroSection from '@/app/components/CaseStudyHeroSection';
import CaseStudyAboutSection from '@/app/components/CaseStudyAboutSection';
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
  const project = await fetchProjectData(params.slug);

  if (!project) {
    notFound();
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const project = await fetchProjectData(params.slug);

  if (!project) {
    notFound();
  }

  const { title, description, image, tags, video, carouselImages } = project;

  console.log('Project Data:', project); // Debugging line
  console.log('Slug from Params:', params.slug); // Debugging line

  return (
    <div>
      <Header />
      <CaseStudyHeroSection
        title={title}
        description={description}
        image={image}
        video={video}
        tags={tags} />
      <CaseStudyAboutSection
        key={params.slug}
        title={title}
        slug={params.slug} // Pass the slug from params
      />
      {/* {carouselImages && carouselImages.length > 0 && (
        <Carousel slug={params.slug} images={carouselImages} /> // Pass the slug and images to Carousel
      )} */}
      <Cta />
      <Footer />
    </div>
  );
}

import { notFound } from 'next/navigation';
import { fetchEntries, fetchPitchData } from '../../lib/contentful'; // Adjust the path
import PitchHeroSection from '@/app/components/PitchHeroSection';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import LogoCloud from '@/app/components/LogoClouds';
import PitchVideo from '@/app/components/PitchVideo';
import PitchCta from '@/app/components/PitchCta';
import WorkSection from '@/app/components/WorkSection';
import BioSection from '@/app/components/BioSection';

export async function generateStaticParams() {
  const entries = await fetchEntries('pitch');
  return entries.map(entry => ({
    slug: entry.fields.slug
  }));
}

export async function generateMetadata({ params }) {
  const entry = await fetchPitchData(params.slug);

  if (!entry) {
    notFound();
  }

  return {
    title: entry.company,
    description: `Details about ${entry.company}`,
  };
}

export default async function PitchPage({ params }) {
  const entry = await fetchPitchData(params.slug);

  if (!entry) {
    notFound();
  }

  return (
    <div>
      <Header />
      <PitchHeroSection data={entry} />
      <LogoCloud />
      <PitchVideo slug={params.slug} />
      <WorkSection />
      <BioSection />
      <PitchCta />
      <Footer />
    </div>
  );
}

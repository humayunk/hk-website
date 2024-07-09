import { notFound } from 'next/navigation';
import { fetchEntries } from '../../lib/contentful'; // Ensure the path to contentful.js is correct

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

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-8">{description}</p>
      {image && <img src={image.fields.file.url} alt={title} className="w-full h-auto mb-8" />}
      <div className="flex space-x-2">
        {tags.map(tag => (
          <span key={tag} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

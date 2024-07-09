import Link from 'next/link';

export default function ProjectCard({ title, description, image, tags, slug }) {
  return (
    <Link href={`/projects/${slug}`}>
      <div className="block bg-gray-800 text-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
        <div className="p-4">
          <div className="flex space-x-2 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="bg-gray-700 text-xs font-semibold px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  );
}

import Link from 'next/link';

export default function ProjectCard({ title, description, image, tags, slug }) {
  return (
    <Link href={`/projects/${slug}`}>
      <div className="block bg-white text-white shadow-md overflow-hidden border-4 border-black  transition-shadow duration-300 ease-in-out hover:shadow-solid-s">
        {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
        <div className="p-4 border-t-4 border-black">
          <div className="flex space-x-2 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="bg-black text-xs font-semibold px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold text-black">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}

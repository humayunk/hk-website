import Link from 'next/link';

export default function ProjectCard({ title, description, image, tags, slug }) {
  return (
    <Link href={`/projects/${slug}`}>
      <div className="block bg-white text-white shadow-md overflow-hidden border-4 border-black  hover:shadow-lg transition-shadow duration-300">
        {/* {image && <img src={image} alt={title} className="w-full h-64 object-cover" />} */}
        <div className="p-4">
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

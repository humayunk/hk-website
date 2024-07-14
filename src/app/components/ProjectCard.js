import Link from 'next/link';
import { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function ProjectCard({ title, description, image, tags, slug }) {
  const [isHovered, setIsHovered] = useState(false);

  console.log('Image URL in ProjectCard:', image); // Add this line for logging

  return (
    <Link href={`/projects/${slug}`}>
      <div
        className="relative block bg-white text-white shadow-md overflow-hidden border-4 border-black transition-shadow duration-300 ease-in-out hover:shadow-solid-s"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {image && (
          <div className="relative w-full h-full">
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
            {isHovered && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out">
                <EyeIcon className="h-1/6 w-1/6 mb-2" />
                <p className="text-white text-lg font-mono">Read more</p>
              </div>
            )}
          </div>
        )}
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

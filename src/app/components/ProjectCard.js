import Link from 'next/link';
import { useState, useEffect } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function ProjectCard({ title, description, cardImage, video, videoPoster, tags, slug }) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log(`Title: ${title}`);
    console.log(`Video:`, video);
  }, [video, title]);

  return (
    <Link href={`/projects/${slug}`}>
      <div
        className="relative block text-white shadow-md overflow-hidden border-4 border-gray-900 transition-shadow duration-300 ease-in-out hover:shadow-solid-s rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ backgroundColor: '#DAC8FF' }}
      >
        <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {video ? (
              <video
                src={video.startsWith('//') ? `https:${video}` : video}
                poster={videoPoster ? (videoPoster.startsWith('//') ? `https:${videoPoster}` : videoPoster) : undefined}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
                playsInline
                preload="auto"
                onCanPlay={(e) => {
                  e.target.play().catch(error => console.log("Autoplay was prevented"));
                }}
              />
            ) : cardImage && typeof cardImage === 'string' ? (
              <Image
                src={cardImage.startsWith('//') ? `https:${cardImage}` : cardImage}
                alt={title}
                layout="fill"
                objectFit="contain"
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200">
                <span>No Image or Video Available</span>
              </div>
            )}
          </div>
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out">
              <EyeIcon className="h-1/6 w-1/6 mb-2" />
              <p className="text-white text-lg font-mono">View Project</p>
            </div>
          )}
        </div>
        <div className="p-4 border-t-4 border-black bg-gray-950">
          <div className="flex flex-wrap space-x-2 mb-2 ">
            {tags.map((tag) => (
              <span key={tag} className="bg-yellow-300 text-xs text-black font-semibold px-2 py-1 rounded-lg font-mono">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold text-white font-mono">{title}</h3>
          <p className="text-white font-sans py-2">{description}</p>
        </div>
      </div>
    </Link>
  );
}

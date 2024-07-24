import Image from 'next/image';
import Link from 'next/link';
import { BoltIcon } from '@heroicons/react/24/solid';

const ensureAbsoluteUrl = (url) => {
  return url && url.startsWith('//') ? `https:${url}` : url;
};

export default function BlogList({ posts }) {
  return (
    <div className="bg-orange-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tinkering & Thoughts</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Explore my collection of guides, demonstrations, and occasional insights that emerge as I delve into the art of crafting better products.
          </p>
          <div className="relative mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 sm:mt-16 lg:mx-0 lg:max-w-none">
            <div className="absolute left-0 top-4 bottom-4 w-1 bg-orange-200">
              <div className="h-full border-r-2 border-dotted border-black"></div>
            </div>
            {posts.map((post, index) => (
              <div key={post.slug} className="relative">
                <div className="absolute left-0 top-0 transform -translate-x-1/2 w-8 h-8 bg-black rounded-full flex items-center justify-center z-10">
                  <BoltIcon className="h-4 w-4 text-white" />
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <div className="ml-16 blog-card flex shadow-md overflow-hidden border-4 border-black transition-shadow duration-300 ease-in-out hover:shadow-solid-s rounded-2xl" style={{ backgroundColor: '#DAC8FF' }}>
                    {post.featuredImage && (
                      <div className="w-1/3 relative">
                        <Image
                          src={ensureAbsoluteUrl(post.featuredImage)}
                          alt={post.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                    <div className="w-2/3 p-4 bg-white">
                      <div className="flex flex-wrap space-x-2 mb-2">
                        {post.tags && post.tags.length > 0 && (
                          <span className="bg-black text-white text-xs font-semibold px-2 py-1 rounded-lg">
                            {post.tags[0]}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-black">{post.title}</h3>
                      <p className="text-gray-600 line-clamp-3">{post.blurb}</p>
                      <div className="mt-4 flex items-center gap-x-4">
                        {post.authorImage && (
                          <Image
                            src={ensureAbsoluteUrl(post.authorImage)}
                            alt={post.author}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full bg-gray-50"
                          />
                        )}
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900">{post.author}</p>
                          <time dateTime={post.publishDate} className="text-gray-500">
                            {new Date(post.publishDate).toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

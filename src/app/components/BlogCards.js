'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchBlogPosts } from '../lib/contentful';

export default function BlogCards() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        console.log('Fetching blog posts...');
        const fetchedPosts = await fetchBlogPosts();
        console.log('Fetched posts:', fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError('Failed to load blog posts.');
      }
    }

    loadPosts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <article
            key={post.slug}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
          >
            {post.featuredImage && (
              <Image
                src={post.featuredImage}
                alt={post.title}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
                width={400}
                height={300}
              />
            )}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              <time dateTime={post.publishDate} className="mr-8">
                {new Date(post.publishDate).toLocaleDateString()}
              </time>
              <div className="-ml-4 flex items-center gap-x-4">
                <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="flex gap-x-2.5">
                  {post.author}
                </div>
              </div>
            </div>
            <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
              <Link href={`/blog/${post.slug}`}>
                <span className="absolute inset-0" />
                {post.title}
              </Link>
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchBlogPosts } from '../lib/contentful';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function BlogCards() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    async function loadPosts() {
      try {
        const fetchedPosts = await fetchBlogPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError('Failed to load blog posts.');
      }
    }

    loadPosts();

    // Animation setup
    const container = containerRef.current;
    gsap.fromTo(
      container.querySelector('h2'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: container, start: 'top 80%' } }
    );
    gsap.fromTo(
      container.querySelector('p'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, scrollTrigger: { trigger: container, start: 'top 80%' } }
    );
    gsap.fromTo(
      container.querySelectorAll('.blog-card'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: container, start: 'top 60%' } }
    );
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-orange-50 py-24 sm:py-32" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-mono tracking-tight">Tinkering & Thoughts</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 mx-auto max-w-2xl">
            Explore my collection of guides, demonstrations, and occasional insights that emerge as I delve into the art of crafting better products.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {posts.slice(0, 2).map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <div className="blog-card relative flex shadow-md overflow-hidden border-4 border-black transition-shadow duration-300 ease-in-out hover:shadow-solid-s rounded-2xl" style={{ backgroundColor: '#DAC8FF' }}>
                {post.featuredImage && (
                  <div className="w-1/3 relative">
                    <Image
                      src={post.featuredImage}
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
                        src={post.authorImage}
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
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/blog" className="view-all-link px-8 py-4 text-black font-mono text-xl flex items-center" style={{ textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '4px' }}>
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}

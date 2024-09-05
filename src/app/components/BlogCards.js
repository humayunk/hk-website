'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
        // Sort posts by publishDate in descending order (most recent first)
        const sortedPosts = fetchedPosts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        setPosts(sortedPosts);
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
    <div className="bg-black py-24 sm:py-32" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl font-mono tracking-tight">Tinkering & Thoughts</h2>
          <p className="mt-2 text-lg leading-8 text-white mx-auto max-w-2xl">
            Experiments, essays, and a random assortment of insights.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <div className="blog-card relative flex flex-col shadow-md overflow-hidden border-4 border-black transition-shadow duration-300 ease-in-out hover:shadow-solid-s rounded-2xl h-[225px]" style={{ backgroundColor: '#DAC8FF' }}>
                <div className="p-4 bg-slate-950 border border-4 border-slate-900 flex-grow flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-wrap space-x-2 mb-2">
                      {post.tags && post.tags.length > 0 && (
                        <span className="bg-yellow-300 text-black text-xs font-semibold px-2 py-1 rounded-lg">
                          {post.tags[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mt-2">{post.title}</h3>
                    <p className="text-white line-clamp-3 mt-1">{post.blurb}</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">{post.author}</p>
                      <time dateTime={post.publishDate} className="text-white">
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
          <Link href="/blog" className="view-all-link px-8 py-4 text-yellow-300 font-mono text-xl flex items-center" style={{ textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '4px' }}>
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}

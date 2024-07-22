import Link from 'next/link';
import Image from 'next/image';

export default function BlogList({ posts }) {
  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.slug} className="flex max-w-xl flex-col items-start justify-between">
          <div className="flex items-center gap-x-4 text-xs">
            <time dateTime={post.publishDate} className="text-gray-500">
              {new Date(post.publishDate).toLocaleDateString()}
            </time>
            {post.tags.map((tag) => (
              <span key={tag} className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                {tag}
              </span>
            ))}
          </div>
          <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <Link href={`/blog/${post.slug}`}>
                <span className="absolute inset-0" />
                {post.title}
              </Link>
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
          </div>
          <div className="relative mt-8 flex items-center gap-x-4">
            {post.featuredImage && (
              <Image
                src={post.featuredImage}
                alt=""
                className="h-10 w-10 rounded-full bg-gray-50"
                width={40}
                height={40}
              />
            )}
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <span className="absolute inset-0" />
                {post.author}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

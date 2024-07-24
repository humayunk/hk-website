import Link from 'next/link';
import Image from 'next/image';

export default function BlogSidebar({ recentPosts }) {
  return (
    <aside className="hidden xl:block xl:col-span-1">
      <div className="sticky top-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.slug} className="flex items-center space-x-4">
              {post.featuredImage && (
                <div className="flex-shrink-0">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    width={60}
                    height={60}
                    className="h-15 w-15 rounded-md object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-gray-900 hover:underline">
                  {post.title}
                </Link>
                <p className="text-sm text-gray-500">{new Date(post.publishDate).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

import BlogPost from './BlogPost';
import BlogSidebar from './BlogSidebar';

export default function BlogLayout({ post, recentPosts }) {
  return (
    <div className="bg-orange-50 px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <BlogPost post={post} />
          <BlogSidebar recentPosts={recentPosts} />
        </div>
      </div>
    </div>
  );
}

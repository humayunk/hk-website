import { notFound } from 'next/navigation';
import BlogPost from '../../components/BlogPost';
import { fetchBlogPost } from '../../lib/contentful';

export default async function BlogPostPage({ params }) {
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}

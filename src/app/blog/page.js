import BlogList from '../components/BlogList';
import { fetchBlogPosts } from '../lib/contentful';
import Header from '../components/Header';

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <>
      <Header />
      <BlogList posts={posts} />
    </>
  );
}

export const revalidate = 3600; // Revalidate every hour

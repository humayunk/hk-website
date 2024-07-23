import BlogList from '../components/BlogList';
import { fetchBlogPosts } from '../lib/contentful';

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <>
      <BlogList posts={posts} />
    </>


  );
}

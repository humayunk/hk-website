import { notFound } from 'next/navigation';
import BlogPost from '../../components/BlogPost';
import { fetchBlogPost } from '../../lib/contentful';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default async function BlogPostPage({ params }) {
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <BlogPost post={post} />
      <Footer />
    </>

  )
}

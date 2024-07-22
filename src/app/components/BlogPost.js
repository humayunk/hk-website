import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function BlogPost({ post }) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-indigo-600">{post.tags.join(', ')}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-8">
            By {post.author} on {new Date(post.publishDate).toLocaleDateString()}
          </p>
          {post.featuredImage && (
            <div className="mt-10 aspect-w-16 aspect-h-9">
              <Image
                src={post.featuredImage}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
          )}
          <div className="mt-10 prose prose-lg prose-indigo">
            {documentToReactComponents(post.content)}
          </div>
        </div>
      </div>
    </div>
  );
}

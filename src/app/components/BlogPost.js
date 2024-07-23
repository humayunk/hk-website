import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';

const ensureAbsoluteUrl = (url) => {
  return url && url.startsWith('//') ? `https:${url}` : url;
};

export default function BlogPost({ post }) {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">{post.tags.join(', ')}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
        <p className="mt-6 text-xl leading-8">
          By {post.author} on {new Date(post.publishDate).toLocaleDateString()}
        </p>
        {post.featuredImage && (
          <figure className="mt-16">
            <Image
              src={ensureAbsoluteUrl(post.featuredImage)}
              alt={post.title}
              width={1310}
              height={873}
              className="aspect-video rounded-xl bg-gray-50 object-cover"
            />
            <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
              <InformationCircleIcon aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-gray-300" />
              {post.title}
            </figcaption>
          </figure>
        )}
        <div className="mt-10 max-w-2xl">
          <div className="prose prose-lg prose-indigo">
            {documentToReactComponents(post.content)}
          </div>
        </div>
      </div>
    </div>
  );
}

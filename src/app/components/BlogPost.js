import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // Dark theme for highlight.js

const ensureAbsoluteUrl = (url) => {
  return url && url.startsWith('//') ? `https:${url}` : url;
};

export default function BlogPost({ post }) {
  console.log('BlogPost component rendering');
  console.log('Entire post:', JSON.stringify(post, null, 2));
  console.log('Post content:', JSON.stringify(post.content, null, 2));

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        console.log('Rendering PARAGRAPH:', node);
        if (node.content.length === 1 && node.content[0].marks.some(mark => mark.type === 'code')) {
          const code = node.content[0].value;
          console.log('Code block content:', code);

          let highlightedCode;
          try {
            highlightedCode = hljs.highlightAuto(code).value;
          } catch (error) {
            console.warn('Error highlighting code:', error);
            highlightedCode = code; // Fallback to plain text
          }

          return (
            <div className="code-block-wrapper my-4 rounded-md overflow-hidden">
              <pre className="hljs bg-gray-900 p-4 m-0 overflow-x-auto">
                <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
              </pre>
            </div>
          );
        }
        return <p className="mb-4">{children}</p>;
      },
      [BLOCKS.HEADING_1]: (node, children) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
      [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li className="mb-1">{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
      [INLINES.HYPERLINK]: (node, children) => <a href={node.data.uri} className="text-black underline">{children}</a>,
    },
  };

  return (
    <div className="bg-orange-50 px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-900 bg-white border-4 border-black shadow-solid-s p-6 rounded-lg">
        <div className="flex flex-wrap justify-center space-x-2 mb-2">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-black text-white text-xs font-semibold px-2 py-1 rounded-lg">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-bold font-mono tracking-tight text-gray-900 sm:text-4xl text-center">{post.title}</h1>
        <p className="mt-2 text-xl leading-8 font-mono text-center">
          {new Date(post.publishDate).toLocaleDateString()}
        </p>
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="prose prose-lg prose-indigo">
            {documentToReactComponents(post.content, options)}
          </div>
        </div>
      </div>
    </div>
  );
}

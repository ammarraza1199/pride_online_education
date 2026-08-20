import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';

const BlogPost = () => {
  const { slug } = useParams();

  // In a real app, you would fetch the blog post data based on the slug
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="py-12">
      <SEO 
        title={`${title} - Pride Online Education`} 
        description={`Read our article about ${title}`}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/blog" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Blog</Link>
        <article className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <div className="text-gray-500 mb-8">Published on Aug 12, 2026</div>
          <div className="prose max-w-none text-gray-700 leading-loose">
            <p className="mb-4">
              This is a placeholder for the blog post content. The CMS integration will populate this section with real content dynamically based on the requested slug: <strong>{slug}</strong>.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Why is this important?</h2>
            <p className="mb-4">
              Having SEO optimized, individual blog posts allows search engines to index valuable content, drawing organic traffic to your educational platform. Each article can target long-tail keywords relevant to your courses and admission processes.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;

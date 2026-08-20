import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Blog = () => {
  // Placeholder blog posts data
  const posts = [
    {
      id: 1,
      title: 'How to Apply for Online Degree Admission',
      slug: 'how-to-apply-online-degree-admission',
      excerpt: 'Learn the step-by-step process of applying for an online degree program from the comfort of your home.',
      date: 'Aug 10, 2026'
    },
    {
      id: 2,
      title: 'BCA Eligibility After PUC',
      slug: 'bca-eligibility-after-puc',
      excerpt: 'A comprehensive guide to understanding the eligibility criteria for a BCA degree after completing your PUC.',
      date: 'Aug 05, 2026'
    }
  ];

  return (
    <div className="py-12">
      <SEO 
        title="Blog - Pride Online Education" 
        description="Read the latest articles on online education, degree admissions, and career options."
      />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-10">Our Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  <Link to={`/blog/${post.slug}`} className="hover:text-red-600 transition">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="text-blue-600 font-semibold hover:underline">
                  Read More &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

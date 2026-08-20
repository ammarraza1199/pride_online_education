import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Schema from './Schema';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Skip breadcrumbs on home page
  if (pathnames.length === 0) return null;

  const breadcrumbListSchema = {
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://example.com/'
      },
      ...pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        return {
          '@type': 'ListItem',
          position: index + 2,
          name: name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          item: `https://example.com${routeTo}`
        };
      })
    ]
  };

  return (
    <nav className="text-sm py-4 bg-gray-100" aria-label="Breadcrumb">
      <div className="container mx-auto px-4">
        <Schema type="BreadcrumbList" data={breadcrumbListSchema} />
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/" className="text-blue-600 hover:text-red-600 transition-colors">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const formattedName = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            return (
              <li key={name} className="flex items-center">
                {isLast ? (
                  <span className="text-gray-600" aria-current="page">{formattedName}</span>
                ) : (
                  <>
                    <Link to={routeTo} className="text-blue-600 hover:text-red-600 transition-colors">{formattedName}</Link>
                    <span className="mx-2 text-gray-500">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;

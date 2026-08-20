import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Schema({ type, data }) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}

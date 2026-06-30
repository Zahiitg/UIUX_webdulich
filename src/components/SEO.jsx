import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name, type }) {
  return (
    <Helmet>
      <title>{title} | Gia Lai Travel Guide</title>
      <meta name='description' content={description} />
      {/* End standard metadata tags */}
      
      {/* Facebook tags */}
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name || "Gia Lai Travel Guide"} />
      <meta name="twitter:card" content={type || "summary_large_image"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

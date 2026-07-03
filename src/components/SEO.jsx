import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = 'AI Travel Planner', 
  description = 'Smart Travel Gia Lai - Nền tảng du lịch thông minh sử dụng AI để tạo lịch trình cá nhân hóa.', 
  image = 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1200&h=630&auto=format&fit=crop',
  name = 'Gia Lai Travel Guide', 
  type = 'website' 
}) {
  return (
    <Helmet>
      <title>{title} | Gia Lai Travel Guide</title>
      <meta name='description' content={description} />
      
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={`${title} | Gia Lai Travel Guide`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Gia Lai Travel Guide`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}

import * as React from 'react';

interface PageMetadataProps {
  title: string;
  description: string;
  jsonLd?: object | object[];
  imageUrl?: string;
  canonicalUrl?: string;
}

const updateMetaTag = (property: string, content: string, isNameAttribute: boolean = false) => {
  let element = document.querySelector(isNameAttribute ? `meta[name="${property}"]` : `meta[property="${property}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    if (isNameAttribute) {
      element.setAttribute('name', property);
    } else {
      element.setAttribute('property', property);
    }
    document.head.appendChild(element);
  }
  element.content = content;
};

const updateLinkTag = (rel: string, href: string) => {
    let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
    if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
    }
    element.href = href;
};


const PageMetadata: React.FC<PageMetadataProps> = ({ title, description, jsonLd, imageUrl, canonicalUrl }) => {
  React.useEffect(() => {
    // 1. Update title
    document.title = title;

    // 2. Update meta description
    updateMetaTag('description', description, true);

    // 3. Update canonical URL
    const finalCanonicalUrl = canonicalUrl || window.location.href;
    updateLinkTag('canonical', finalCanonicalUrl);
    
    // --- Open Graph / Facebook Meta Tags ---
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:url', finalCanonicalUrl);
    const fullImageUrl = imageUrl 
        ? (imageUrl.startsWith('http') ? imageUrl : `${window.location.origin}${imageUrl}`)
        : `${window.location.origin}/public/images/kay-jay-beach-house/hero.jpg`;
    updateMetaTag('og:image', fullImageUrl);


    // --- Twitter Card Meta Tags ---
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:url', finalCanonicalUrl);
    updateMetaTag('twitter:image', fullImageUrl);


    // --- JSON-LD Schema Logic ---
    const existingScripts = document.querySelectorAll('script[data-page-schema="true"]');
    existingScripts.forEach(s => s.remove());

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-page-schema', 'true'); // Mark as page-specific
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
      });
    }

    return () => {
        const pageSchemas = document.querySelectorAll('script[data-page-schema="true"]');
        pageSchemas.forEach(s => s.remove());
    };

  }, [title, description, jsonLd, imageUrl, canonicalUrl]);

  return null; // This component does not render anything
};

export default PageMetadata;
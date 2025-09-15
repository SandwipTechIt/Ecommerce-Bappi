// Utility functions for managing meta tags dynamically
export const updateMetaTag = (property, content) => {
  let metaTag = document.querySelector(`meta[property="${property}"]`) || 
                document.querySelector(`meta[name="${property}"]`);
  
  if (metaTag) {
    metaTag.setAttribute('content', content);
  } else {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('property', property);
    metaTag.setAttribute('content', content);
    document.head.appendChild(metaTag);
  }
};

export const updateTitle = (title) => {
  document.title = title;
};

export const setProductMetaTags = (product, currentUrl) => {
  if (!product) return;

  const productTitle = `${product.name} - ComfortY`;
  const productDescription = product.description || `Buy ${product.name} at ComfortY. Where Comfort Meets Your Step.`;
  const productImage = product.primaryImage || product.images?.[0] || '/logo.jpeg';
  const productPrice = product.discount || product.price;

  // Update page title
  updateTitle(productTitle);

  // Update basic meta tags
  updateMetaTag('description', productDescription);

  // Update Open Graph tags
  updateMetaTag('og:title', productTitle);
  updateMetaTag('og:description', productDescription);
  updateMetaTag('og:type', 'product');
  updateMetaTag('og:url', currentUrl);
  updateMetaTag('og:image', productImage);
  updateMetaTag('og:site_name', 'ComfortY');

  // Product specific Open Graph tags
  updateMetaTag('product:price:amount', productPrice);
  updateMetaTag('product:price:currency', 'BDT');
  updateMetaTag('product:availability', product.isStock ? 'in stock' : 'out of stock');

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', productTitle);
  updateMetaTag('twitter:description', productDescription);
  updateMetaTag('twitter:image', productImage);

  // Additional meta tags for better SEO
  updateMetaTag('og:image:width', '1200');
  updateMetaTag('og:image:height', '630');
  updateMetaTag('og:image:alt', product.name);
};

export const resetMetaTags = () => {
  // Reset to default values
  updateTitle('ComfortY Where Comfort Meets Your Step');
  updateMetaTag('description', 'ComfortY is a leading brand of sneakers and accessories for men and women with a focus on comfort and style.');
  updateMetaTag('og:title', 'ComfortY Where Comfort Meets Your Step');
  updateMetaTag('og:description', 'ComfortY is a leading brand of sneakers and accessories for men and women with a focus on comfort and style.');
  updateMetaTag('og:type', 'website');
  updateMetaTag('og:url', 'https://comfortyzone.com');
  updateMetaTag('og:image', 'https://comfortyzone.com/logo.jpeg');
};

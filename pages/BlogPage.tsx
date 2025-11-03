import * as React from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogPosts, fetchCategories } from '../lib/wordpress';
import { BlogPost, Category } from '../types';
import PageMetadata from '../components/PageMetadata';
import AnimatedSection from '../components/AnimatedSection';
import BlogCard from '../components/BlogCard';
import LazyImage from '../components/LazyImage';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [fetchedPosts, fetchedCategories] = await Promise.all([
        fetchBlogPosts(),
        fetchCategories(),
      ]);
      setPosts(fetchedPosts);
      setCategories(fetchedCategories);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const blogPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Kayjay Hotels Blog",
    "description": "Explore the latest news, travel guides, and stories from Kayjay Hotels. Discover the best of Sri Lanka with our insights.",
    "url": "https://kayjayhotels.com/#/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Kayjay Hotels",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kayjayhotels.com/public/images/logo.png"
      }
    }
  };

  return (
    <>
      <PageMetadata
        title="Blog | Luxury in Every Detail | Kayjay Hotels"
        description="Explore the latest news, travel guides, and stories from Kayjay Hotels. Discover the best of Sri Lanka with our insights."
        canonicalUrl="https://kayjayhotels.com/#/blog"
        imageUrl="/public/images/kay-jay-palms/garden.jpg"
        jsonLd={blogPageSchema}
      />
      {/* Hero Section */}
      <div className="relative bg-brand-dark text-white text-center py-32 px-6">
        <div className="absolute inset-0">
          <LazyImage 
            src="/public/images/kay-jay-palms/garden.jpg" 
            alt="Lush green gardens at a Kayjay Hotel" 
            className="w-full h-full object-cover opacity-30" 
          />
        </div>
        <div className="relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-extrabold font-sans">Our Blog</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              Stories, insights, and travel inspiration from the heart of Sri Lanka.
            </p>
          </AnimatedSection>
        </div>
      </div>
      
      <div className="bg-brand-gray py-20">
        <div className="container mx-auto px-6">
          {!isLoading && categories.length > 0 && (
            <AnimatedSection>
              <nav className="mb-12 flex flex-wrap justify-center gap-2" aria-label="Blog categories">
                <Link to="/blog" className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-full text-sm transition-colors shadow-sm">All Posts</Link>
                {categories.map(cat => (
                  <Link key={cat.id} to={`/blog/category/${cat.slug}`} className="bg-white hover:bg-brand-primary hover:text-white text-gray-700 font-semibold py-2 px-4 rounded-full text-sm transition-colors border border-gray-200 shadow-sm">
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </AnimatedSection>
          )}

          {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse"></div>
                ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <AnimatedSection key={post.id}>
                  <BlogCard post={post} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-brand-dark">No Blog Posts Found</h2>
                <p className="text-gray-600 mt-4">It looks like we haven't published any stories yet. Please check back soon!</p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
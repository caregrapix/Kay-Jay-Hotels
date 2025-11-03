import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCategoryBySlug, fetchPostsByCategoryId } from '../lib/wordpress';
import { BlogPost, Category } from '../types';
import PageMetadata from '../components/PageMetadata';
import AnimatedSection from '../components/AnimatedSection';
import BlogCard from '../components/BlogCard';
import NotFound from './NotFound';

const CategoryArchivePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = React.useState<Category | null>(null);
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!slug) return;
    
    const loadData = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const fetchedCategory = await fetchCategoryBySlug(slug);
        if (fetchedCategory) {
          setCategory(fetchedCategory);
          const fetchedPosts = await fetchPostsByCategoryId(fetchedCategory.id);
          setPosts(fetchedPosts);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [slug]);

  if (isLoading) {
    // Return a loading skeleton
    return (
        <div className="bg-brand-gray py-20">
            <div className="container mx-auto px-6">
                 <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto mb-12 animate-pulse"></div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse"></div>
                    ))}
                </div>
            </div>
        </div>
    );
  }

  if (error || !category) {
    return <NotFound />;
  }

  const categoryPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Blog Posts in Category: ${category.name}`,
    "description": `Browse all blog posts filed under the "${category.name}" category on the Kayjay Hotels blog.`,
    "url": `https://kayjayhotels.com/#/blog/category/${category.slug}`,
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
        title={`Category: ${category.name} | Kayjay Hotels Blog`}
        description={`Browse blog posts in the "${category.name}" category.`}
        canonicalUrl={`https://kayjayhotels.com/#/blog/category/${slug}`}
        jsonLd={categoryPageSchema}
      />
      <div className="bg-brand-gray py-20">
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <div className="text-center mb-12">
                    <p className="text-brand-primary font-semibold uppercase tracking-wider">Blog Category</p>
                    <h1 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark mt-2">{category.name}</h1>
                    <Link to="/blog" className="mt-4 inline-block text-gray-600 hover:text-brand-primary font-semibold transition-colors">&larr; View All Posts</Link>
                </div>
            </AnimatedSection>
            
            {posts.length > 0 ? (
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
                    <h2 className="text-2xl font-bold text-brand-dark">No Posts Found</h2>
                    <p className="text-gray-600 mt-4">There are no posts in the "{category.name}" category yet.</p>
                </div>
                </AnimatedSection>
            )}
        </div>
      </div>
    </>
  );
};

export default CategoryArchivePage;
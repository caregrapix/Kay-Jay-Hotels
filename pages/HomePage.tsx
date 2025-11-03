
import * as React from 'react';
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { hotelsData } from '../data/hotels';
import PageMetadata from '../components/PageMetadata';
import AnimatedSection from '../components/AnimatedSection';
import Hero from '../components/Hero';
import LazyImage from '../components/LazyImage';
import MainBookingWidget from '../components/MainBookingWidget';
import ExperienceHighlights from '../components/ExperienceHighlights';
import FeaturedRoomsCarousel from '../components/FeaturedRoomsCarousel';
import FeaturedBlogSection from '../components/FeaturedBlogSection';

const HomePage: React.FC = () => {
  
  const homePageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Kayjay Hotels",
      "url": "https://kayjayhotels.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://kayjayhotels.com/#/search-results?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Hotel",
      "name": "Kayjay Hotels",
      "description": "Boutique hotels, villas, and beachfront resorts across Sri Lanka.",
      "url": "https://kayjayhotels.com/",
      "logo": "https://kayjayhotels.com/public/images/logo.png",
      "telephone": "+94-74-202-1777",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "100E Bopitiya Road",
        "addressLocality": "Uswetakeiyawa, Wattala",
        "postalCode": "11328",
        "addressCountry": "LK"
      },
      "priceRange": "LKR"
    }
  ];

  return (
    <div>
      <PageMetadata
        title="Kayjay Hotels | Boutique Resorts in Sri Lanka"
        description="Experience luxury at Kayjay Hotels. Discover boutique hotels, villas, and beachfront resorts across Sri Lanka for your unforgettable stay. Book now."
        jsonLd={homePageSchema}
      />
      <Hero />

      <MainBookingWidget />

      <section className="py-20 bg-brand-gray" id="properties">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark">Our Destinations</h2>
              <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                From serene beach retreats to immersive safari gateways, each property offers a unique window into the heart of Sri Lanka.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {hotelsData.map(hotel => (
              <PropertyCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark">Featured Rooms & Suites</h2>
              <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                A selection of our finest rooms, offering comfort, style, and unique views. Find your perfect space.
              </p>
            </div>
            <FeaturedRoomsCarousel />
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection>
        <ExperienceHighlights />
      </AnimatedSection>

   

      {/* About Us Section */}
      <section className="py-20 bg-brand-gray">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark">
                  Authentic Hospitality, Luxury in Every Detail
                </h2>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  Established in 2006, Kayjay Hotels is a proudly Sri Lankan-owned hospitality brand offering boutique hotels across the island’s most captivating destinations. We are dedicated to delivering exceptional service, tranquil luxury, and memorable guest experiences.
                </p>
                <Link
                  to="/about"
                  className="mt-8 inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Learn More About Us
                </Link>
              </div>
              <div className="order-1 md:order-2">
                <div className="rounded-lg shadow-xl overflow-hidden aspect-w-4 aspect-h-3">
                  <LazyImage
                    src="/public/images/kayjay-amorea/pool.jpg"
                    alt="Serene pool view at Kayjay Amorea"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative py-20 bg-brand-dark text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/public/images/kay-jay-palms/garden.jpg')" }}
        />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-sans font-bold">
              Ready to Plan Your Escape?
            </h2>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Our team is here to help you craft the perfect Sri Lankan holiday. Contact us for personalized assistance and booking inquiries.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-brand-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get In Touch
            </Link>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
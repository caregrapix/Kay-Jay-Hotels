
import * as React from 'react';
import { hotelsData } from '../data/hotels';
import PropertyCard from '../components/PropertyCard';
import PageMetadata from '../components/PageMetadata';
import AnimatedSection from '../components/AnimatedSection';

const PropertiesListPage: React.FC = () => {
  return (
    <>
      <PageMetadata
        title="Our Properties | Luxury in Every Detail | Kayjay Hotels"
        description="Explore all properties by Kayjay Hotels and discover luxury in every detail. View our collection of hotels, resorts, and villas in Pasikuda, Wilpattu, and Uswetakeiyawa."
      />
      <div className="bg-brand-gray py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark">Our Properties</h1>
              <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                Discover a collection of unique hotels, each offering a distinct experience of Sri Lanka's diverse beauty.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {hotelsData.map(hotel => (
                <AnimatedSection key={hotel.id}>
                    <PropertyCard hotel={hotel} />
                </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesListPage;

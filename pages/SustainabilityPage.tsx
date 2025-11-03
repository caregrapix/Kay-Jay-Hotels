

import * as React from 'react';
import PageMetadata from '../components/PageMetadata';
import AnimatedSection from '../components/AnimatedSection';
import LazyImage from '../components/LazyImage';

const SustainabilityPage: React.FC = () => {
  return (
    <>
      <PageMetadata
        title="Sustainability | Luxury in Every Detail | Kayjay Hotels"
        description="Learn about our commitment to sustainable and responsible tourism. Kayjay Hotels is dedicated to preserving Sri Lanka's natural beauty and supporting local communities."
      />
      <div className="bg-brand-light">
        {/* Title Section */}
        <div className="bg-brand-gray py-20">
          <div className="container mx-auto px-6 text-center">
            <AnimatedSection>
              <h1 className="text-4xl md:text-6xl font-extrabold font-sans text-brand-dark">Our Commitment to Sustainability</h1>
              <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Preserving Paradise for Generations to Come
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-12">
            
            <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-dark mb-6">Responsible Tourism, Authentic Experiences</h2>
                <div className="space-y-6">
                    <p>
                        At Kayjay Hotels, we believe that true hospitality goes hand-in-hand with a deep respect for the environment and the local communities that make Sri Lanka so special. Our commitment to sustainability is woven into every aspect of our operations, from the design of our properties to the experiences we offer our guests. We are dedicated to minimizing our ecological footprint while maximizing our positive social impact.
                    </p>
                </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
                <AnimatedSection>
                    <div className="bg-white p-6 rounded-lg shadow-md h-full">
                        <h3 className="text-2xl font-bold text-brand-dark mb-4">Environmental Stewardship</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Waste Reduction:</strong> We have implemented comprehensive recycling programs across all properties and are actively working to reduce single-use plastics.</li>
                            <li><strong>Energy Conservation:</strong> We utilize energy-efficient lighting and appliances and encourage both staff and guests to be mindful of energy consumption.</li>
                            <li><strong>Water Management:</strong> Water-saving fixtures and responsible irrigation practices are in place to conserve this precious resource.</li>
                            <li><strong>Protecting Biodiversity:</strong> Our properties, like Kay Jay Wild, are designed to exist in harmony with their natural surroundings, helping to protect local ecosystems and wildlife.</li>
                        </ul>
                    </div>
                </AnimatedSection>
                 <AnimatedSection>
                    <div className="bg-white p-6 rounded-lg shadow-md h-full">
                        <h3 className="text-2xl font-bold text-brand-dark mb-4">Community & Culture</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Local Sourcing:</strong> We prioritize purchasing fresh produce, seafood, and other goods from local farmers, fishermen, and artisans, supporting the local economy.</li>
                            <li><strong>Employing Locally:</strong> A significant portion of our team members are hired from the local communities surrounding our hotels, providing stable employment and career growth.</li>
                            <li><strong>Cultural Preservation:</strong> We celebrate and promote Sri Lankan culture by offering authentic cuisine, showcasing local art, and encouraging guests to respectfully engage with local traditions.</li>
                            <li><strong>Guest Education:</strong> We invite our guests to be partners in our sustainability journey by providing information on local conservation efforts and cultural etiquette.</li>
                        </ul>
                    </div>
                </AnimatedSection>
            </div>
            
            <AnimatedSection>
                 <div className="bg-brand-gray/60 p-8 rounded-lg border border-gray-200 text-center">
                    <h2 className="text-3xl font-sans font-bold text-brand-dark mb-4">Our Goal</h2>
                    <p className="italic text-gray-800">
                        "Our goal is to ensure that the beautiful destinations our guests travel to see are protected for future generations. By choosing to stay with Kayjay Hotels, you are supporting a sustainable future for Sri Lanka's tourism industry."
                    </p>
                </div>
            </AnimatedSection>

          </div>
        </div>
      </div>
    </>
  );
};

export default SustainabilityPage;
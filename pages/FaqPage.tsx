
import * as React from 'react';
import PageMetadata from '../components/PageMetadata';
import AnimatedSection from '../components/AnimatedSection';

interface FaqItemProps {
  question: string;
  children: React.ReactNode;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-brand-dark focus:outline-none"
      >
        <span>{question}</span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-700 leading-relaxed animate-fade-in-down">
          {children}
        </div>
      )}
    </div>
  );
};

const FaqPage: React.FC = () => {
  return (
    <>
      <PageMetadata
        title="FAQ | Luxury in Every Detail | Kayjay Hotels"
        description="Find answers to frequently asked questions about booking, stays, and amenities at Kayjay Hotels."
      />
      <div className="bg-brand-gray py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark">Frequently Asked Questions</h1>
              <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-md">
              <FaqItem question="How do I make a booking?">
                <p>You can start the booking process by sending an inquiry through our website. Navigate to the hotel and room you are interested in, select your dates and guest details, and click "Email Inquiry" or "WhatsApp Inquiry". Our reservations team will then contact you to confirm availability, provide a final quote, and finalize your booking.</p>
              </FaqItem>
              <FaqItem question="What are the check-in and check-out times?">
                <p>Our standard check-in time is <strong>2:00 PM</strong> and our standard check-out time is <strong>12:00 PM (noon)</strong>. If you require an early check-in or late check-out, please make a request with our team, and we will do our best to accommodate you based on availability. Additional charges may apply.</p>
              </FaqItem>
              <FaqItem question="What is your cancellation policy?">
                <p>Cancellation policies can vary depending on the property, season, and the rate you have booked. The specific cancellation terms for your reservation will be clearly communicated to you by our reservations agent during the booking confirmation process.</p>
              </FaqItem>
              <FaqItem question="Do you offer airport transfers?">
                <p>Yes, we can arrange airport transfers for your convenience. To arrange a transfer, please mention your requirement when you make your booking inquiry. Our team will provide you with the available options and associated costs.</p>
              </FaqItem>
              <FaqItem question="Are your hotels family-friendly?">
                <p>Absolutely. We welcome families at all our properties. Kay Jay Beach House is great for its calm waters, Kay Jay Wild offers an exciting safari adventure, and Kay Jay Palms provides ample space for kids to play. Please check the room descriptions for maximum occupancy and let us know if you have any special requirements for your family.</p>
              </FaqItem>
              <FaqItem question="Can I book for a large group or host an event?">
                <p>Yes, several of our properties are well-equipped to handle large groups and events. KayJay Amorea has a hall suitable for weddings and corporate functions, while Kay Jay Wild and Kay Jay Palms offer dormitory accommodations for larger groups. Please contact us directly with your event or group details for a customized proposal.</p>
              </FaqItem>
               <FaqItem question="Is Wi-Fi available at the hotels?">
                <p>Yes, complimentary Wi-Fi is available for our guests at all properties. Please be aware that in our more remote locations, such as Kay Jay Wild, the connection speed may vary and is often strongest in the common areas.</p>
              </FaqItem>
               <FaqItem question="What dining options are available?">
                <p>Most of our hotels feature on-site restaurants that serve an À La Carte menu with a selection of delicious Sri Lankan and international dishes. We offer various meal plans, including Room Only (RO), Bed & Breakfast (BB), Half Board (HB), and Full Board (FB). Special dining experiences like BBQs can also be arranged upon request.</p>
              </FaqItem>
              <FaqItem question="Do all your hotels have a swimming pool?">
                <p>Three of our properties—KayJay Amorea, Kay Jay Beach House, and Kay Jay Palms—feature a swimming pool. Our safari lodge, Kay Jay Wild, is designed to offer a more rustic "back to nature" experience and does not have a swimming pool, allowing guests to fully immerse themselves in the wild surroundings.</p>
              </FaqItem>
              <FaqItem question="Is parking available at the hotels?">
                <p>Yes, we offer complimentary on-site parking for our guests at all of our hotel locations. You can rest assured that a secure space for your vehicle is available during your stay.</p>
              </FaqItem>
              <FaqItem question="Are pets allowed at your hotels?">
                <p>Our pet policies can vary by property and time of year. To ensure we can accommodate your furry friends, please contact the specific hotel directly before making your reservation to inquire about their current pet policy and any applicable fees or restrictions.</p>
              </FaqItem>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default FaqPage;

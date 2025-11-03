
import * as React from 'react';
import PageMetadata from '../components/PageMetadata';
import AnimatedSection from '../components/AnimatedSection';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <>
      <PageMetadata
        title="Terms & Conditions | Kayjay Hotels"
        description="Read the terms and conditions for booking and staying at Kayjay Hotels properties. Information on reservations, cancellations, and policies."
      />
      <div className="bg-brand-gray py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-md">
              <h1 className="text-3xl md:text-4xl font-sans font-bold text-brand-dark mb-6">Terms & Conditions</h1>
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

                <p>Please read these Terms and Conditions carefully before making a booking with Kayjay Hotels. Your booking is a contract, and these terms outline our policies and your obligations.</p>

                <h2 className="text-xl font-bold text-brand-dark pt-4">1. Bookings and Reservations</h2>
                <p>All bookings made through our website are considered inquiries. A booking is not confirmed until you have been contacted by one of our customer care agents and have received a formal booking confirmation. All accommodations are subject to availability.</p>

                <h2 className="text-xl font-bold text-brand-dark pt-4">2. Pricing and Payment</h2>
                <p>Prices for rooms will be quoted by our reservations team upon inquiry. The final price may include applicable taxes and service charges. Payment policies, including deposit requirements, will be communicated to you by our agent during the confirmation process.</p>

                <h2 className="text-xl font-bold text-brand-dark pt-4">3. Cancellation Policy</h2>
                <p>Our cancellation policy will be provided to you at the time of booking. Policies may vary depending on the rate, season, and property. Failure to arrive at the hotel on the scheduled date without prior notice will be considered a "No Show" and may result in the cancellation of your entire reservation and the forfeiture of any deposit paid.</p>

                <h2 className="text-xl font-bold text-brand-dark pt-4">4. Check-in and Check-out</h2>
                <ul className="list-disc list-inside pl-4 mt-2">
                  <li>Standard check-in time is 2:00 PM.</li>
                  <li>Standard check-out time is 12:00 PM (noon).</li>
                  <li>Early check-in or late check-out requests are subject to availability and may incur additional charges.</li>
                  <li>A valid government-issued photo identification may be required at check-in.</li>
                </ul>

                <h2 className="text-xl font-bold text-brand-dark pt-4">5. Guest Conduct</h2>
                <p>Guests are expected to conduct themselves in an orderly and acceptable manner and not to disrupt the enjoyment of other guests. We reserve the right to immediately terminate the booking and evict any guest(s) who is deemed to be causing a disturbance, damaging property, or breaking the law, without any refund.</p>
                
                <h2 className="text-xl font-bold text-brand-dark pt-4">6. Liability</h2>
                <p>Kayjay Hotels will not be liable for any loss or damage to guests' belongings or any other property from their room or any other part of the hotel for any cause whatsoever. Guests are advised to secure their valuables.</p>
                
                <h2 className="text-xl font-bold text-brand-dark pt-4">7. Website Content</h2>
                <p>While we make every effort to ensure the information on our website is accurate, we do not warrant its completeness or correctness. We reserve the right to change information, including prices and services, at any time without notice.</p>

                <h2 className="text-xl font-bold text-brand-dark pt-4">8. Changes to Terms</h2>
                 <p>Kayjay Hotels reserves the right to amend these Terms and Conditions at any time. Any such changes will be effective immediately upon posting to the website.</p>

                <h2 className="text-xl font-bold text-brand-dark pt-4">9. Contact Us</h2>
                <p>If you have any questions regarding these terms, please contact us at <a href="mailto:info@kayjayhotels.com" className="text-brand-primary hover:underline">info@kayjayhotels.com</a>.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;
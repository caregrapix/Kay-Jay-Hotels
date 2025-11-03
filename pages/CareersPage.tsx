import * as React from 'react';
import PageMetadata from '../components/PageMetadata';
import AnimatedSection from '../components/AnimatedSection';
import LazyImage from '../components/LazyImage';

interface JobOpening {
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship';
  description: string;
}

const jobOpenings: JobOpening[] = [
  {
    title: 'Hotel Manager',
    location: 'Pasikuda, Sri Lanka',
    type: 'Full-time',
    description: 'Lead our team to deliver exceptional guest experiences. Requires strong leadership, operational management skills, and a passion for hospitality.'
  },
  {
    title: 'Front Desk Associate',
    location: 'Uswetakeiyawa, Wattala',
    type: 'Full-time',
    description: 'Be the face of Kayjay Hotels, welcoming guests and ensuring a smooth check-in/check-out process. Excellent communication skills required.'
  },
  {
    title: 'Sous Chef',
    location: 'Wilpattu, Sri Lanka',
    type: 'Full-time',
    description: 'Assist the Head Chef in creating memorable culinary experiences. Must have experience in both Sri Lankan and international cuisine.'
  },
];

const CareersPage: React.FC = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        cover_letter: '',
    });
    
    const [formStatus, setFormStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = React.useState('');
    const [errors, setErrors] = React.useState<Partial<typeof formData>>({});
    
    const applicationFormRef = React.useRef<HTMLDivElement>(null);

    const validateForm = () => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!formData.position.trim()) newErrors.position = 'Please specify the position you are applying for.';
        if (!formData.cover_letter.trim()) {
            newErrors.cover_letter = 'A cover letter or message is required.';
        } else if (formData.cover_letter.trim().length < 50) {
            newErrors.cover_letter = 'Please provide a message of at least 50 characters.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
          setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };
    
    const handleApplyClick = (title: string) => {
        setFormData(prev => ({ ...prev, position: title }));
        applicationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setFormStatus('submitting');
        setStatusMessage('Submitting your application...');
        setErrors({});

        try {
            const response = await fetch('/api/send-email.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...formData,
                  formType: 'career', // Identifier for the PHP script
                }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with an error (${response.status}). Please check the backend script path and configuration.`);
            }
    
            const responseText = await response.text();
            let result;
            try {
                result = JSON.parse(responseText);
            } catch (e) {
                console.error('The server response was not valid JSON. This is likely a PHP error or misconfiguration.', { responseText });
                throw new Error('The server returned an unexpected response. Please check the backend script for errors.');
            }
            
            if (result.status !== 'success') {
                throw new Error(result.message || 'The server indicated the submission could not be processed.');
            }
            
            setFormStatus('success');
            setStatusMessage('Thank you for your application! We have received it and will get in touch if your qualifications match our needs.');
            setFormData({ name: '', email: '', phone: '', position: '', cover_letter: '' });

        } catch (error) {
            console.error('Application submission failed:', error);
            setFormStatus('error');
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
            setStatusMessage(`Submission failed: ${errorMessage} Please try again.`);
        }
    };
    
    const pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Careers at Kayjay Hotels",
        "url": "https://kayjayhotels.com/#/careers",
        "description": "Join the Kayjay Hotels team. Explore career opportunities in hospitality and grow with a leading Sri Lankan hotel brand."
    };

  return (
    <>
      <PageMetadata
        title="Careers | Join Our Team | Kayjay Hotels"
        description="Explore career opportunities at Kayjay Hotels. We are looking for passionate individuals to join our team and help us create unforgettable guest experiences."
        jsonLd={pageSchema}
      />
      <div className="bg-brand-light">
        {/* Hero Section */}
        <div className="relative bg-brand-dark text-white text-center py-32 px-6">
          <div className="absolute inset-0">
            <LazyImage 
              src="/public/images/about-hero.jpg" 
              alt="A professional and welcoming hotel environment" 
              className="w-full h-full object-cover opacity-30" 
            />
          </div>
          <div className="relative z-10">
            <AnimatedSection>
              <h1 className="text-4xl md:text-6xl font-extrabold font-sans">Join Our Team</h1>
              <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
                Build a rewarding career in hospitality with Kayjay Hotels.
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-20">
            {/* Why Join Us Section */}
            <section className="max-w-5xl mx-auto text-center">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-dark mb-6">Why Work With Us?</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-12">
                        At Kayjay Hotels, we believe our team is our greatest asset. We are committed to fostering a supportive, inclusive, and dynamic work environment where every member can thrive, grow, and contribute to our shared success.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-brand-dark mb-2">Growth Opportunities</h3>
                            <p className="text-gray-600">We invest in our employees' professional development with training and opportunities for advancement.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-brand-dark mb-2">A Supportive Culture</h3>
                            <p className="text-gray-600">Join a team that values collaboration, respect, and a shared passion for hospitality.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-brand-dark mb-2">Meaningful Work</h3>
                            <p className="text-gray-600">Play a key role in creating unforgettable memories for guests from around the world.</p>
                        </div>
                    </div>
                </AnimatedSection>
            </section>

            {/* Current Openings Section */}
            <section className="max-w-5xl mx-auto mt-20">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-dark mb-8 text-center">Current Openings</h2>
                    <div className="space-y-6">
                        {jobOpenings.map(job => (
                            <div key={job.title} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-brand-dark">{job.title}</h3>
                                    <p className="text-gray-500 mt-1">{job.location} &bull; {job.type}</p>
                                    <p className="text-gray-600 mt-2">{job.description}</p>
                                </div>
                                <button onClick={() => handleApplyClick(job.title)} className="bg-brand-primary text-white font-bold py-2 px-6 rounded-md hover:bg-brand-dark transition-colors duration-300 flex-shrink-0">
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </section>

            {/* Application Form Section */}
            <section ref={applicationFormRef} className="max-w-3xl mx-auto mt-20">
                <AnimatedSection>
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="text-3xl font-bold text-brand-dark mb-6 text-center">Apply Now</h2>
                         {formStatus === 'success' ? (
                            <div className="text-center p-6 bg-green-50 border-l-4 border-green-500 rounded-md">
                                <h3 className="text-xl font-semibold text-green-800">Application Received!</h3>
                                <p className="mt-2 text-green-700">{statusMessage}</p>
                            </div>
                         ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`mt-1 w-full text-base px-4 py-3 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`} required />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`mt-1 w-full text-base px-4 py-3 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`} required />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 w-full text-base px-4 py-3 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position Applied For</label>
                                    <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} placeholder="e.g., Hotel Manager or General Application" className={`mt-1 w-full text-base px-4 py-3 border rounded-md ${errors.position ? 'border-red-500' : 'border-gray-300'}`} required />
                                    {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                                </div>
                                <div>
                                    <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700">Cover Letter / Message</label>
                                    <textarea id="cover_letter" name="cover_letter" rows={6} value={formData.cover_letter} onChange={handleChange} placeholder="Tell us why you'd be a great fit for our team. You can also paste your resume here." className={`mt-1 w-full text-base px-4 py-3 border rounded-md ${errors.cover_letter ? 'border-red-500' : 'border-gray-300'}`} required></textarea>
                                     {errors.cover_letter && <p className="text-red-500 text-xs mt-1">{errors.cover_letter}</p>}
                                </div>
                                <div>
                                    <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-brand-primary text-white font-bold py-3 px-6 rounded-md hover:bg-brand-dark transition-all duration-300 disabled:bg-gray-400">
                                        {formStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                     {formStatus === 'error' && <p className="text-red-500 text-sm mt-4 text-center">{statusMessage}</p>}
                                </div>
                            </form>
                         )}
                    </div>
                </AnimatedSection>
            </section>
        </div>
      </div>
    </>
  );
};

export default CareersPage;
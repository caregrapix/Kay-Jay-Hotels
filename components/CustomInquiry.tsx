
import * as React from 'react';
// FIX: Replaced useHistory with useNavigate for v6 compatibility.
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { useNavigate } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';
import InquiryDisclaimer from './InquiryDisclaimer';
import { saveInquirySubmission } from '../lib/supabase';

interface CustomInquiryProps {
    hotelName: string;
    checkIn: string;
    checkOut: string;
    adults: string;
    children: string;
}

const CustomInquiry: React.FC<CustomInquiryProps> = ({ hotelName, checkIn, checkOut, adults, children }) => {
    // FIX: Replaced useHistory with useNavigate for v6 compatibility.
    const navigate = useNavigate();
    const [isDisclaimerAccepted, setIsDisclaimerAccepted] = React.useState(false);
    const [postSubmitMessage, setPostSubmitMessage] = React.useState('');

    const [formData, setFormData] = React.useState({ name: '', email: '', phone: '' });
    const [errors, setErrors] = React.useState<Partial<typeof formData>>({});

    const validateForm = () => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEmailInquiry = () => {
        if (!validateForm()) return;

        const inquiryParams = new URLSearchParams({
            hotelName, checkIn, checkOut, adults, children,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            custom: 'true'
        });
        // FIX: Replaced history.push() with navigate() for v6 compatibility.
        navigate(`/inquire?${inquiryParams.toString()}`);
    };
    
    const handleWhatsAppInquiry = async () => {
        if (!validateForm()) return;

        const dbPayload = {
            ...formData,
            hotel_name: hotelName,
            room_name: 'Custom Inquiry',
            check_in: checkIn,
            check_out: checkOut,
            adults: parseInt(adults, 10),
            children: parseInt(children, 10),
            meal_plan: 'N/A',
            is_custom_inquiry: true,
            submission_type: 'WHATSAPP' as const,
        };
        
        try {
            await saveInquirySubmission(dbPayload);
        } catch (error) {
            console.warn('Supabase submission failed for custom WhatsApp inquiry, but proceeding:', error);
        }

        setPostSubmitMessage("Redirecting to WhatsApp... Our team will respond to your custom inquiry shortly.");
        setTimeout(() => setPostSubmitMessage(''), 7000);

        const message = generateWhatsAppMessage();
        const phoneNumber = "94742021777";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const generateWhatsAppMessage = () => {
        return `*New Custom Inquiry - Kayjay Hotels*

Hello, I would like to inquire about a special booking for a larger group:

*Property:* ${hotelName}
*Check-in:* ${checkIn}
*Check-out:* ${checkOut}
*Guests:* ${adults} Adults, ${children} Children

Please let me know what accommodation options might be available.

*My Details:*
Name: ${formData.name || '...'}
Email: ${formData.email || '...'}
Phone: ${formData.phone || '...'}

Thank you.`;
    };
    
    const disabledButtonClasses = "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70";
    const commonButtonClasses = "w-full sm:w-auto font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center";
    const inputClasses = "w-full text-base px-4 py-3 border rounded-md focus:ring-brand-primary focus:border-brand-primary";

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg border border-yellow-300">
            <div className="text-center">
                <h2 className="text-2xl font-bold font-sans text-brand-dark">No Standard Rooms Available</h2>
                <p className="text-gray-600 mt-4 max-w-xl mx-auto">
                    Based on the number of guests, we don't have a standard room that fits your party. However, we may be able to accommodate you with special arrangements.
                </p>
                <p className="text-gray-600 mt-2">
                    Please provide your contact details and send our reservations team a custom inquiry.
                </p>
            </div>
            
            <div className="mt-6 max-w-md mx-auto space-y-4">
                 <div>
                    <label htmlFor="custom-name" className="block text-sm font-medium text-gray-700 mb-1 text-left">Full Name</label>
                    <input type="text" id="custom-name" name="name" value={formData.name} onChange={handleChange} className={`${inputClasses} ${errors.name ? 'border-red-500' : 'border-gray-300'}`} required />
                    {errors.name && <p className="text-red-500 text-xs mt-1 text-left">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="custom-email" className="block text-sm font-medium text-gray-700 mb-1 text-left">Email Address</label>
                    <input type="email" id="custom-email" name="email" value={formData.email} onChange={handleChange} className={`${inputClasses} ${errors.email ? 'border-red-500' : 'border-gray-300'}`} required />
                    {errors.email && <p className="text-red-500 text-xs mt-1 text-left">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="custom-phone" className="block text-sm font-medium text-gray-700 mb-1 text-left">Phone Number (Optional)</label>
                    <input type="tel" id="custom-phone" name="phone" value={formData.phone} onChange={handleChange} className={`${inputClasses} border-gray-300`} />
                </div>
                <InquiryDisclaimer isChecked={isDisclaimerAccepted} onToggle={setIsDisclaimerAccepted} />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    type="button"
                    onClick={handleEmailInquiry}
                    disabled={!isDisclaimerAccepted}
                    className={`${commonButtonClasses} bg-brand-primary text-white hover:bg-brand-dark ${disabledButtonClasses}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                    Send Email Inquiry
                </button>
                <WhatsAppButton
                    onClick={handleWhatsAppInquiry}
                    disabled={!isDisclaimerAccepted}
                    className={`${commonButtonClasses} bg-green-500 text-white hover:bg-green-600 ${disabledButtonClasses}`}
                >
                    Send WhatsApp Inquiry
                </WhatsAppButton>
            </div>
            {postSubmitMessage && <p className="text-green-700 text-sm mt-4 text-center">{postSubmitMessage}</p>}
        </div>
    );
};

export default CustomInquiry;
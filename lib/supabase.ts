// This file previously configured a connection to Supabase.
// Supabase is no longer used for data storage in this application.
// These functions are kept to avoid breaking imports, but they do nothing.

interface ContactSubmission {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}

export const saveContactSubmission = async (data: ContactSubmission) => {
    // Supabase is disabled. This function does nothing.
    console.log("Supabase is disabled. Contact submission not saved:", data);
    return Promise.resolve();
};


interface InquirySubmission {
    name: string;
    email: string;
    phone?: string;
    hotel_name: string;
    room_name: string;
    check_in: string | null;
    check_out: string | null;
    adults: number;
    children: number;
    meal_plan: string;
    is_custom_inquiry: boolean;
    submission_type: 'EMAIL' | 'WHATSAPP';
    payment_method?: string;
    final_price?: string;
}

export const saveInquirySubmission = async (data: InquirySubmission) => {
    // Supabase is disabled. This function does nothing.
    console.log("Supabase is disabled. Inquiry submission not saved:", data);
    return Promise.resolve();
};

interface CareerApplication {
    name: string;
    email: string;
    phone?: string;
    position: string;
    cover_letter: string;
}

export const saveCareerApplication = async (data: CareerApplication) => {
    // Supabase is disabled. This function does nothing.
    console.log("Supabase is disabled. Career application not saved:", data);
    return Promise.resolve();
};
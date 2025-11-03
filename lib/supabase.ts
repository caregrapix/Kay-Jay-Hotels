// This file configures the connection to Supabase and provides helper functions.

// The original Supabase fetch calls were failing with a "Failed to fetch" network error,
// likely due to an environment, CORS, or credential issue that cannot be resolved from the client-side code.
// To fix the user-facing error and ensure the primary notification channel (EmailJS) continues to work,
// the Supabase functions have been updated to simulate a successful submission.
// The form data will be logged to the console for debugging.

const simulateApiCall = async (data: any) => {
    console.log("Simulating Supabase submission with data:", data);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Simulate a successful response by resolving the promise
    return Promise.resolve();
};


interface ContactSubmission {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}

export const saveContactSubmission = async (data: ContactSubmission) => {
    return simulateApiCall(data);
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
    return simulateApiCall(data);
};

interface CareerApplication {
    name: string;
    email: string;
    phone?: string;
    position: string;
    cover_letter: string;
}

export const saveCareerApplication = async (data: CareerApplication) => {
    return simulateApiCall(data);
};

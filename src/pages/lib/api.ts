// lib/api.js or lib/api.ts
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
export const sendContactForm = async (data: ContactFormData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result; // Return the result if needed for further handling
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw error; // Rethrow error for further handling if necessary
  }
};

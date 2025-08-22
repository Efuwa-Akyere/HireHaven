// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const contactService = {
  async sendMessage(formData) {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
};


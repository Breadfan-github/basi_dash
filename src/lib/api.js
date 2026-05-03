const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend.test';

export const api = {
  async submitContact(data) {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.message || 'Failed to submit contact form');
      error.response = response;
      error.data = errorData;
      throw error;
    }

    return await response.json();
  },

  async submitApplication(data) {
    const formData = new FormData();
    
    // Add all form fields
    Object.keys(data).forEach(key => {
      if (key === 'idPhoto' && data[key] instanceof File) {
        formData.append('id_photo', data[key]);
      } else if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });

    const response = await fetch(`${API_BASE_URL}/api/application`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit application');
    }

    return await response.json();
  },

  async getApplicationStatus(code) {
    const response = await fetch(`${API_BASE_URL}/api/application/${code}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      // Handle rate limiting (429 Too Many Requests)
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const message = retryAfter 
          ? `Too many requests. Please try again after ${retryAfter} seconds.`
          : 'Too many requests. Please try again in a minute.';
        throw new Error(message);
      }
      
      // Handle 404 (Not Found) - throw error with specific message
      if (response.status === 404) {
        throw new Error('Application not found');
      }
      
      const error = await response.json().catch(() => ({ message: 'Failed to fetch application status' }));
      throw new Error(error.message || 'Failed to fetch application status');
    }

    return await response.json();
  },

  async uploadDocument(code, file, documentId) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_id', documentId);

    const response = await fetch(`${API_BASE_URL}/api/application/${code}/documents`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to upload document' }));
      throw new Error(error.message || 'Failed to upload document');
    }

    return await response.json();
  },

  async getDocuments(code) {
    const response = await fetch(`${API_BASE_URL}/api/application/${code}/documents`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch documents' }));
      throw new Error(error.message || 'Failed to fetch documents');
    }

    return await response.json();
  },

  async deleteDocument(code, documentId) {
    const response = await fetch(`${API_BASE_URL}/api/application/${code}/documents/${documentId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete document' }));
      throw new Error(error.message || 'Failed to delete document');
    }

    return await response.json();
  },

  async getDocuments(type = 'normal') {
    const url = type ? `${API_BASE_URL}/api/documents?type=${type}` : `${API_BASE_URL}/api/documents`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch documents' }));
      throw new Error(error.message || 'Failed to fetch documents');
    }

    return await response.json();
  },

  getDocumentPreviewUrl(code, documentId) {
    return `${API_BASE_URL}/api/application/${code}/documents/${documentId}/preview`;
  },

  getIdPhotoUrl(photoPath) {
    return `${API_BASE_URL}/storage/${photoPath}`;
  },

  async getTncs() {
    const response = await fetch(`${API_BASE_URL}/api/tncs`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch terms and conditions' }));
      throw new Error(error.message || 'Failed to fetch terms and conditions');
    }
    return await response.json();
  },
};

